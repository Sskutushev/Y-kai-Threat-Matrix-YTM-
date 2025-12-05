'use client';

import { useAnomaliesQuery } from '@/entities/anomaly/model/queries';
import { AnomalyCard } from '@/entities/anomaly/ui/AnomalyCard/AnomalyCard';
import { CaptureButton } from '@/features/capture-anomaly/ui/CaptureButton';
import { Spinner } from '@/shared/ui/Spinner/Spinner';
import { Card } from '@/shared/ui/Card/Card';
import { useAnomalySSE } from '@/features/realtime-monitoring/model/use-sse';
import { Anomaly } from '@/entities/anomaly/model/types';
import styles from './AnomalyDashboard.module.scss';

export const AnomalyDashboard = () => {
  // Initialize SSE connection for real-time updates
  useAnomalySSE();

  // Fetch anomalies data
  const { data: anomalies, isLoading, error } = useAnomaliesQuery();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="lg" />
        <p>Loading spiritual anomalies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <h2>Error</h2>
        <p>Failed to load anomalies: {error.message}</p>
      </Card>
    );
  }

  if (!anomalies || anomalies.length === 0) {
    return (
      <Card>
        <h2>No Anomalies Detected</h2>
        <p>No spiritual anomalies currently reported in the area.</p>
      </Card>
    );
  }

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Yōkai Threat Matrix</h1>
      <p className={styles.subtitle}>Real-time spiritual anomaly monitoring</p>

      <div className={styles.grid}>
        {anomalies.map((anomaly: Anomaly) => (
          <AnomalyCard
            key={anomaly.id}
            anomaly={anomaly}
            actions={
              anomaly.status === 'active' && (
                <CaptureButton
                  anomalyId={anomaly.id}
                  disabled={anomaly.status !== 'active'}
                />
              )
            }
          />
        ))}
      </div>
    </div>
  );
};
