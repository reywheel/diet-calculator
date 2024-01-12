import { Outlet } from 'react-router-dom';

import { Header } from '@/widgets/header';

import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />

      <Outlet />
    </div>
  );
};
