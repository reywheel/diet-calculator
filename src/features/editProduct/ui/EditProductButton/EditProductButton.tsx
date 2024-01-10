import { IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import cn from 'classnames';
import { productStore } from '@/entities/product';
import { useActions as useEditProductActions } from '@/features/editProduct';

interface EditProductButtonProps {
  productId: string;
  className?: string;
}

export const EditProductButton = ({
  productId,
  className,
}: EditProductButtonProps) => {
  const { getProductById } = productStore;
  const { setEditableProduct } = useEditProductActions();

  const onClickButton = () => {
    const editableButton = getProductById(productId);

    if (editableButton) {
      setEditableProduct(editableButton);
    } else {
      throw new Error('Редактируемый продукт не найден');
    }
  };

  return (
    <IconButton
      aria-label={'edit product'}
      icon={<EditIcon />}
      size={'sm'}
      colorScheme={'yellow'}
      className={cn(className)}
      onClick={onClickButton}
    />
  );
};
