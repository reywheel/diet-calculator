import { makeAutoObservable } from 'mobx';

import { IProduct, productStore, ProductStore } from '@/entities/product';

class EditProductStore {
  productStore: ProductStore;

  editableProduct: IProduct | null = null;

  get hasEditableProduct(): boolean {
    return this.editableProduct !== null;
  }

  constructor() {
    makeAutoObservable(this);

    this.productStore = productStore;
  }

  onEditProduct = (productId: string) => {
    const product = this.productStore.getProductById(productId);

    if (!product) throw new Error('Редактируемый продукт не найден');

    this.editableProduct = product;
  };

  onSaveProduct = (product: IProduct) => {
    this.productStore.changeProduct(product);
    this.editableProduct = null;
  };

  onCancel = () => {
    this.editableProduct = null;
  };
}

export const editProductStore = new EditProductStore();
