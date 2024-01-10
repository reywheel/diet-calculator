import { ProductRow, productStore } from '@/entities/product';
import styles from './ProductsPicker.module.scss';
import { AddProductInCalculatorButton } from '@/features/addProductInCalculator';

export const ProductsPicker = () => {
  const { products } = productStore;

  return (
    <div className={styles.picker}>
      {products.map((product) => (
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
};
