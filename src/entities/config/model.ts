import { action } from 'nanostores';
import { logger } from '@nanostores/logger';
import { persistentAtom } from '@nanostores/persistent';

type NutrientsConfig = {
  protein: number;
  fats: number;
  carbs: number;
};
export const $nutrientsConfig = persistentAtom<NutrientsConfig>(
  'nutrientsConfig',
  {
    protein: 0,
    fats: 0,
    carbs: 0,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export const setNutrientsConfig = action(
  $nutrientsConfig,
  'setNutrientsConfig',
  (store, newValue: NutrientsConfig) => {
    store.set(newValue);
  },
);

logger({
  nutrientsConfig: $nutrientsConfig,
});
