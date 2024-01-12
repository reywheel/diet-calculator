import {
  IconButton,
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
import { observer } from 'mobx-react-lite';
import { DeleteIcon } from '@chakra-ui/icons';

import { calculatorStore } from '../../model.ts';

export const Calculator = observer(() => {
  const {
    productsAmountsList,
    nutrientsAmount,
    nutrientsGoal,
    isNutrientsEnough,
    onChangeProductAmount,
    onDeleteProductAmount,
  } = calculatorStore;

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
            <Th />
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
                  onChange={(_, v) =>
                    onChangeProductAmount(productAmount.id, v)
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Td>

              <Td>
                <IconButton
                  colorScheme={'red'}
                  size={'sm'}
                  aria-label={'delete product'}
                  icon={<DeleteIcon />}
                  onClick={() => onDeleteProductAmount(productAmount.id)}
                />
              </Td>
            </Tr>
          ))}
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
              {nutrientsAmount.protein}
            </Th>

            <Th
              isNumeric
              color={isNutrientsEnough.fats ? 'green' : 'red'}
            >
              {nutrientsAmount.fats}
            </Th>

            <Th
              isNumeric
              color={isNutrientsEnough.carbs ? 'green' : 'red'}
            >
              {nutrientsAmount.carbs}
            </Th>

            <Th></Th>
          </Tr>

          <Tr>
            <Th>Цель:</Th>
            <Th isNumeric>{nutrientsGoal.protein}</Th>
            <Th isNumeric>{nutrientsGoal.fats}</Th>
            <Th isNumeric>{nutrientsGoal.carbs}</Th>
            <Th></Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
});
