import { ReactNode } from 'react';
import cn from 'classnames';
import styles from './UiPage.module.scss';

interface UiPageProps {
  children: ReactNode;
  className?: string;
}

export const UiPage = ({ children, className }: UiPageProps) => {
  return <div className={cn(styles.page, className)}>{children}</div>;
};
