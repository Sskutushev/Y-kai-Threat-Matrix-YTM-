import clsx from 'clsx';
import styles from './Spinner.module.scss';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'aria-label'?: string;
}

export const Spinner = ({
  size = 'md',
  className,
  'aria-label': ariaLabel = 'Loading...',
}: SpinnerProps) => {
  return (
    <div
      className={clsx(styles.spinner, styles[size], className)}
      role="status"
      aria-label={ariaLabel}
    >
      <div className={styles.circle} />
    </div>
  );
};
