import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getProductInitialAmount, IProduct } from '@/entities/product';
import _ from 'lodash';

type State = {
  productsAmounts: Record<IProduct['id'], number>;
};

type Actions = {
  actions: {
    addProduct: (p: IProduct) => void;
    removeProduct: (id: string) => void;
    setAmount: (productId: string, amount: number) => void;
  };
};

const useCalculatorStore = create<State & Actions>()(
  devtools(
    persist(
      (set): State & Actions => ({
        productsAmounts: {},
        actions: {
          addProduct: (product) => {
            set((state) => ({
              productsAmounts: {
                ...state.productsAmounts,
                [product.id]: getProductInitialAmount(product),
              },
            }));
          },
          removeProduct: (id) => {
            set((state) => ({
              productsAmounts: _.omit(state.productsAmounts, [id]),
            }));
          },
          setAmount: (productId, amount) => {
            set((state) => ({
              productsAmounts: {
                ...state.productsAmounts,
                [productId]: amount,
              },
            }));
          },
        },
      }),
      {
        name: 'calculatorStore',
        partialize: (state) => _.pick(state, ['productsAmounts']),
      },
    ),
    {
      name: 'calculatorStore',
      anonymousActionType: 'calculatorStore',
    },
  ),
);

export const useProductsAmounts = () =>
  useCalculatorStore((state) => state.productsAmounts);

export const useActions = () => useCalculatorStore((state) => state.actions);
