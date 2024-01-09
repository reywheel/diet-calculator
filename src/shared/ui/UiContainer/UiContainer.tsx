import { ReactNode } from 'react';
import styles from './UiContainer.module.scss';
import cn from 'classnames';

interface UiContainerProps {
  children: ReactNode;
  className?: string;
}

export const UiContainer = ({ children, className }: UiContainerProps) => {
  return <div className={cn(styles.container, className)}>{children}</div>;
};
