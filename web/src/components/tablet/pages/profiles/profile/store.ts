import { create } from 'zustand';
import { produce } from 'immer';
import useVehicleSearchStore from '../../vehicles/search/store';
import useReportSearchStore from '../../reports/search/store';
import { Charge } from '../../legislation/store';
<<<<<<< HEAD

export type Image = {
  url: string;
  notes?: string;
};
=======
import { Image } from '@/components/tablet/Gallery';
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

export type Profile = {
  pfp: string;
  citizenid?: string;
  firstname: string;
  lastname: string;
  dob: string;
  gender: string;
  job: string;
  phone: string;
  notes: string;
  licenses: { name: string; active: boolean }[];
  reports: {
    id: number;
    title: string;
    officer: {
      firstname: string;
      lastname: string;
    };
    warrant?: boolean;
  }[];
  convictions: { charge: Charge; count: number }[];
  properties: { name: string; type: string }[];
  vehicles: { plate: string; vehicle: string }[];
  hasWarrant?: boolean;
  gallery: Image[];
  updatedAt: string;
  noEntry?: boolean;
};

export const defaultProfile: Profile = {
  pfp: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
  firstname: 'Citizen',
  lastname: '',
  dob: '',
  gender: '1',
  job: 'unemployed',
  phone: '',
  notes: '',
  licenses: [],
  convictions: [],
  reports: [],
  properties: [],
  vehicles: [],
  gallery: [],
  updatedAt: new Date().toString(),
};

type State = {
  profile: Profile;
  snapshot: Profile | null;

  value: string[];
};

type Actions = {
  setValue: (value: string[]) => void;

  setNotes: (notes: string) => void;
  setPFP: (pfp: string) => void;
  addImage: (image: Image) => void;
  removeImage: (image: string) => void;
  updateImage: (oldImage: Image, newImage: Image) => void;
  setLicense: (name: string, active: boolean) => void;

  viewVehicle(plate: string): void;
  viewReport(id: number): void;
};

const useProfileStore = create<State & Actions>((set) => ({
  profile: defaultProfile,
  snapshot: null,
  value: [],
  setValue: (value: string[]) => set({ value }),
  setNotes: (notes) =>
    set(
      produce((state: State) => {
        state.profile.notes = notes;
      }),
    ),
  setPFP: (pfp) =>
    set(
      produce((state: State) => {
        state.profile.pfp = pfp;
      }),
    ),
  addImage: (image) =>
    set(
      produce((state: State) => {
        state.profile.gallery.push(image);
      }),
    ),
  removeImage: (image) =>
    set(
      produce((state: State) => {
        const index = state.profile.gallery.findIndex((i) => i.url === image);
        if (index === -1) return;
        state.profile.gallery.splice(index, 1);
      }),
    ),
  updateImage: (newImage, oldImage) =>
    set(
      produce((state: State) => {
        const index = state.profile.gallery.findIndex((i) => i.url === oldImage.url);
        if (index === -1) return;
        state.profile.gallery[index] = newImage;
      }),
    ),
  setLicense: (name, active) =>
    set(
      produce((state: State) => {
        const license = state.profile.licenses.find((l) => l.name === name);
        if (!license) return;
        license.active = active;
      }),
    ),
  viewVehicle: (value) => {
    useVehicleSearchStore.setState({ value });
    window.location.hash = '/vehicles';
    useVehicleSearchStore.getState().search();
  },
  viewReport: (value) => {
    useReportSearchStore.setState({ value: value.toString() });
    window.location.hash = '/reports';
    useReportSearchStore.getState().search();
  },
}));

export default useProfileStore;
