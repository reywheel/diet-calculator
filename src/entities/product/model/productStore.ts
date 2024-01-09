import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IProduct } from './types.ts';

type State = {
  products: IProduct[];
};

type Actions = {
  addProduct: (p: IProduct) => void;
  removeProduct: (id: string) => void;
};

const useProductStore = create<State>()(
  devtools(
    persist(
      () => ({
        products: [] as IProduct[],
      }),
      { name: 'productStore' },
    ),
    {
      name: 'productStore',
      anonymousActionType: 'productStore',
    },
  ),
);

export const useProducts = () => useProductStore((state) => state.products);

export const useActions = (): Actions => {
  const store = useProductStore;

  return {
    addProduct: (product) =>
      store.setState((state) => ({ products: [...state.products, product] })),
    removeProduct: (productId) =>
      store.setState((state) => ({
        products: state.products.filter((product) => product.id !== productId),
      })),
  };
};
