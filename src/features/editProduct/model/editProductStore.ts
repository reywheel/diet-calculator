import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IProduct } from '@/entities/product';

type State = {
  editableProduct: IProduct | null;
};

type Actions = {
  actions: {
    setEditableProduct: (p: IProduct) => void;
  };
};

const useEditProductStore = create<State & Actions>()(
  devtools(
    (set) => ({
      editableProduct: null,
      actions: {
        setEditableProduct: (product) => set({ editableProduct: product }),
      },
    }),
    {
      name: 'editProductStore',
      anonymousActionType: 'editProductStore',
    },
  ),
);

export const useEditableProduct = () =>
  useEditProductStore((state) => state.editableProduct);

export const useActions = () => useEditProductStore((state) => state.actions);
