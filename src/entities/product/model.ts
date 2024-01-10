import { IProduct } from './model/types.ts';
import { persistentAtom } from '@nanostores/persistent';
import { action } from 'nanostores';
import { nanoid } from 'nanoid';

export const $products = persistentAtom<IProduct[]>('products', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const addProduct = action(
  $products,
  'addProduct',
  (store, product: Omit<IProduct, 'id'>) => {
    const newProduct = { ...product, id: nanoid() };
    store.set([...store.get(), newProduct]);
  },
);

export const deleteProduct = action(
  $products,
  'deleteProduct',
  (store, productId: string) => {
    const newProducts = store
      .get()
      .filter((product) => product.id !== productId);
    store.set(newProducts);
  },
);
