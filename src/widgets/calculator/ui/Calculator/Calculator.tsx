import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useProductsAmounts } from '../../model/calculatorStore.ts';
import { useMemo } from 'react';
import _ from 'lodash';
import {
  calculateTotalNutrientsAmounts,
  IProduct,
  useActions,
} from '@/entities/product';
import { useCarbs, useFats, useProtein } from '@/features/configureProfile';

export const Calculator = () => {
  const productsAmounts = useProductsAmounts();
  const protein = useProtein();
  const fats = useFats();
  const carbs = useCarbs();
  const { getProductById } = useActions();

  const preparedData = useMemo(() => {
    return _.transform(
      productsAmounts,
      (result, amount, productId) => {
        const product = getProductById(productId);

        if (!product) throw new Error('Продукт не найден');

        result[productId] = { product, amount };
      },
      {} as Record<string, { product: IProduct; amount: number }>,
    );
  }, [productsAmounts]);

  const totalNutrientsAmounts = useMemo(() => {
    return Object.entries(preparedData).reduce(
      (acc, [, { product, amount }]) => {
        const amounts = calculateTotalNutrientsAmounts(product, amount);

        return {
          protein: acc.protein + amounts.protein,
          fats: acc.fats + amounts.fats,
          carbs: acc.carbs + amounts.carbs,
        };
      },
      { protein: 0, fats: 0, carbs: 0 },
    );
  }, [preparedData]);

  return (
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
            <Th isNumeric>Кол-во</Th>
          </Tr>
        </Thead>

        <Tbody>
          {Object.entries(preparedData).map(
            ([productId, { product, amount }]) => (
              <Tr key={productId}>
                <Td>{product.name}</Td>
                <Td isNumeric>{product.protein}</Td>
                <Td isNumeric>{product.fats}</Td>
                <Td isNumeric>{product.carbs}</Td>
                <Td isNumeric>{amount}</Td>
              </Tr>
            ),
          )}
        </Tbody>

        <Tfoot
          position={'sticky'}
          bottom={0}
        >
          <Tr>
            <Th>Всего:</Th>
            <Th isNumeric>{totalNutrientsAmounts.protein}</Th>
            <Th isNumeric>{totalNutrientsAmounts.fats}</Th>
            <Th isNumeric>{totalNutrientsAmounts.carbs}</Th>
            <Th></Th>
          </Tr>

          <Tr>
            <Th>Цель:</Th>
            <Th isNumeric>{protein}</Th>
            <Th isNumeric>{fats}</Th>
            <Th isNumeric>{carbs}</Th>
            <Th></Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
