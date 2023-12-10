<<<<<<< HEAD
import useReportSearchStore from '@/components/tablet/pages/reports/search/store';
import { Locales } from '@/i18n/i18n-types';
import fetchNui from '@/lib/fetchNui';
import { create } from 'zustand';
=======
import { type IDK as Report } from '@/components/tablet/pages/reports/search/store';
import useReportSearchStore from '@/components/tablet/pages/reports/search/store';
import { Locales } from '@/i18n/i18n-types';
import fetchNui, { isEnvBrowser } from '@/lib/fetchNui';
import { create } from 'zustand';
import { devData } from './dev';
import useLegislationStore, { Charge } from '@/components/tablet/pages/legislation/store';
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

type Rank = {
  name: string;
  permissions: string[];
};

type State = {
<<<<<<< HEAD
=======
  authorized: boolean;
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  loaded: boolean;
  loading: boolean;
  language: Locales;
  jobs: string[];
  templates: { label: string; template: string }[];
  certs: { id: number; label: string }[];
  checklist: { id: number; label: string; description: string }[];
  departments: {
    name: string;
    ranks: Rank[];
  }[];
  user: {
    pfp: string;
    citizenid: string;
    firstname: string;
    lastname: string;
    department: string;
    callsign: string;
    rank: number;
  };
};

type Actions = {
<<<<<<< HEAD
  load: () => Promise<void>;
=======
  load: (
    data: Partial<State & { reports: Report[]; charges: Charge[]; status?: string; authorized: boolean }>,
  ) => Promise<void>;
  setLoading: () => void;
  attemptReload: () => Promise<void>;
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  setUser: (user: State['user']) => void;
};

const useGlobalStore = create<State & Actions>((set) => ({
<<<<<<< HEAD
  loaded: false,
  loading: false,
  load: async () => {
    set({ loading: true });
    const resp = await fetchNui(
      'core:load',
      {},
      {
        reports: [],
        language: 'en' as Locales,
        jobs: ['police', 'offpolice'],
        templates: [
          {
            label: 'Incident Report',
            template: `
              <h4>Incident Report:</h4>
              <h4>Medical Report:</h4>
              <h4>Confiscated Items: Locker #</h4>
              <h4>Use of Force:</h4>
              <h4>Probable Cause:</h4>
              <h4>Identified:</h4>
              <h4>Miranda Warning Given:</h4>
              <h4>GSR:</h4>
            `,
          },
          {
            label: 'Traffic Report',
            template: `
              <h4>Traffic Report:</h4>
              <h4>Make/Model:</h4>
              <h4>Color:</h4>
              <h4>License Plate:</h4>
              <h4>Impound Status(Yes/No):</h4>
            `,
          },
        ],
        certs: [
          { id: 1, label: 'marine' },
          { id: 2, label: 'air' },
          { id: 3, label: 'interceptor' },
          { id: 4, label: 'mbu' },
          { id: 5, label: 'swat' },
          { id: 6, label: 'detective' },
          { id: 7, label: 'k9' },
        ],
        checklist: [
          {
            id: 1,
            label: 'Tour of LSPD and Garage',
            description: 'Tour of the LSPD and Garage. This includes the briefing room, locker room, and the garage.',
          },
          {
            id: 2,
            label: 'F1 Menu',
            description: 'How to use the F1 Menu.',
          },
          {
            id: 3,
            label: 'MDT Use and Explanation',
            description: 'How to operate the MDT Tool and how to use it effectively.',
          },
          {
            id: 4,
            label: 'Everyday Procedures',
            description: 'How to impound a vehicle, fine a person, jail a person, and revoke a license.',
          },
          {
            id: 5,
            label: 'Basic Driving Procedures',
            description: 'How to drive a police vehicle and how to drive in a pursuit (Code 1/2/3)',
          },
          {
            id: 6,
            label: '10 Code Training',
            description: 'How to use the 10 Codes and what they mean.',
          },
          {
            id: 7,
            label: 'CDS Calls and Procedures',
            description: 'How to handle CDS Calls and how to handle them.',
          },
          {
            id: 8,
            label: '10-38 Showcase',
            description: 'Watched a 10-38 in action and how to handle it.',
          },
          {
            id: 9,
            label: '10-80 Showcase',
            description: 'Watched a 10-80 in action and how to handle it.',
          },
          {
            id: 10,
            label: 'Use of Force Showcase',
            description: 'Watched a Use of Force in action and how to handle it.',
          },
          {
            id: 11,
            label: 'Defensive Vehicle Positioning Showcase',
            description: 'Watched a Defensive Vehicle Positioning in action and how to handle it.',
          },
          {
            id: 12,
            label: 'Breaking Procedures',
            description: 'I dont even know what to put here.',
          },
        ],
        departments: [
          {
            name: 'lspd',
            ranks: [
              {
                name: 'cadet',
                permissions: [
                  'profiles.view',
                  'profiles.view.hidden',
                  'profiles.update',
                  'reports.view',
                  'reports.update',
                  'reports.new',
                  'reports.lock',
                  'reports.evidence',
                  'vehicles.view',
                  'vehicles.update',
                  'legislation.view',
                  'legislation.update',
                  'roster.view',
                  'roster.update',
                  'roster.hire',
                  'roster.fire',
                  'roster.certs',
                  'roster.fto',
                ],
              },
              {
                name: 'officer',
                permissions: [
                  'profiles.view',
                  'profiles.view.hidden',
                  'profiles.update',
                  'reports.view',
                  'reports.update',
                  'reports.new',
                  'reports.lock',
                  'reports.evidence',
                  'vehicles.view',
                  'vehicles.update',
                  'legislation.view',
                  'legislation.update',
                  'roster.view',
                  'roster.update',
                  'roster.hire',
                  'roster.fire',
                  'roster.certs',
                  'roster.fto',
                ],
              },
              {
                name: 'sergeant',
                permissions: [
                  'profiles.view',
                  'profiles.view.hidden',
                  'profiles.update',
                  'reports.view',
                  'reports.update',
                  'reports.new',
                  'reports.lock',
                  'reports.evidence',
                  'vehicles.view',
                  'vehicles.update',
                  'legislation.view',
                  'legislation.update',
                  'roster.view',
                  'roster.update',
                  'roster.hire',
                  'roster.fire',
                  'roster.certs',
                  'roster.fto',
                ],
              },
              {
                name: 'lieutenant',
                permissions: [
                  'profiles.view',
                  'profiles.view.hidden',
                  'profiles.update',
                  'reports.view',
                  'reports.update',
                  'reports.new',
                  'reports.lock',
                  'reports.evidence',
                  'vehicles.view',
                  'vehicles.update',
                  'legislation.view',
                  'legislation.update',
                  'roster.view',
                  'roster.update',
                  'roster.hire',
                  'roster.fire',
                  'roster.certs',
                  'roster.fto',
                ],
              },
              {
                name: 'captain',
                permissions: [
                  'profiles.view',
                  'profiles.view.hidden',
                  'profiles.update',
                  'reports.view',
                  'reports.update',
                  'reports.new',
                  'reports.lock',
                  'reports.evidence',
                  'vehicles.view',
                  'vehicles.update',
                  'legislation.view',
                  'legislation.update',
                  'roster.view',
                  'roster.update',
                  'roster.hire',
                  'roster.fire',
                  'roster.certs',
                  'roster.fto',
                ],
              },
              {
                name: 'chief',
                permissions: [
                  'profiles.view',
                  'profiles.view.hidden',
                  'profiles.update',
                  'reports.view',
                  'reports.update',
                  'reports.new',
                  'reports.lock',
                  'vehicles.view',
                  'vehicles.update',
                  'legislation.view',
                  'legislation.update',
                  'roster.view',
                  'roster.update',
                  'roster.hire',
                  'roster.fire',
                  'roster.certs',
                  'roster.fto',
                ],
              },
            ],
          },
        ],
        user: {
          pfp: 'https://i.imgur.com/4M34hi2.png',
          citizenid: '123456',
          firstname: 'don',
          lastname: 'morello',
          callsign: '192',
          department: 'lspd',
          rank: 5,
        },
      },
    );
    set({ loaded: resp.status === 'ok', loading: false, ...resp.data });
    useReportSearchStore.setState({ results: resp.data?.reports ?? [] });
=======
  authorized: isEnvBrowser(),
  loaded: isEnvBrowser(),
  loading: false,
  load: async (data) => {
    if (data?.status == 'error') return set({ loading: false, loaded: false });
    set({ ...data, loading: false, loaded: true });
    if (data.charges) useLegislationStore.setState({ loading: false, loaded: true, charges: data.charges || [] });
    useReportSearchStore.setState({ results: data?.reports ?? [] });
  },
  setLoading: () => set({ loading: true }),
  attemptReload: async () => {
    if (useGlobalStore.getState().loading) return;
    await fetchNui('auth:reload');
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  },
  language: 'en',
  jobs: [],
  templates: [],
  certs: [],
  checklist: [],
  departments: [],
  user: {} as unknown as State['user'],
<<<<<<< HEAD
=======
  ...(isEnvBrowser() && devData),
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  setUser: (user) => set({ user }),
}));

export function getRanks(department: string): Rank[] {
  return useGlobalStore.getState().departments.find((d) => d.name === department)?.ranks ?? [];
}

export function rankString(department?: string, rank?: number): string {
  try {
    const ranks = getRanks(department ?? useGlobalStore.getState().user.department);
    if (!ranks) throw new Error('Unknown department');
    return ranks[rank ?? useGlobalStore.getState().user.rank]?.name ?? 'Unknown rank';
  } catch (e) {
    throw new Error('Unknown rank');
  }
}

export function usePermissions(): (perm: string) => boolean {
  return useGlobalStore((state) => {
    const ranks = getRanks(state.user.department);
    const rank = ranks[state.user.rank];
<<<<<<< HEAD
=======

    if (!rank) {
      useGlobalStore.getState().attemptReload();
      return () => false;
    }

>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    return (perm: string) => {
      if (rank.permissions?.includes(perm)) return true;
      return false;
    };
  });
}

export default useGlobalStore;
