import styles from './Header.module.scss';
import { UiContainer } from '@/shared/ui';
import { OpenProfileConfiguratorButton } from '@/features/configureProfile';

export const Header = () => {
  return (
    <div className={styles.header}>
      <UiContainer className={styles.container}>
        <OpenProfileConfiguratorButton />
      </UiContainer>
    </div>
  );
};
