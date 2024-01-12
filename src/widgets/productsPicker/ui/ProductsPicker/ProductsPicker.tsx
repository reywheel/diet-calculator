import { observer } from 'mobx-react-lite';

import { ProductRow } from '@/entities/product';
import { AddProductInCalculatorButton } from '@/features/addProductInCalculator';

import { productsPickerStore } from '../../model.ts';

import styles from './ProductsPicker.module.scss';

export const ProductsPicker = observer(() => {
  const { productsListForPick } = productsPickerStore;

  return (
    <div className={styles.picker}>
      {productsListForPick.map((product) => (
        <ProductRow
          key={product.id}
          product={product}
          renderActions={() => (
            <AddProductInCalculatorButton
              productId={product.id}
              className={styles.addProductButton}
            />
          )}
          className={styles.productRow}
        />
      ))}
    </div>
  );
});
