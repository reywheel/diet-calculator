import { IProduct } from './model/types.ts';
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

export const calculateTotalNutrientsAmounts = (
  product: IProduct,
  amount: number,
): {
  protein: number;
  fats: number;
  carbs: number;
} => {
  const multiplier =
    product.type === 'piece' ? amount : _.round(amount / 100, 2);

  return _.chain(product)
    .pick(['protein', 'fats', 'carbs'])
    .transform(
      (result, value, key) => {
        // @ts-expect-error не сходятся типы
        result[key] = _.round(value * multiplier, 2);
      },
      { protein: 0, fats: 0, carbs: 0 },
    )
    .value();
};
