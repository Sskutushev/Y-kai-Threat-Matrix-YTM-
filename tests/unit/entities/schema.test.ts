import { 
  ThreatLevelSchema, 
  AnomalyStatusSchema, 
  AnomalySchema,
  AnomaliesResponseSchema 
} from '@/entities/anomaly/model/types';
import { z } from 'zod';

describe('Anomaly Schemas', () => {
  test('ThreatLevelSchema validates correctly', () => {
    // Valid threat levels should pass
    expect(() => ThreatLevelSchema.parse('low')).not.toThrow();
    expect(() => ThreatLevelSchema.parse('medium')).not.toThrow();
    expect(() => ThreatLevelSchema.parse('high')).not.toThrow();
    expect(() => ThreatLevelSchema.parse('critical')).not.toThrow();

    // Invalid threat levels should throw
    expect(() => ThreatLevelSchema.parse('invalid')).toThrow(z.ZodError);
  });

  test('AnomalyStatusSchema validates correctly', () => {
    // Valid statuses should pass
    expect(() => AnomalyStatusSchema.parse('active')).not.toThrow();
    expect(() => AnomalyStatusSchema.parse('captured')).not.toThrow();

    // Invalid statuses should throw
    expect(() => AnomalyStatusSchema.parse('invalid')).toThrow(z.ZodError);
  });

  test('AnomalySchema validates correctly', () => {
    const validAnomaly = {
      id: '1',
      name: 'Test Yōkai',
      threatLevel: 'high',
      location: 'Test Location',
      status: 'active',
      lastUpdated: Date.now(),
    };

    // Valid anomaly should pass
    expect(() => AnomalySchema.parse(validAnomaly)).not.toThrow();

    // Invalid anomaly should throw
    const invalidAnomaly = {
      ...validAnomaly,
      threatLevel: 'invalid',
    };
    expect(() => AnomalySchema.parse(invalidAnomaly)).toThrow(z.ZodError);
  });

  test('AnomaliesResponseSchema validates correctly', () => {
    const validAnomalies = [
      {
        id: '1',
        name: 'Test Yōkai 1',
        threatLevel: 'high',
        location: 'Test Location 1',
        status: 'active',
        lastUpdated: Date.now(),
      },
      {
        id: '2',
        name: 'Test Yōkai 2',
        threatLevel: 'medium',
        location: 'Test Location 2',
        status: 'captured',
        lastUpdated: Date.now(),
      },
    ];

    // Valid anomalies array should pass
    expect(() => AnomaliesResponseSchema.parse(validAnomalies)).not.toThrow();

    // Invalid anomalies should throw
    const invalidAnomalies = [
      {
        ...validAnomalies[0],
        threatLevel: 'invalid',
      },
    ];
    expect(() => AnomaliesResponseSchema.parse(invalidAnomalies)).toThrow(z.ZodError);
  });
});