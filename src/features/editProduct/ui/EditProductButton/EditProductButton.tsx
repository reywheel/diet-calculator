import { IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import cn from 'classnames';
import { editProductStore } from '@/features/editProduct';

interface EditProductButtonProps {
  productId: string;
  className?: string;
}

export const EditProductButton = ({
  productId,
  className,
}: EditProductButtonProps) => {
  const { onEditProduct } = editProductStore;

  const onClickButton = () => {
    onEditProduct(productId);
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
