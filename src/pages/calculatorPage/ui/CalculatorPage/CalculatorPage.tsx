import { UiContainer, UiPage } from '@/shared/ui';
import styles from './CalculatorPage.module.scss';
import { Calculator } from '@/widgets/calculator';
import { ProductsPicker } from '@/widgets/productsPicker';

export const CalculatorPage = () => {
  return (
    <UiPage>
      <UiContainer className={styles.container}>
        <Calculator />

        <ProductsPicker />
      </UiContainer>
    </UiPage>
  );
};
