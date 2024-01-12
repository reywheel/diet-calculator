import { observer } from 'mobx-react-lite';

import { UiContainer, UiPage } from '@/shared/ui';
import { ProductsList } from '@/widgets/productsList';
import { AddProductForm } from '@/features/addProduct';
import { editProductStore , EditProductForm } from '@/features/editProduct';

import styles from './ProductsPage.module.scss';

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
