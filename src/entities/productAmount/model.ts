import { makeAutoObservable } from 'mobx';
import _ from 'lodash';
import { makePersistable } from 'mobx-persist-store';

import { TProductsAmounts } from './types.ts';

export class ProductsAmountsStore {
  productsAmounts: TProductsAmounts = {};

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'productsAmountsStore',
      properties: ['productsAmounts'],
      storage: localStorage,
    });
  }

  addProductAmount = (productId: string, amount: number) => {
    this.productsAmounts[productId] = amount;
  };

  changeProductAmount = (productId: string, amount: number) => {
    const hasProductAmount = !!this.productsAmounts[productId];

    if (!hasProductAmount)
      throw new Error('Не найдено кол-во продукта для изменения');

    this.productsAmounts[productId] = amount;
  };

  deleteProductAmount = (productId: string) => {
    this.productsAmounts = _.omit(this.productsAmounts, [productId]);
  };
}

export const productsAmountsStore = new ProductsAmountsStore();
