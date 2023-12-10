import { create } from 'zustand';
import useOfficerStore, { type Officer } from '../officer/store';
import { fakeData, fakeSearchData } from './fake';
import fetchNui, { isEnvBrowser } from '@/lib/fetchNui';
import { toast } from '@/components/ui/use-toast';
import useOfficerControlsStore from '../officer/controls';

type State = {
  searching: boolean;
  loading: string | false;
  value: string;
  lastValue: string;
  results: Partial<Officer>[];
  options: {
    items: number;
    page: number;
  };
};

type Actions = {
  loadOfficer: (_officer: Officer) => Promise<void>;
  setValue: (value: string) => void;
  search: () => Promise<void>;
};

const useOfficerSearchStore = create<State & Actions>((set, get) => ({
  searching: false,
  loading: false,
  value: '',
  lastValue: '',
  results: isEnvBrowser() ? fakeSearchData : [],
  options: {
    items: 10,
    page: 1,
  },
  setValue: (value: string) => set({ value }),
  loadOfficer: async (_officer) => {
    const officer = useOfficerStore.getState().officer;
    const { loading } = get();

    if (officer.citizenid === _officer.citizenid || loading) return;
    set({ loading: _officer.citizenid });

    const resp = await fetchNui('roster:get', _officer.citizenid, fakeData);

    if (resp.status !== 'ok') {
      toast({
        title: 'Officer Error',
        description: 'There was an error loading the officer.',
      });
      set({ loading: false });

      return;
    }

    useOfficerStore.setState({ value: [], officer: resp.data });
    useOfficerControlsStore.setState({ canEdit: true, editing: false });
    set({
      loading: false,
    });
  },
  search: async () => {
    const { value, lastValue } = get();
    if (value === lastValue || value.length < 1) return;

    set({ searching: true, lastValue: value, results: [] });

    const resp = await fetchNui('roster:search', value, fakeSearchData);
    set({
      searching: false,
      results: resp.data || [],
    });

    if (resp.status !== 'ok') {
      toast({
        title: 'Search Error',
        description: 'There was an error searching for officers.',
      });
    }
  },
}));

export default useOfficerSearchStore;
