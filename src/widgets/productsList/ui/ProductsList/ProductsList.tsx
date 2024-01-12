import {
  Alert,
  AlertIcon,
  AlertTitle,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { DeleteProductButton } from '@/features/deleteProduct';
import { EditProductButton } from '@/features/editProduct';
import { ProductsFilter } from '@/features/filterProducts';

import { productListStore } from '../../model.ts';

import styles from './ProductsList.module.scss';

export const ProductsList = observer(() => {
  const { allProducts, filteredProducts } = productListStore;

  return (
    <div className={styles.wrapper}>
      {!allProducts.length && (
        <Alert
          status="warning"
          className={styles.alert}
        >
          <AlertIcon />
          <AlertTitle>Вы ещё не добавили продукты</AlertTitle>
        </Alert>
      )}

      {!!allProducts.length && (
        <>
          <ProductsFilter className={styles.filter} />

          <TableContainer overflowY={'auto'}>
            <Table>
              <Thead
                position={'sticky'}
                top={0}
                zIndex="docked"
                backgroundColor={'white'}
              >
                <Tr>
                  <Th>Название</Th>
                  <Th isNumeric>Белки</Th>
                  <Th isNumeric>Жиры</Th>
                  <Th isNumeric>Углеводы</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {!filteredProducts.length && (
                  <Tr>
                    <Td colSpan={5}>Нет результатов поиска</Td>
                  </Tr>
                )}

                {!!filteredProducts.length &&
                  filteredProducts.map((product) => (
                    <Tr key={product.id}>
                      <Td>{product.name}</Td>
                      <Td isNumeric>{product.protein}</Td>
                      <Td isNumeric>{product.fats}</Td>
                      <Td isNumeric>{product.carbs}</Td>
                      <Td isNumeric>
                        <DeleteProductButton
                          productId={product.id}
                          className={styles.deleteButton}
                        />

                        <EditProductButton productId={product.id} />
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
});
