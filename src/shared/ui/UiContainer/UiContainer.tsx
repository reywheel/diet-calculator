import { ReactNode } from 'react';
import cn from 'classnames';

import styles from './UiContainer.module.scss';

interface UiContainerProps {
  children: ReactNode;
  className?: string;
}

export const UiContainer = ({ children, className }: UiContainerProps) => {
  return <div className={cn(styles.container, className)}>{children}</div>;
};
