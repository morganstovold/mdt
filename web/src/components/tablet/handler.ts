import { create } from 'zustand';
import fetchNui, { isEnvBrowser } from '@/lib/fetchNui';

type State = {
  transparent: boolean;
  open: boolean;
};

type Actions = {
  setTransparent: (transparent: boolean) => void;
  setOpen: (open: boolean) => void;
  onClose: () => void;
};

const useTabletStore = create<State & Actions>((set) => ({
  transparent: false,
  setTransparent: (transparent) => set({ transparent }),
  open: isEnvBrowser(),
  setOpen: (open) => set({ open }),
  onClose: () => {
    fetchNui('mdt:close');
  },
}));

export default useTabletStore;
