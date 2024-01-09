import { IProduct } from './model/types.ts';

export const getProductInitialAmount = (product: IProduct): number => {
  switch (product.type) {
    case 'gram':
      return 100;
    case 'piece':
      return 1;
    default:
      throw new Error('Неизвестный тип продукта');
  }
};
