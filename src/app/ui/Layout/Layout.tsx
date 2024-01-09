import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import { Header } from '@/widgets/header';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />

      <Outlet />
    </div>
  );
};
