import { IProduct } from './types.ts';
import _ from 'lodash';

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

export const calculateTotalNutrientsAmount = (
  product: IProduct,
  amount: number,
): {
  protein: number;
  fats: number;
  carbs: number;
} => {
  const multiplier =
    product.type === 'piece' ? amount : _.round(amount / 100, 2);

  return {
    protein: _.round(product.protein * multiplier, 2),
    fats: _.round(product.fats * multiplier, 2),
    carbs: _.round(product.carbs * multiplier, 2),
  };
};
