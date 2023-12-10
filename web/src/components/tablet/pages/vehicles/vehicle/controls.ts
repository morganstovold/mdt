import { create } from 'zustand';
import useVehicleStore, { defaultVehicle } from './store';
import fetchNui from '@/lib/fetchNui';
import { toast } from '@/components/ui/use-toast';
import { areObjectsEqual } from '@/lib/utils';

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

const useVehicleControlsStore = create<State & Actions>((set) => ({
  editing: false,
  saving: false,
  canEdit: false,
  edit: () => {
    const vehicle = useVehicleStore.getState().vehicle;
    useVehicleStore.setState({ snapshot: vehicle });

    set({ editing: true });
  },
  cancel: () => {
    const snapshot = useVehicleStore.getState().snapshot;
    if (snapshot) {
      useVehicleStore.setState({ vehicle: snapshot });
    }
    set({ editing: false });
  },
  save: async () => {
    const state = useVehicleStore.getState();
    const vehicle = state.vehicle;
    const snapshot = state.snapshot;
    if (areObjectsEqual(vehicle, snapshot)) {
      set({ editing: false });
      return;
    }

    set({ saving: true, editing: false });
    const resp = await fetchNui(
      'vehicles:save',
      {
        id: vehicle.plate,
        notes: vehicle.notes,
<<<<<<< HEAD
=======
        gallery: vehicle.gallery,
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
      },
      {},
    );
    set({ saving: false });
    useVehicleStore.setState({
      vehicle: resp.status === 'ok' ? vehicle : snapshot || defaultVehicle,
      snapshot: null,
    });

    toast({
      title: resp.status === 'ok' ? 'Vehicle Saved' : 'Vehicle Error',
      description: resp.status === 'ok' ? 'Vehicle has been saved' : 'There was an error saving vehicle',
    });
  },
}));

export default useVehicleControlsStore;
