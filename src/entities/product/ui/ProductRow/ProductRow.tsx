import { IProduct } from '../../model/types.ts';
import cn from 'classnames';
import styles from './ProductRow.module.scss';
import { CardBody, Card } from '@chakra-ui/react';

interface ProductRowProps {
  product: IProduct;
  className?: string;
}

export const ProductRow = ({ product, className }: ProductRowProps) => {
  return (
    <Card className={cn(styles.wrapper, className)}>
      <CardBody>{product.name}</CardBody>
    </Card>
  );
};
