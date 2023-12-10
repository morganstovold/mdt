import { create } from 'zustand';
import useReportStore, { defaultReport, type Report } from './store';
import fetchNui from '@/lib/fetchNui';
import { toast } from '@/components/ui/use-toast';
import { areObjectsEqual } from '@/lib/utils';
import { Charge } from '../../legislation/store';
import useGlobalStore from '@/store';
<<<<<<< HEAD
=======
import { Image } from '@/components/tablet/Gallery';
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

type PrepedReport = {
  id?: number;
  locked?: boolean;
  title: string;
  type: string;
  notes: string;
  offenders: {
    citizenid: string;
    charges: { charge: Charge; count: number }[];
    warrant?: string;
  }[];
  officers: { citizenid: string; publisher?: boolean }[];
<<<<<<< HEAD
  gallery: string[];
=======
  gallery: Image[];
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  updatedAt?: string;
  createdAt?: string;
};

function PrepReport(report: Report): PrepedReport {
  const newReport: PrepedReport = {
    ...(report.id ? { id: report.id } : {}),
    locked: report.locked,
    title: report.title,
    type: report.type,
    notes: report.notes,
    offenders: report.offenders.map((offender) => ({
      citizenid: offender.citizenid,
      charges: offender.charges,
      warrant: offender.warrant,
    })),
    officers: report.officers.map((officer) => ({
      citizenid: officer.citizenid,
      ...(officer.publisher ? { publisher: true } : {}),
    })),
    gallery: report.gallery,
  };

  return newReport;
}

type State = {
  editing: boolean;
  saving: boolean;
  canEdit: boolean;
};

type Actions = {
  newReport: () => void;
  edit: () => void;
  cancel: () => void;
  save: () => Promise<void>;
<<<<<<< HEAD
  openEvidence: () => Promise<void>;
=======
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
};

const useReportControlStore = create<State & Actions>((set) => ({
  editing: false,
  saving: false,
  canEdit: false,
  newReport: () => {
    const user = useGlobalStore.getState().user;
    useReportStore.setState({
      report: {
        ...defaultReport,
        id: 'new' as unknown as number,
        officers: [
          {
            publisher: true,
            citizenid: user?.citizenid,
            firstname: user?.firstname,
            lastname: user?.lastname,
            callsign: user?.callsign,
            department: user?.department,
            rank: user?.rank,
          },
        ],
      },
      snapshot: defaultReport,
    });
    set({ editing: true });
  },
  edit: () => {
    const report = useReportStore.getState().report;
    useReportStore.setState({ snapshot: report });

    set({ editing: true });
  },
  cancel: () => {
    const snapshot = useReportStore.getState().snapshot;
    if (snapshot) {
      useReportStore.setState({ report: snapshot });
    }
    set({ editing: false });
  },
  save: async () => {
    const state = useReportStore.getState();
    const report = state.report;
    if (report.title.length < 5) {
      toast({
        title: 'Title must be at least 5 characters',
      });
      return;
    }
    if (report.type === '') {
      toast({
        title: 'A Report Type must be selected',
      });
      return;
    }
    const snapshot = state.snapshot;
    if (areObjectsEqual(report, report.id === ('new' as unknown) ? defaultReport : snapshot)) {
      set({ editing: false });
      return;
    }

    set({ saving: true, editing: false, canEdit: true });
    const resp = await fetchNui<{ id: number }>('reports:save', PrepReport(report), { id: 1 });

    useReportStore.setState({
      ...(report.id === ('new' as unknown) && {
        report: resp.status === 'ok' ? { ...report, id: resp.data?.id } : snapshot || defaultReport,
      }),
      snapshot: null,
    });
    set({ saving: false });

    toast({
      title: resp.status === 'ok' ? 'Report Saved' : 'Report Error',
      description: resp.status === 'ok' ? 'Report has been saved' : 'There was an error saving Report',
    });
  },
<<<<<<< HEAD
  openEvidence: async () => {
    const report = useReportStore.getState().report;

    const resp = await fetchNui<{ status: string }>('reports:openEvidence', {id: report.id});

    toast({
      title: resp.status === 'ok' ? 'Evidence Opened' : 'Error Opening Evidence',
      description: resp.status === 'ok' ? 'The evidence has been opened in a new window' : 'There was an error opening the evidence',
    })
  }
=======
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
}));

export default useReportControlStore;
