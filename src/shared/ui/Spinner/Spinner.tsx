import clsx from 'clsx';
import styles from './Spinner.module.scss';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner = ({ size = 'md', className }: SpinnerProps) => {
  return (
    <div className={clsx(styles.spinner, styles[size], className)}>
      <div className={styles.circle} />
    </div>
  );
};