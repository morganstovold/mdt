import { create } from 'zustand';
import { produce } from 'immer';
import { Charge } from '../../legislation/store';
import { Profile } from '../../profiles/profile/store';
import useOfficerSearchStore from '../../roster/search/store';
<<<<<<< HEAD
=======
import { type Image } from '@/components/tablet/Gallery';
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

export const reportMap: string[] = ['Incident Report', 'Traffic Report', 'Other'];

export type Offender = {
  citizenid: string;
  firstname: string;
  lastname: string;
  charges: { charge: Charge; count: number }[];
  warrant?: string;
};

export type Officer = {
  citizenid: string;
  firstname: string;
  lastname: string;
  callsign: string;
  department: string;
  rank: number;
  publisher?: boolean;
};

export type Report = {
  id?: number;
  locked: boolean;
  title: string;
  type: string;
  notes: string;
  offenders: Offender[];
  officers: Officer[];
<<<<<<< HEAD
  gallery: string[];
=======
  gallery: Image[];
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  updatedAt: string;
  createdAt: string;
};

export const defaultReport: Report = {
  locked: false,
  title: '',
  type: reportMap[0],
  notes: '<p></p>',
  offenders: [],
  officers: [],
  gallery: [],
  updatedAt: new Date().toString(),
  createdAt: new Date().toString(),
};

type State = {
  report: Report;
  snapshot: Report | null;

  value: string[];
};

type Actions = {
  setValue: (value: string[]) => void;
  viewOfficer: (citizenid: string) => void;

  toggleLock: () => void;
  setTitle: (title: string) => void;
  setType: (type: string) => void;
  setNotes: (notes: string) => void;
  addOffender: (offender: Profile) => void;
  removeOffender: (offender: string) => void;
  updateCharges: (offender: number, charges: { charge: Charge; count: number }[]) => void;
  setWarrant: (offender: number, warrant: string) => void;
  removeWarrant: (offender: number) => void;
  addOfficer: (officer: Officer) => void;
  removeOfficer: (officer: string) => void;
<<<<<<< HEAD
  addImage: (image: string) => void;
  removeImage: (image: string) => void;
  updateImage: (oldImage: string, newImage: string) => void;
=======
  addImage: (image: Image) => void;
  removeImage: (image: string) => void;
  updateImage: (oldImage: Image, newImage: Image) => void;
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
};

const useReportStore = create<State & Actions>((set) => ({
  report: defaultReport,
  snapshot: null,
  value: [],
  setValue: (value: string[]) => set({ value }),
  viewOfficer: (citizenid) => {
    useOfficerSearchStore.setState({ value: citizenid });
    window.location.hash = '/roster';
    useOfficerSearchStore.getState().search();
  },
  toggleLock: () =>
    set(
      produce((state: State) => {
        state.report.locked = !state.report.locked;
      }),
    ),
  setTitle: (title) =>
    set(
      produce((state: State) => {
        state.report.title = title;
      }),
    ),
  setType: (type) =>
    set(
      produce((state: State) => {
        state.report.type = type;
      }),
    ),
  setNotes: (notes) =>
    set(
      produce((state: State) => {
        state.report.notes = notes;
      }),
    ),
  addOffender: (offender) =>
    set(
      produce((state: State) => {
        state.report.offenders.push({
          citizenid: offender.citizenid!,
          firstname: offender.firstname,
          lastname: offender.lastname,
          charges: [],
        });
      }),
    ),
  removeOffender: (offender) =>
    set(
      produce((state: State) => {
        state.report.offenders = state.report.offenders.filter((o) => o.citizenid !== offender);
      }),
    ),
  updateCharges: (offender, charges) =>
    set(
      produce((state: State) => {
        state.report.offenders[offender].charges = charges;
      }),
    ),
  setWarrant: (offender, warrant) =>
    set(
      produce((state: State) => {
        state.report.offenders[offender].warrant = warrant;
      }),
    ),
  removeWarrant: (offender) =>
    set(
      produce((state: State) => {
        state.report.offenders[offender].warrant = undefined;
      }),
    ),
  addOfficer: (officer) =>
    set(
      produce((state: State) => {
        state.report.officers.push(officer);
      }),
    ),
  removeOfficer: (officer) =>
    set(
      produce((state: State) => {
        state.report.officers = state.report.officers.filter((o) => o.citizenid !== officer);
      }),
    ),
  addImage: (image) =>
    set(
      produce((state: State) => {
        state.report.gallery.push(image);
      }),
    ),
  removeImage: (image) =>
    set(
      produce((state: State) => {
<<<<<<< HEAD
        state.report.gallery = state.report.gallery.filter((i) => i !== image);
      }),
    ),
  updateImage: (oldImage, newImage) =>
    set(
      produce((state: State) => {
        const index = state.report.gallery.findIndex((i) => i === oldImage);
=======
        const index = state.report.gallery.findIndex((i) => i.url === image);
        if (index === -1) return;
        state.report.gallery.splice(index, 1);
      }),
    ),
  updateImage: (newImage, oldImage) =>
    set(
      produce((state: State) => {
        const index = state.report.gallery.findIndex((i) => i.url === oldImage.url);
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
        if (index === -1) return;
        state.report.gallery[index] = newImage;
      }),
    ),
}));

export default useReportStore;
