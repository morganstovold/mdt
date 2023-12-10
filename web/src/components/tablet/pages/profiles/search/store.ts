import { create } from 'zustand';
import useProfileStore, { type Profile } from '../profile/store';
import { fakeData, fakeSearchData } from './fake';
import fetchNui, { isEnvBrowser } from '@/lib/fetchNui';
import { toast } from '@/components/ui/use-toast';
import useProfileControlsStore from '../profile/controls';

type State = {
  searching: boolean;
  loading: string | false;
  value: string;
  lastValue: string;
  results: Partial<Profile>[];
  options: {
    items: number;
    page: number;
  };
};

type Actions = {
  loadProfile: (citizenid: Partial<Profile>) => Promise<void>;
  setValue: (value: string) => void;
  search: () => Promise<void>;
};

const useProfileSearchStore = create<State & Actions>((set, get) => ({
  searching: false,
  loading: false,
  value: '',
  lastValue: '',
  results: isEnvBrowser() ? fakeSearchData : [],
  options: {
    items: 10,
    page: 1,
  },
  setValue: (value) => set({ value }),
  loadProfile: async (_profile) => {
    const profile = useProfileStore.getState().profile;
    const { loading } = get();

    if (profile.citizenid === _profile.citizenid || loading) return;
    set({ loading: _profile.citizenid });

    const resp = await fetchNui('profiles:get', _profile.citizenid, fakeData);

    if (resp.status !== 'ok') {
      toast({
        title: 'Profile Error',
        description: 'There was an error loading the profile.',
      });
      set({ loading: false });

      return;
    }
    useProfileStore.setState({ value: [], profile: resp.data });
    useProfileControlsStore.setState({ canEdit: true, editing: false });
    set({
      loading: false,
    });
  },
  search: async () => {
    const { value, lastValue } = get();
    if (value === lastValue || value.length < 1) return;

    set({ searching: true, lastValue: value, results: [] });

    const resp = await fetchNui('profiles:search', value, fakeSearchData);
    set({
      searching: false,
      results: resp.data || [],
    });

    if (resp.status !== 'ok')
      toast({
        title: 'Search Error',
        description: 'There was an error searching for profiles.',
      });
  },
}));

export default useProfileSearchStore;
