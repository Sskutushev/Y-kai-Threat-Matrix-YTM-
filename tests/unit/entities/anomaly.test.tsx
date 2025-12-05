import { render, screen } from '@testing-library/react';
import { AnomalyCard } from '@/entities/anomaly/ui/AnomalyCard/AnomalyCard';
import { ThreatLevel, AnomalyStatus } from '@/entities/anomaly/model/types';

// Mock anomaly data
const mockAnomaly = {
  id: '1',
  name: 'Kitsune',
  threatLevel: 'high' as ThreatLevel,
  location: 'Shinjuku District',
  status: 'active' as AnomalyStatus,
  description: 'Fox spirit with multiple tails',
  lastUpdated: Date.now(),
};

describe('AnomalyCard', () => {
  test('renders anomaly information correctly', () => {
    render(<AnomalyCard anomaly={mockAnomaly} />);

    // Check that the anomaly name is displayed
    expect(screen.getByText('Kitsune')).toBeInTheDocument();

    // Check that the location is displayed
    expect(screen.getByText(/Shinjuku District/)).toBeInTheDocument();

    // Check that the description is displayed
    expect(screen.getByText(/Fox spirit with multiple tails/)).toBeInTheDocument();

    // Check that the threat level badge is rendered
    expect(screen.getByText('high')).toBeInTheDocument();

    // Check that the status is displayed
    expect(screen.getByText(/Status:/)).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  test('displays captured status correctly', () => {
    const capturedAnomaly = {
      ...mockAnomaly,
      status: 'captured' as AnomalyStatus,
    };

    render(<AnomalyCard anomaly={capturedAnomaly} />);

    // Check that the status shows as captured
    expect(screen.getByText('Captured')).toBeInTheDocument();
  });

  test('applies correct CSS classes for active status', () => {
    render(<AnomalyCard anomaly={mockAnomaly} />);

    // Check that active class is applied
    const card = screen.getByText('Kitsune').closest('.anomalyCard');
    expect(card).toHaveClass('active');
  });

  test('applies correct CSS classes for captured status', () => {
    const capturedAnomaly = {
      ...mockAnomaly,
      status: 'captured' as AnomalyStatus,
    };

    render(<AnomalyCard anomaly={capturedAnomaly} />);

    // Check that captured class is applied
    const card = screen.getByText('Kitsune').closest('.anomalyCard');
    expect(card).toHaveClass('captured');
  });
});