import { Button } from '@chakra-ui/react';
import { useActions as useCalculatorActions } from '@/widgets/calculator';
import { productStore } from '@/entities/product';

interface AddProductInCalculatorButtonProps {
  productId: string;
  className?: string;
}

export const AddProductInCalculatorButton = ({
  productId,
  className,
}: AddProductInCalculatorButtonProps) => {
  const { getProductById } = productStore;
  const { addProduct } = useCalculatorActions();

  const onClickButton = () => {
    const product = getProductById(productId);

    if (!product) throw new Error('Добавляемый продукт не найден');

    addProduct(product);
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
};
