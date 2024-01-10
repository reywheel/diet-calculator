import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  useActions as useCalculatorActions,
  useProductsAmounts,
} from '../../model/calculatorStore.ts';
import { useMemo } from 'react';
import _ from 'lodash';
import {
  calculateTotalNutrientsAmounts,
  IProduct,
  productStore,
} from '@/entities/product';
import { configStore } from '@/entities/config';
import { observer } from 'mobx-react-lite';

export const Calculator = observer(() => {
  const { protein, fats, carbs } = configStore;
  const productsAmounts = useProductsAmounts();
  const { getProductById } = productStore;
  const { setAmount } = useCalculatorActions();

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
          protein: _.round(acc.protein + amounts.protein, 2),
          fats: _.round(acc.fats + amounts.fats, 2),
          carbs: _.round(acc.carbs + amounts.carbs, 2),
        };
      },
      { protein: 0, fats: 0, carbs: 0 },
    );
  }, [preparedData]);

  const isNutrientsEnough = useMemo(() => {
    return {
      protein: totalNutrientsAmounts.protein >= +protein,
      fats: totalNutrientsAmounts.fats >= +fats,
      carbs: totalNutrientsAmounts.carbs >= +carbs,
    };
  }, [totalNutrientsAmounts, protein, fats, carbs]);

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
                <Td isNumeric>
                  <NumberInput
                    maxW={100}
                    min={1}
                    value={amount}
                    size={'sm'}
                    ml={'auto'}
                    onChange={(v) => setAmount(product.id, +v)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
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

            <Th
              isNumeric
              color={isNutrientsEnough.protein ? 'green' : 'red'}
            >
              {totalNutrientsAmounts.protein}
            </Th>

            <Th
              isNumeric
              color={isNutrientsEnough.fats ? 'green' : 'red'}
            >
              {totalNutrientsAmounts.fats}
            </Th>

            <Th
              isNumeric
              color={isNutrientsEnough.carbs ? 'green' : 'red'}
            >
              {totalNutrientsAmounts.carbs}
            </Th>

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
});
