import { Link } from 'react-router-dom';
import { Button, Divider } from '@chakra-ui/react';

import { UiContainer } from '@/shared/ui';
import { OpenProfileConfiguratorButton } from '@/features/configureProfile';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div>
      <div className={styles.header}>
        <UiContainer className={styles.container}>
          <Link
            to={'/'}
            className={styles.calculatorPage}
          >
            <Button
              colorScheme={'teal'}
              variant={'outline'}
            >
              Калькулятор
            </Button>
          </Link>

          <Link
            to={'/products'}
            className={styles.productsPage}
          >
            <Button
              colorScheme={'teal'}
              variant={'outline'}
            >
              Продукты
            </Button>
          </Link>

          <OpenProfileConfiguratorButton />
        </UiContainer>
      </div>

      <Divider />
    </div>
  );
};
