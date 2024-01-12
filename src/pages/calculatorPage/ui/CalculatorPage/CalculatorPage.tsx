import { UiContainer, UiPage } from '@/shared/ui';
import { Calculator } from '@/widgets/calculator';
import { ProductsPicker } from '@/widgets/productsPicker';

import styles from './CalculatorPage.module.scss';

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
