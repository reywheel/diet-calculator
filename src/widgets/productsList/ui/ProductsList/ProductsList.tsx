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

import { productStore } from '@/entities/product';
import { DeleteProductButton } from '@/features/deleteProduct';
import { EditProductButton } from '@/features/editProduct';

import styles from './ProductsList.module.scss';


export const ProductsList = observer(() => {
  const { products } = productStore;

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

      {!!products.length && (
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
              {products.map((product) => (
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
      )}
    </div>
  );
});
