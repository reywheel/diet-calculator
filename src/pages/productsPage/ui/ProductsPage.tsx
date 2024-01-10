import { UiContainer, UiPage } from '@/shared/ui';
import styles from './ProductsPage.module.scss';
import { ProductsList } from '@/widgets/productsList';
import { AddProductForm } from '@/features/addProduct';
import { editProductStore } from '@/features/editProduct';
import { EditProductForm } from '@/features/editProduct';
import { observer } from 'mobx-react-lite';

export const ProductsPage = observer(() => {
  const { hasEditableProduct } = editProductStore;

  return (
    <UiPage>
      <UiContainer className={styles.container}>
        <ProductsList />

        {hasEditableProduct && <EditProductForm />}

        {!hasEditableProduct && <AddProductForm />}
      </UiContainer>
    </UiPage>
  );
});
