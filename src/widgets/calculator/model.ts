import { IProduct, productStore, ProductStore } from '@/entities/product';
import {
  productsAmountsStore,
  ProductsAmountsStore,
} from '@/entities/productAmount';
class CalculatorStore {
  productsStore: ProductStore;
  productsAmountsStore: ProductsAmountsStore;

  get productsAmountsList() {
    return Object.entries(this.productsAmountsStore.productsAmounts).reduce(
      (acc, [productId, amount]) => {
        const product = this.productsStore.getProductById(productId);

        if (!product) return acc;

        return [...acc, { ...product, amount }];
      },
      [] as (IProduct & { amount: number })[],
    );
  }

  constructor() {
    this.productsStore = productStore;
    this.productsAmountsStore = productsAmountsStore;
  }
}

export const calculatorStore = new CalculatorStore();
