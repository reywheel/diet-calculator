import { action, atom } from 'nanostores';
import { logger } from '@nanostores/logger';

export const $protein = atom('');
export const $fats = atom('');
export const $carbs = atom('');

export const setProtein = action($protein, 'setProtein', (store, v: string) => {
  store.set(v);
});

export const setFats = action($fats, 'setFats', (store, v: string) => {
  store.set(v);
});

export const setCarbs = action($carbs, 'setCarbs', (store, v: string) =>
  store.set(v),
);

logger({
  protein: $protein,
  fats: $fats,
  carbs: $carbs,
});
