import { IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import cn from 'classnames';
import { deleteProduct } from '@/entities/product';

interface DeleteProductButtonProps {
  productId: string;
  className?: string;
}

export const DeleteProductButton = ({
  productId,
  className,
}: DeleteProductButtonProps) => {
  const onClickButton = () => {
    deleteProduct(productId);
  };

  return (
    <IconButton
      className={cn(className)}
      aria-label={'delete product'}
      icon={<DeleteIcon />}
      size={'sm'}
      colorScheme={'red'}
      onClick={onClickButton}
    />
  );
};
