import { create } from 'zustand';
import useVehicleStore, { type Vehicle } from '../vehicle/store';
import fetchNui, { isEnvBrowser } from '@/lib/fetchNui';
import { toast } from '@/components/ui/use-toast';
import { fakeData, fakeSearchData } from './fake';
import useVehicleControlsStore from '../vehicle/controls';

type State = {
  searching: boolean;
  loading: number | false;
  value: string;
  lastValue: string;
  results: Partial<Vehicle>[];
  options: {
    items: number;
    page: number;
  };
};

type Actions = {
  loadVehicle: (id: number) => Promise<void>;
  setValue: (value: string) => void;
  search: () => Promise<void>;
};

const useVehicleSearchStore = create<State & Actions>((set, get) => ({
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
  loadVehicle: async (id) => {
    const vehicle = useVehicleStore.getState().vehicle;
    const { loading } = get();
    if (vehicle.id === id || loading) return;

    set({ loading: id });

    const resp = await fetchNui('vehicles:get', id, fakeData);

    if (resp.status !== 'ok') {
      toast({
        title: 'Vehicle Error',
        description: 'There was an error loading the Vehicle.',
      });
      set({ loading: false });

      return;
    }

    useVehicleStore.setState({ value: [], vehicle: resp.data });
    useVehicleControlsStore.setState({ canEdit: true, editing: false });
    set({
      loading: false,
    });
  },
  search: async () => {
    const { value, lastValue } = get();
    if (value === lastValue || value.length < 1) return;

    set({ searching: true, lastValue: value, results: [] });

    const resp = await fetchNui('vehicles:search', value, fakeSearchData);

    set({
      searching: false,
      results: resp.data || [],
    });

    if (resp.status !== 'ok')
      toast({
        title: 'Search Error',
        description: 'There was an error searching for vehicles.',
      });
  },
}));

export default useVehicleSearchStore;
