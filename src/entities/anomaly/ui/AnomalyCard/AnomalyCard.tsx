import { Anomaly } from '../../model/types';
import { ThreatBadge } from '../ThreatBadge/ThreatBadge';
import { Card } from '@/shared/ui/Card/Card';
import clsx from 'clsx';
import styles from './AnomalyCard.module.scss';

interface AnomalyCardProps {
  anomaly: Anomaly;
  actions?: React.ReactNode;
  className?: string;
}

export const AnomalyCard = ({ anomaly, actions, className }: AnomalyCardProps) => {
  const statusClass = anomaly.status === 'captured' 
    ? styles.captured 
    : styles.active;

  return (
    <Card className={clsx(styles.anomalyCard, statusClass, className)}>
      <div className={styles.header}>
        <h3 className={styles.name}>{anomaly.name}</h3>
        <ThreatBadge level={anomaly.threatLevel} />
      </div>
      
      <div className={styles.content}>
        <p className={styles.location}>
          <span className={styles.label}>Location:</span> {anomaly.location}
        </p>
        
        {anomaly.description && (
          <p className={styles.description}>{anomaly.description}</p>
        )}
        
        <div className={styles.status}>
          <span className={styles.label}>Status:</span> 
          <span className={clsx(styles.statusText, anomaly.status)}>
            {anomaly.status.charAt(0).toUpperCase() + anomaly.status.slice(1)}
          </span>
        </div>
      </div>
      
      {actions && (
        <div className={styles.actions}>
          {actions}
        </div>
      )}
    </Card>
  );
};