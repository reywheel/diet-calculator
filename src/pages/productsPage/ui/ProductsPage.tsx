import { UiContainer, UiPage } from '@/shared/ui';
import styles from './ProductsPage.module.scss';
import { ProductsList } from '@/widgets/productsList';
import { AddProductForm } from '@/features/addProduct';
import { useEditableProduct } from '@/features/editProduct';
import { EditProductForm } from '@/features/editProduct';

export const ProductsPage = () => {
  const editableProduct = useEditableProduct();

  return (
    <UiPage>
      <UiContainer className={styles.container}>
        <ProductsList />

        {!!editableProduct && <EditProductForm />}

        {!editableProduct && <AddProductForm />}
      </UiContainer>
    </UiPage>
  );
};
