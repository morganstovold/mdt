import { create } from 'zustand';
import useOfficerStore, { Officer, defaultOfficer } from './store';
import fetchNui from '@/lib/fetchNui';
import { toast } from '@/components/ui/use-toast';
import { areObjectsEqual, getObjectDiff, sanitizeNumber } from '@/lib/utils';

type PrepedOfficer = {
  citizenid: string;
  callsign: string;
  department: string;
  rank: number;
  certs: number[];
  checklist: {
    id: number;
    performance: string;
    notes: string;
    time: string;
    fto: string;
  }[];
  hiredBy: string;
  noEntry?: boolean;
};

function PrepOfficer(old: Officer, officer: Officer): PrepedOfficer {
  let newOfficer: PrepedOfficer;
  if (officer.noEntry) {
    newOfficer = {
      citizenid: officer.citizenid,
      callsign: officer.callsign,
      department: officer.department,
      rank: officer.rank,
      certs: officer.certs,
      checklist: officer.checklist.map((check) => ({
        id: check.id,
        performance: check.performance,
        notes: check.notes,
        time: check.time,
        fto: check.fto.citizenid,
      })),
      hiredBy: officer.hiredBy.citizenid,
      ...(officer.noEntry && { noEntry: true }),
    };
  } else {
    newOfficer = {
      citizenid: officer.citizenid,
      ...getObjectDiff(old, officer),
    };
  }

  newOfficer.callsign = sanitizeNumber(String(newOfficer.callsign));

  return newOfficer;
}

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

const useOfficerControlsStore = create<State & Actions>((set) => ({
  editing: false,
  saving: false,
  canEdit: false,
  edit: () => {
    const officer = useOfficerStore.getState().officer;
    useOfficerStore.setState({ snapshot: officer });
    set({ editing: true });
  },
  cancel: () => {
    const snapshot = useOfficerStore.getState().snapshot;
    if (snapshot) {
      useOfficerStore.setState({ officer: snapshot });
    }
    set({ editing: false });
  },
  save: async () => {
    const state = useOfficerStore.getState();
    const officer = state.officer;
    const snapshot = state.snapshot;
    if (areObjectsEqual(officer, snapshot)) {
      set({ editing: false });
      return;
    }
    console.log(officer.department);
    if (officer.department === defaultOfficer.department) {
      toast({ title: 'Department is required' });
      return
    }

    set({ saving: true, editing: false });
    const resp = await fetchNui('roster:save', PrepOfficer(snapshot!, officer), {});
    useOfficerStore.setState({
      officer: resp.status === 'ok' ? officer : snapshot || defaultOfficer,
      snapshot: null,
    });
    set({ saving: false });

    toast({
      title: resp.status === 'ok' ? 'Officer Saved' : 'Error Saving Officer',
      description: resp.status === 'ok' ? 'Officer was saved' : 'There was an error saving officer',
    });
  },
}));

export default useOfficerControlsStore;
