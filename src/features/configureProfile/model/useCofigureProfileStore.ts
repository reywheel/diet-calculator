import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type State = {
  protein: string;
  fats: string;
  carbs: string;
};

type Actions = {
  setProtein: (v: string) => void;
  setFats: (v: string) => void;
  setCarbs: (v: string) => void;
};

const useConfigureProfileStore = create<State>()(
  devtools(
    persist(
      () => ({
        protein: '',
        fats: '',
        carbs: '',
      }),
      {
        name: 'configureProfileStore',
        storage: createJSONStorage(() => localStorage),
      },
    ),
    {
      name: 'configureProfileStore',
      anonymousActionType: 'configureProfileStore',
    },
  ),
);

export const useProtein = () =>
  useConfigureProfileStore((state) => state.protein);

export const useFats = () => useConfigureProfileStore((state) => state.fats);

export const useCarbs = () => useConfigureProfileStore((state) => state.carbs);

export const useActions = (): Actions => {
  const store = useConfigureProfileStore;

  return {
    setProtein: (protein: string) => store.setState({ protein }),
    setFats: (fats: string) => store.setState({ fats }),
    setCarbs: (carbs: string) => store.setState({ carbs }),
  };
};
