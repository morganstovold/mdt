import { create } from 'zustand';
import useReportStore, { type Report } from '../report/store';
import { fakeData, fakeSearchData } from './fake';
import fetchNui, { isEnvBrowser } from '@/lib/fetchNui';
import { toast } from '@/components/ui/use-toast';
import useReportControlStore from '../report/controls';

export type IDK = Partial<Report> & { citizenid: string; firstname: string; lastname: string; callsign: string };

type State = {
  searching: boolean;
  loading: number | false;
  value: string;
  lastValue: string;
  results: IDK[];
  options: {
    items: number;
    page: number;
  };
};

type Actions = {
  loadReport: (id: number) => Promise<void>;
  setValue: (value: string) => void;
  search: () => Promise<void>;
  recent: () => Promise<void>;
};

const useReportSearchStore = create<State & Actions>((set, get) => ({
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
  loadReport: async (id) => {
    const report = useReportStore.getState().report;
    const { loading } = get();

    if (report.id === id || loading) return;
    set({ loading: id });

    const resp = await fetchNui('reports:get', id, fakeData);

    if (resp.status !== 'ok') {
      toast({
        title: 'Report Error',
        description: 'There was an error loading the report.',
      });
      set({ loading: false });

      return;
    }
    useReportStore.setState({ value: [], report: resp.data });
    useReportControlStore.setState({ canEdit: true, editing: false });
    set({
      loading: false,
    });
  },
  search: async () => {
    const { value, lastValue } = get();
    if (value === lastValue || value.length < 1) return;

    set({ searching: true, lastValue: value, results: [] });

    const resp = await fetchNui('reports:search', value, fakeSearchData);
    set({
      searching: false,
      results: resp.data || [],
    });

    if (resp.status !== 'ok')
      toast({
        title: 'Search Error',
        description: 'There was an error searching for reports.',
      });
  },
  recent: async () => {
    set({searching: true, results: []});

    const resp = await fetchNui('reports:recent', {}, fakeSearchData);
    set({
      searching: false,
      results: resp.data || [],
    });

    if (resp.status !== 'ok')
      toast({
        title: 'Search Error',
        description: 'There was an error searching for reports.',
      });
  }
}));

export default useReportSearchStore;
