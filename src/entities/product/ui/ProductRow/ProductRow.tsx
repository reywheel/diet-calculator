import { IProduct } from '../../types.ts';
import cn from 'classnames';
import styles from './ProductRow.module.scss';
import { CardBody, Card, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ProductRowProps {
  product: IProduct;
  renderActions?: () => ReactNode;
  className?: string;
}

export const ProductRow = ({
  product,
  className,
  renderActions,
}: ProductRowProps) => {
  return (
    <Card className={cn(styles.wrapper, className)}>
      <CardBody
        p={3}
        display={'flex'}
        alignItems={'center'}
      >
        <Text
          fontSize={'lg'}
          fontWeight={'500'}
        >
          {product.name}
        </Text>

        {renderActions?.()}
      </CardBody>
    </Card>
  );
};
