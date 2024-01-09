import { Card, CardBody } from '@chakra-ui/react';
import { useProductsAmounts } from '../../model/calculatorStore.ts';

export const Calculator = () => {
  const productsAmounts = useProductsAmounts();

  return (
    <Card>
      <CardBody>
        {Object.entries(productsAmounts).map(([productId, amount]) => {
          return (
            <div>
              {productId} * {amount}
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};
