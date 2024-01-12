import { Button } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { addProductInCalculatorModel } from '../../model.ts';

interface AddProductInCalculatorButtonProps {
  productId: string;
  className?: string;
}

export const AddProductInCalculatorButton = observer(
  ({ productId, className }: AddProductInCalculatorButtonProps) => {
    const { onAddProduct } = addProductInCalculatorModel;

    const onClickButton = () => {
      onAddProduct(productId);
    };

    return (
      <Button
        className={className}
        color={'green'}
        onClick={onClickButton}
      >
        Добавить
      </Button>
    );
  },
);
