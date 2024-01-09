import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IProduct } from './types.ts';
import _ from 'lodash';

type State = {
  products: IProduct[];
};

type Actions = {
  actions: {
    addProduct: (p: IProduct) => void;
    removeProduct: (id: string) => void;
    getProductById: (id: string) => IProduct | undefined;
  };
};

const useProductStore = create<State & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        products: [] as IProduct[],
        actions: {
          addProduct: (product) =>
            set((state) => ({ products: [...state.products, product] })),
          removeProduct: (productId) =>
            set((state) => ({
              products: state.products.filter(
                (product) => product.id !== productId,
              ),
            })),
          getProductById: (id) =>
            get().products.find((product) => product.id === id),
        },
      }),
      {
        name: 'productStore',
        partialize: (state) => _.pick(state, ['products']),
      },
    ),
    {
      name: 'productStore',
      anonymousActionType: 'productStore',
    },
  ),
);

export const useProducts = () => useProductStore((state) => state.products);

export const useActions = () => useProductStore((state) => state.actions);
