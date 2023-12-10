import { create } from 'zustand';
import { produce } from 'immer';
import useProfileSearchStore from '../../profiles/search/store';
<<<<<<< HEAD
import { Image } from '../../profiles/profile/store';
=======
import { Image } from '@/components/tablet/Gallery';
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

export type Vehicle = {
  id: number;
  plate: string;
  model: string;
  pfp: string;
  citizenid: string;
  firstname: string;
  lastname: string;
  gender: string;
  job: string;
  notes: string;
  gallery: Image[];
  updatedAt: string;
};

export const defaultVehicle: Vehicle = {
  id: -1,
  plate: 'Plate',
  model: 'Model',
  pfp: '',
  citizenid: '',
  firstname: '',
  lastname: '',
  gender: '0',
  job: '',
  notes: '',
  gallery: [],
  updatedAt: new Date().toString(),
};

type State = {
  vehicle: Vehicle;
  snapshot: Vehicle | null;

  value: string[];
};

type Actions = {
  setValue: (value: string[]) => void;

  setNotes: (notes: string) => void;
  addImage: (image: Image) => void;
  removeImage: (image: string) => void;
  updateImage: (oldImage: Image, newImage: Image) => void;
  viewOwner: () => void;
};

const useVehicleStore = create<State & Actions>((set, get) => ({
  vehicle: defaultVehicle,
  snapshot: null,
  value: [],
  setValue: (value: string[]) => set({ value }),
  setNotes: (notes) =>
    set(
      produce((state: State) => {
        state.vehicle.notes = notes;
      }),
    ),
  addImage: (image) =>
    set(
      produce((state: State) => {
        state.vehicle.gallery.push(image);
      }),
    ),
  removeImage: (image) =>
    set(
      produce((state: State) => {
        const index = state.vehicle.gallery.findIndex((i) => i.url === image);
        if (index === -1) return;
        state.vehicle.gallery.splice(index, 1);
      }),
    ),
  updateImage: (newImage, oldImage) =>
    set(
      produce((state: State) => {
        const index = state.vehicle.gallery.findIndex((i) => i.url === oldImage.url);
        if (index === -1) return;
        state.vehicle.gallery[index] = newImage;
      }),
    ),
  viewOwner: () => {
    useProfileSearchStore.setState({ value: get().vehicle.citizenid });
    window.location.hash = '/';
    useProfileSearchStore.getState().search();
  },
}));

export default useVehicleStore;
