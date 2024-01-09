import { UiContainer, UiPage } from '@/shared/ui';
import styles from './ProductsPage.module.scss';
import { ProductsList } from '@/widgets/productsList';
import { AddProductForm } from '@/features/addProduct';

export const ProductsPage = () => {
  return (
    <UiPage>
      <UiContainer className={styles.container}>
        <ProductsList />

        <AddProductForm />
      </UiContainer>
    </UiPage>
  );
};
