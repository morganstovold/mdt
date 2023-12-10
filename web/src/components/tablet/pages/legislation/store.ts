import { create } from 'zustand';
import { produce } from 'immer';
import { toast } from '@/components/ui/use-toast';
import fetchNui, { isEnvBrowser } from '@/lib/fetchNui';
import { areObjectsEqual } from '@/lib/utils';
import { charges } from './fake';

function PrepCharges(oldCharges: Charge[], newCharges: Charge[]) {
  const oldChargesMap = new Map(oldCharges.map((charge) => [charge.id, charge]));
  const newChargesMap = new Map(newCharges.map((charge) => [charge.id, charge]));

  let charges = [...newChargesMap.values()]
    .map((charge) => {
      const oldCharge = oldChargesMap.get(charge.id);

      if (!oldCharge || !areObjectsEqual(charge, oldCharge)) {
        return charge;
      }
    })
    .filter(Boolean);

  for (const oldCharge of oldChargesMap.values()) {
    if (!newChargesMap.has(oldCharge.id)) {
      // @ts-expect-error
      charges.push({ ...oldCharge, removed: true });
    }
  }

  return charges;
}

export type Charge = {
  id: number;
  title: string;
  description: string;
  fine: string;
  months: string;
  type: string;
};

type State = {
  loading: boolean;
  loaded: boolean;
  editing: boolean;
  saving: boolean;

  value: string;
  charges: Charge[];
  snapshot: Charge[] | null;
};

type Actions = {
  edit: () => void;
  cancel: () => void;
  get: () => Promise<void>;
  save: () => Promise<void>;

  setValue: (value: string) => void;
  setData: (charges: Charge[]) => void;
  addCharge: (charge: Charge) => void;
  removeCharge: (charge: number) => void;
  editCharge: (charge: Charge) => void;
};

const useLegislationStore = create<State & Actions>((set, get) => ({
  loading: false,
  loaded: false,
  editing: false,
  saving: false,
  value: '',
  charges: isEnvBrowser() ? charges : [],
  snapshot: null,
  setValue: (value) => set({ value }),
  setData: (charges) => set({ charges }),
  addCharge: (charge) =>
    set(
      produce((state: State) => {
        charge.id = state.charges.reduce((max, charge) => Math.max(charge.id, max), 0) + 1;
        state.charges.push(charge);
      }),
    ),
  removeCharge: (charge) =>
    set(
      produce((state: State) => {
        state.charges = state.charges.filter((c) => c.id !== charge);
      }),
    ),
  editCharge: (charge) =>
    set(
      produce((state: State) => {
        const index = state.charges.findIndex((c) => c.id === charge.id);
        if (index !== -1) {
          state.charges[index] = charge;
        }
      }),
    ),
  edit: () => {
    const charges = get().charges;
    set({ snapshot: charges, editing: true });
  },
  cancel: () => {
    const snapshot = get().snapshot;
    const data: Partial<State> = { editing: false, snapshot: null };
    if (snapshot) {
      data.charges = snapshot;
    }
    set(data);
  },
  get: async () => {
    if (get().editing) return;
    set({ loading: true });
<<<<<<< HEAD
    const resp = await fetchNui<Charge[]>('legislation:get', {}, isEnvBrowser() ? charges : []);
=======
    const resp = await fetchNui<Charge[]>('legislation:get', {}, charges);
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    set({ loading: false, loaded: true, charges: resp.data || [] });

    if (resp.status !== 'ok')
      toast({
        title: 'Legislation Error',
        description: 'There was an error loading Legislation',
      });
  },
  save: async () => {
    const state = get();
    const charges = state.charges;
    const snapshot = state.snapshot || [];
    if (areObjectsEqual(charges, snapshot)) {
      set({ editing: false });
      return;
    }

    set({ saving: true, editing: false });
    const resp = await fetchNui('legislation:save', PrepCharges(snapshot, charges), {});
    set({
      ...(resp.status ? {} : { snapshot }),
      snapshot: null,
      saving: false,
    });

    toast({
      title: resp.status === 'ok' ? 'Legislation Saved' : 'Legislation Error',
      description: resp.status === 'ok' ? 'Legislation has been saved' : 'There was an error saving Legislation',
    });
  },
}));

export default useLegislationStore;
