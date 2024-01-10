import { makeAutoObservable } from 'mobx';
import {
  getProductInitialAmount,
  productStore,
  ProductStore,
} from '@/entities/product';
import {
  productsAmountsStore,
  ProductsAmountsStore,
} from '@/entities/productAmount';

class AddProductInCalculatorModel {
  productsStore: ProductStore;
  productsAmountsStore: ProductsAmountsStore;

  constructor() {
    makeAutoObservable(this);

    this.productsStore = productStore;
    this.productsAmountsStore = productsAmountsStore;
  }

  onAddProduct = (productId: string) => {
    const product = this.productsStore.getProductById(productId);

    if (!product) throw new Error('Добавляемый продукт не найден');

    const initialAmount = getProductInitialAmount(product);

    this.productsAmountsStore.addProductAmount(productId, initialAmount);
  };
}

export const addProductInCalculatorModel = new AddProductInCalculatorModel();
