import { create } from 'zustand';
import useProfileStore, { defaultProfile } from './store';
import fetchNui from '@/lib/fetchNui';
import { toast } from '@/components/ui/use-toast';
import { areObjectsEqual, getObjectDiff } from '@/lib/utils';

type State = {
  editing: boolean;
  saving: boolean;
  canEdit: boolean;
};

type Actions = {
  edit: () => void;
  cancel: () => void;
  save: () => Promise<void>;
};

const useProfileControlsStore = create<State & Actions>((set) => ({
  editing: false,
  saving: false,
  canEdit: false,
  edit: () => {
    const profile = useProfileStore.getState().profile;
    useProfileStore.setState({ snapshot: profile });

    set({ editing: true });
  },
  cancel: () => {
    const snapshot = useProfileStore.getState().snapshot;
    if (snapshot) {
      useProfileStore.setState({ profile: snapshot });
    }
    set({ editing: false });
  },
  save: async () => {
    const state = useProfileStore.getState();
    const profile = state.profile;
    const snapshot = state.snapshot;
    if (areObjectsEqual(profile, snapshot)) {
      set({ editing: false });
      return;
    }

    set({ saving: true, editing: false });

    const resp = await fetchNui(
      'profiles:save',
      {
        id: profile.citizenid,
        ...(profile?.noEntry
          ? { ...getObjectDiff(snapshot, profile), pfp: profile.pfp, notes: profile.notes, gallery: profile.gallery, noEntry: true }
          : getObjectDiff(snapshot, profile)),
      },
      {},
    );

    useProfileStore.setState({
      profile: resp.status === 'ok' ? profile : snapshot || defaultProfile,
      snapshot: null,
    });
    set({ saving: false });

    toast({
      title: resp.status === 'ok' ? 'Profile Saved' : 'Profile Error',
      description: resp.status === 'ok' ? 'Profile was saved' : 'There was an error saving profile',
    });
  },
}));

export default useProfileControlsStore;
