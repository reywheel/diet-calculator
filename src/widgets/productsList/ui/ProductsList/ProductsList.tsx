import { ProductRow, useProducts } from '@/entities/product';
import styles from './ProductsList.module.scss';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

export const ProductsList = () => {
  // const products: IProduct[] = [
  //   { id: '1', name: 'Гречка', type: 'gram', protein: 1, fats: 1, carbs: 1 },
  // ];

  const products = useProducts();

  return (
    <div className={styles.wrapper}>
      {!products.length && (
        <Alert
          status="warning"
          className={styles.alert}
        >
          <AlertIcon />
          <AlertTitle>Вы ещё не добавили продукты</AlertTitle>
        </Alert>
      )}

      {!!products.length &&
        products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
          />
        ))}
    </div>
  );
};
