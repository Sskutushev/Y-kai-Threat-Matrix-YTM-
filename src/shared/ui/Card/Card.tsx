import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Card.module.scss';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export const Card = ({ children, className, padding = 'md' }: CardProps) => {
  return (
    <div className={clsx(styles.card, styles[padding], className)}>
      {children}
    </div>
  );
};