import { ThreatLevel } from '../../model/types';
import clsx from 'clsx';
import styles from './ThreatBadge.module.scss';

interface ThreatBadgeProps {
  level: ThreatLevel;
}

export const ThreatBadge = ({ level }: ThreatBadgeProps) => {
  // Map threat level to color class
  const levelClassMap: Record<ThreatLevel, string> = {
    low: styles.low,
    medium: styles.medium,
    high: styles.high,
    critical: styles.critical,
  };

  const className = clsx(
    styles.threatBadge,
    levelClassMap[level]
  );

  return (
    <span className={className}>
      {level}
    </span>
  );
};