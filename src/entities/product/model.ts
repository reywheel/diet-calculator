import { IProduct } from '@/entities/product/types.ts';
import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { nanoid } from 'nanoid';

export class ProductStore {
  products: IProduct[] = [];

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'productStore',
      properties: ['products'],
      storage: window.localStorage,
    });
  }

  addProduct = (product: Omit<IProduct, 'id'>) => {
    this.products.push({ ...product, id: nanoid() });
  };

  changeProduct = (product: IProduct) => {
    this.products = this.products.map((p) => {
      if (p.id !== product.id) return p;

      return product;
    });
  };

  deleteProduct = (productId: string) => {
    this.products = this.products.filter((p) => p.id !== productId);
  };

  getProductById = (productId: string) => {
    return this.products.find((p) => p.id === productId);
  };
}

export const productStore = new ProductStore();
