import { UiContainer, UiPage } from '@/shared/ui';
import styles from './ProductsPage.module.scss';
import { ProductsList } from '@/widgets/productsList';

export const ProductsPage = () => {
  return (
    <UiPage>
      <UiContainer className={styles.container}>
        <ProductsList />

        <div>form</div>
      </UiContainer>
    </UiPage>
  );
};
