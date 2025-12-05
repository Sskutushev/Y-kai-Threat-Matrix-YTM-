'use client';

import { AnomalyDashboard } from '@/widgets/anomaly-dashboard';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/query-client';

const MonitoringPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <AnomalyDashboard />
      </div>
    </QueryClientProvider>
  );
};

export default MonitoringPage;
