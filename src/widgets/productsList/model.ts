import { makeAutoObservable } from 'mobx';

import {
  filterProductsStore,
  FilterProductsStore,
} from '@/features/filterProducts';
import { productStore, ProductStore } from '@/entities/product';

class ProductListStore {
  productsStore: ProductStore;
  filterProductsStore: FilterProductsStore;

  get allProducts() {
    return this.productsStore.products;
  }

  get filteredProducts() {
    if (!this.filterProductsStore.queryString)
      return this.productsStore.products;

    return this.productsStore.products.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(this.filterProductsStore.queryString.toLowerCase());
    });
  }

  constructor() {
    this.productsStore = productStore;
    this.filterProductsStore = filterProductsStore;

    makeAutoObservable(this);
  }
}

export const productListStore = new ProductListStore();
