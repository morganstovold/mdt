import { create } from 'zustand';
import { produce } from 'immer';
import useReportSearchStore from '../../reports/search/store';
import fetchNui from '@/lib/fetchNui';
import { toast } from '@/components/ui/use-toast';
import useOfficerControlsStore from './controls';
import { Profile } from '../../profiles/profile/store';
import useGlobalStore from '@/store';
import useOfficerSearchStore from '../search/store';
import useProfileSearchStore from '../../profiles/search/store';

export type Officer = {
  citizenid: string;
  pfp: string;
  firstname: string;
  lastname: string;
  phone: string;
  callsign: string;
  department: string;
  rank: number;
  reports: {
    id: number;
    title: string;
  }[];
  certs: number[];
  checklist: {
    id: number;
    performance: string;
    notes: string;
    time: string;
    fto: {
      citizenid: string;
      firstname: string;
      lastname: string;
      callsign: string;
    };
  }[];
  hiredBy: {
    pfp: string;
    citizenid: string;
    firstname: string;
    lastname: string;
    callsign: string;
    department: string;
    rank: number;
  };
  time: string;
  updatedAt: string;
  noEntry?: boolean;
};

export const defaultOfficer: Officer = {
  citizenid: '',
  pfp: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
  firstname: 'Citizen',
  lastname: '',
  phone: 'phone',
  callsign: "0",
  department: 'department',
  rank: 0,
  reports: [],
  certs: [],
  checklist: [],
  hiredBy: {
    pfp: '',
    citizenid: '',
    firstname: '',
    lastname: '',
    callsign: "0",
    department: '',
    rank: 0,
  },
  time: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

type State = {
  officer: Officer;
  snapshot: Officer | null;

  value: string[];
};

type Actions = {
  resetOfficer: () => void;
  setValue: (value: string[]) => void;

  setCallsign: (callsign: string) => void;
  setDepartment: (department: string) => void;
  setRank: (rank: string) => void;
  setCert: (id: number) => void;
  setHiredBy: (hiredBy: Officer['hiredBy']) => void;

  signOffCheck: (id: number, performance: string, notes: string) => void;
  removeSignOff: (id: number) => void;

  firing: boolean;
  fire: (citizenid: string) => Promise<void>;
  hire: (profile: Profile) => Promise<void>;

  viewReport: (value: number) => void;
  viewHiredBy: () => void;
};

const useOfficerStore = create<State & Actions>((set, get) => ({
  resetOfficer: () => {
    set({ officer: defaultOfficer, snapshot: null, value: [], firing: false });
    useOfficerControlsStore.setState({ editing: false, canEdit: false });
  },
  officer: defaultOfficer,
  snapshot: null,
  value: [],
  setValue: (value: string[]) => set({ value }),
  setCallsign: (callsign) =>
    set(
      produce((state: State) => {
        state.officer.callsign = callsign;
      }),
    ),
  setDepartment: (department) =>
    set(
      produce((state: State) => {
        state.officer.department = department;
      }),
    ),
  setRank: (rank) =>
    set(
      produce((state: State) => {
        state.officer.rank = parseInt(rank);
      }),
    ),
  setCert: (id) =>
    set(
      produce((state: State) => {
        const index = state.officer.certs.findIndex((c) => c === id);
        if (index === -1) {
          state.officer.certs.push(id);
        } else {
          state.officer.certs.splice(index, 1);
        }
      }),
    ),
  setHiredBy: (hiredBy) =>
    set(
      produce((state: State) => {
        state.officer.hiredBy = hiredBy;
      }),
    ),
  // if the item is already in the list, edit it
  signOffCheck: (id, performance, notes) => {
    const user = useGlobalStore.getState().user;
    set(
      produce((state: State) => {
        const index = state.officer.checklist.findIndex((c) => c.id === id);
        if (index === -1) {
          state.officer.checklist.push({
            id,
            performance,
            notes,
            time: new Date().toISOString(),
            fto: {
              citizenid: user.citizenid,
              firstname: user.firstname,
              lastname: user.lastname,
              callsign: user.callsign,
            },
          });
        } else {
          state.officer.checklist[index] = {
            id,
            performance,
            notes,
            time: new Date().toISOString(),
            fto: {
              citizenid: user.citizenid,
              firstname: user.firstname,
              lastname: user.lastname,
              callsign: user.callsign,
            },
          };
        }
      }),
    );
  },
  removeSignOff: (id) =>
    set(
      produce((state: State) => {
        const index = state.officer.checklist.findIndex((c) => c.id === id);
        if (index === -1) return;
        state.officer.checklist.splice(index, 1);
      }),
    ),

  firing: false,
  fire: async (citizenid) => {
    set({ firing: true });
    const resp = await fetchNui('roster:fire', citizenid, {});
    if (resp.status !== 'ok') {
      toast({ title: 'Unable to Fire Officer', description: 'Something Went Wrong' });
      return;
    }

    get().resetOfficer();
  },
  hire: async (profile) => {
    const state = useGlobalStore.getState();
    let newOfficer = {
      ...defaultOfficer,
      citizenid: profile.citizenid!,
      pfp: profile.pfp,
      firstname: profile.firstname,
      lastname: profile.lastname,
      phone: profile.phone,
      checklist: [],
      hiredBy: {
        citizenid: state.user.citizenid,
        pfp: state.user.pfp,
        firstname: state.user.firstname,
        lastname: state.user.lastname,
        callsign: state.user.callsign,
        department: state.user.department,
        rank: state.user.rank,
      },
      time: new Date().toString(),
      noEntry: true,
    };
    set({
      officer: newOfficer,
      snapshot: defaultOfficer,
    });
    useOfficerControlsStore.setState({ editing: true, canEdit: true });
    useProfileSearchStore.setState({ value: '', results: [] });
  },
  viewReport: (value) => {
    useReportSearchStore.setState({ value: value.toString() });
    window.location.hash = '/reports';
    useReportSearchStore.getState().search();
  },
  viewHiredBy: () => {
<<<<<<< HEAD
    useOfficerSearchStore.setState({ value: get().officer.hiredBy.citizenid });
=======
    let officer = get().officer;
    if (officer.hiredBy.citizenid === "0") return;
    useOfficerSearchStore.setState({ value: officer.hiredBy.citizenid });
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    useOfficerSearchStore.getState().search();
  },
}));

export default useOfficerStore;
