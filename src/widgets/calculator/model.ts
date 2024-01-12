import {
  calculateTotalNutrientsAmount,
  IProduct,
  productStore,
  ProductStore,
} from '@/entities/product';
import {
  productsAmountsStore,
  ProductsAmountsStore,
} from '@/entities/productAmount';
import { configStore, ConfigStore } from '@/entities/config';
import _ from 'lodash';

class CalculatorStore {
  configStore: ConfigStore;
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

  get nutrientsAmount() {
    return this.productsAmountsList.reduce(
      (acc, productAmount) => {
        const productNutrientsAmount = calculateTotalNutrientsAmount(
          productAmount,
          productAmount.amount,
        );

        return {
          protein: _.round(acc.protein + productNutrientsAmount.protein, 2),
          fats: _.round(acc.fats + productNutrientsAmount.fats, 2),
          carbs: _.round(acc.carbs + productNutrientsAmount.carbs, 2),
        };
      },
      { protein: 0, fats: 0, carbs: 0 },
    );
  }

  get nutrientsGoal() {
    return {
      protein: this.configStore.protein,
      fats: this.configStore.fats,
      carbs: this.configStore.carbs,
    };
  }

  get isNutrientsEnough() {
    return {
      protein: this.nutrientsAmount.protein >= this.nutrientsGoal.protein,
      fats: this.nutrientsAmount.fats >= this.nutrientsGoal.fats,
      carbs: this.nutrientsAmount.carbs >= this.nutrientsGoal.carbs,
    };
  }

  constructor() {
    this.configStore = configStore;
    this.productsStore = productStore;
    this.productsAmountsStore = productsAmountsStore;
  }

  onChangeProductAmount = (productId: string, amount: number) => {
    const product = this.productsStore.getProductById(productId);

    if (!product) throw new Error('Продукт для изменения кол-ва не найден');

    this.productsAmountsStore.changeProductAmount(product.id, amount);
  };

  onDeleteProductAmount = (productId: string) => {
    this.productsAmountsStore.deleteProductAmount(productId);
  };
}

export const calculatorStore = new CalculatorStore();
