import { useProducts } from '@/entities/product';
import styles from './ProductsList.module.scss';
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

export const ProductsList = () => {
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
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product.id}>
                  <Td>{product.name}</Td>
                  <Td isNumeric>{product.protein}</Td>
                  <Td isNumeric>{product.fats}</Td>
                  <Td isNumeric>{product.carbs}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
