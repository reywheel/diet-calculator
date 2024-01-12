import { makeAutoObservable } from 'mobx';

import { productStore, ProductStore } from '@/entities/product';
import {
  productsAmountsStore,
  ProductsAmountsStore,
} from '@/entities/productAmount';

class ProductsPickerStore {
  productsStore: ProductStore;
  productsAmountsStore: ProductsAmountsStore;

  get productsListForPick() {
    return this.productsStore.products.filter((product) => {
      const hasProductAmount =
        !!this.productsAmountsStore.productsAmounts[product.id];

      return !hasProductAmount;
    });
  }

  constructor() {
    makeAutoObservable(this);

    this.productsStore = productStore;
    this.productsAmountsStore = productsAmountsStore;
  }
}

export const productsPickerStore = new ProductsPickerStore();
