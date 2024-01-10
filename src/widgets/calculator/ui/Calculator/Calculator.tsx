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
  // Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { calculatorStore } from '../../model.ts';
import { observer } from 'mobx-react-lite';

export const Calculator = observer(() => {
  const { productsAmountsList } = calculatorStore;

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
          {productsAmountsList.map((productAmount) => (
            <Tr key={productAmount.id}>
              <Td>{productAmount.name}</Td>
              <Td isNumeric>{productAmount.protein}</Td>
              <Td isNumeric>{productAmount.fats}</Td>
              <Td isNumeric>{productAmount.carbs}</Td>
              <Td isNumeric>
                <NumberInput
                  maxW={100}
                  min={1}
                  value={productAmount.amount}
                  size={'sm'}
                  ml={'auto'}
                  onChange={() => {}}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Td>
            </Tr>
          ))}
        </Tbody>

        {/*<Tfoot*/}
        {/*  position={'sticky'}*/}
        {/*  bottom={0}*/}
        {/*>*/}
        {/*  <Tr>*/}
        {/*    <Th>Всего:</Th>*/}

        {/*    <Th*/}
        {/*      isNumeric*/}
        {/*      color={isNutrientsEnough.protein ? 'green' : 'red'}*/}
        {/*    >*/}
        {/*      {totalNutrientsAmounts.protein}*/}
        {/*    </Th>*/}

        {/*    <Th*/}
        {/*      isNumeric*/}
        {/*      color={isNutrientsEnough.fats ? 'green' : 'red'}*/}
        {/*    >*/}
        {/*      {totalNutrientsAmounts.fats}*/}
        {/*    </Th>*/}

        {/*    <Th*/}
        {/*      isNumeric*/}
        {/*      color={isNutrientsEnough.carbs ? 'green' : 'red'}*/}
        {/*    >*/}
        {/*      {totalNutrientsAmounts.carbs}*/}
        {/*    </Th>*/}

        {/*    <Th></Th>*/}
        {/*  </Tr>*/}

        {/*  <Tr>*/}
        {/*    <Th>Цель:</Th>*/}
        {/*    <Th isNumeric>{protein}</Th>*/}
        {/*    <Th isNumeric>{fats}</Th>*/}
        {/*    <Th isNumeric>{carbs}</Th>*/}
        {/*    <Th></Th>*/}
        {/*  </Tr>*/}
        {/*</Tfoot>*/}
      </Table>
    </TableContainer>
  );
});
