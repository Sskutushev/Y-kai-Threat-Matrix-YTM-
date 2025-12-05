import {
  getAllAnomalies,
  getAnomalyById,
  updateAnomaly,
  captureAnomaly,
  getRandomActiveAnomaly,
  updateThreatLevel,
  resetAnomalies,
} from '@/shared/api/db';

// Define initial anomalies to match the db.ts initialization
const initialAnomalies = [
  {
    id: '1',
    name: 'Kitsune',
    threatLevel: 'high' as const,
    location: 'Shinjuku District',
    status: 'active' as const,
    description:
      'Fox spirit with multiple tails, capable of illusions and fire manipulation',
    lastUpdated: expect.any(Number),
  },
  {
    id: '2',
    name: 'Tengu',
    threatLevel: 'medium' as const,
    location: 'Mount Kurama',
    status: 'active' as const,
    description:
      'Crow-like yokai with supernatural abilities and martial arts skills',
    lastUpdated: expect.any(Number),
  },
  {
    id: '3',
    name: 'Kappa',
    threatLevel: 'medium' as const,
    location: 'Rivers of Saitama',
    status: 'active' as const,
    description:
      'Water-dwelling creature known for mischief and dangerous strength',
    lastUpdated: expect.any(Number),
  },
  {
    id: '4',
    name: 'Oni',
    threatLevel: 'critical' as const,
    location: 'Nearby Mountains',
    status: 'active' as const,
    description: 'Demon with horns and incredible strength, very dangerous',
    lastUpdated: expect.any(Number),
  },
  {
    id: '5',
    name: 'Yuki-onna',
    threatLevel: 'high' as const,
    location: 'Snowy Mountains',
    status: 'active' as const,
    description: 'Ghostly woman of the snow who appears during blizzards',
    lastUpdated: expect.any(Number),
  },
  {
    id: '6',
    name: 'Rokurokubi',
    threatLevel: 'medium' as const,
    location: 'Old Town',
    status: 'active' as const,
    description:
      'Woman with an impossibly long neck, stretches to spy on people at night',
    lastUpdated: expect.any(Number),
  },
  {
    id: '7',
    name: 'Kage',
    threatLevel: 'low' as const,
    location: 'Abandoned Theater',
    status: 'active' as const,
    description: 'Living shadow that mimics human movements and feeds on light',
    lastUpdated: expect.any(Number),
  },
  {
    id: '8',
    name: 'Nue',
    threatLevel: 'high' as const,
    location: 'Ancient Temple',
    status: 'active' as const,
    description:
      'Cloud demon with the body of a monkey, tiger paws, and snake tail',
    lastUpdated: expect.any(Number),
  },
  {
    id: '9',
    name: 'Bake-kujira',
    threatLevel: 'medium' as const,
    location: 'Harbor District',
    status: 'active' as const,
    description:
      'Ghost of a whale that appears in the sky as an omen of disaster',
    lastUpdated: expect.any(Number),
  },
  {
    id: '10',
    name: 'Funayurei',
    threatLevel: 'medium' as const,
    location: 'Port Area',
    status: 'active' as const,
    description:
      'Vengeful spirit of a drowned sailor seeking revenge on the living',
    lastUpdated: expect.any(Number),
  },
  {
    id: '11',
    name: 'Shinigami',
    threatLevel: 'critical' as const,
    location: 'Underworld Gate',
    status: 'active' as const,
    description:
      'Death god that harvests souls and maintains balance between life and death',
    lastUpdated: expect.any(Number),
  },
  {
    id: '12',
    name: 'Umibōzu',
    threatLevel: 'high' as const,
    location: 'Deep Sea',
    status: 'active' as const,
    description:
      'Giant monk-like yokai that emerges from the ocean depths during storms',
    lastUpdated: expect.any(Number),
  },
];

describe('Database API', () => {
  beforeEach(() => {
    // Ensure the database is reset to initial state before each test
    resetAnomalies();
  });

  test('should get all anomalies', () => {
    const all = getAllAnomalies();

    expect(all).toHaveLength(12);
    expect(all).toEqual(initialAnomalies);
  });

  test('should get anomaly by ID', () => {
    const anomaly = getAnomalyById('1');

    expect(anomaly).toEqual({
      id: '1',
      name: 'Kitsune',
      threatLevel: 'high',
      location: 'Shinjuku District',
      status: 'active',
      description:
        'Fox spirit with multiple tails, capable of illusions and fire manipulation',
      lastUpdated: expect.any(Number),
    });
  });

  test('should return undefined for non-existent anomaly ID', () => {
    const anomaly = getAnomalyById('999');

    expect(anomaly).toBeUndefined();
  });

  test('should update an anomaly', () => {
    const updated = updateAnomaly('1', {
      threatLevel: 'critical',
      location: 'New Location',
    });

    expect(updated).toEqual({
      id: '1',
      name: 'Kitsune',
      threatLevel: 'critical',
      location: 'New Location',
      status: 'active',
      description:
        'Fox spirit with multiple tails, capable of illusions and fire manipulation',
      lastUpdated: expect.any(Number),
    });
  });

  test('should return undefined when updating non-existent anomaly', () => {
    const result = updateAnomaly('999', {
      threatLevel: 'critical',
    });

    expect(result).toBeUndefined();
  });

  test('should capture an anomaly', () => {
    const captured = captureAnomaly('1');

    expect(captured).toEqual({
      id: '1',
      name: 'Kitsune',
      threatLevel: 'high',
      location: 'Shinjuku District',
      status: 'captured',
      description:
        'Fox spirit with multiple tails, capable of illusions and fire manipulation',
      lastUpdated: expect.any(Number),
    });
  });

  test('should get random active anomaly', () => {
    const randomAnomaly = getRandomActiveAnomaly();

    expect(randomAnomaly).toBeDefined();
    expect(randomAnomaly).toHaveProperty('id');
    expect(randomAnomaly).toHaveProperty('name');
    expect(randomAnomaly).toHaveProperty('status');
    expect(randomAnomaly?.status).toBe('active');
  });

  test('should return undefined when no active anomalies exist', () => {
    // First capture all anomalies
    getAllAnomalies().forEach((anomaly) => {
      captureAnomaly(anomaly.id);
    });

    const randomAnomaly = getRandomActiveAnomaly();
    expect(randomAnomaly).toBeUndefined();
  });

  test('should update threat level', () => {
    const updated = updateThreatLevel('1', 'low');

    expect(updated).toEqual({
      id: '1',
      name: 'Kitsune',
      threatLevel: 'low',
      location: 'Shinjuku District',
      status: 'active',
      description:
        'Fox spirit with multiple tails, capable of illusions and fire manipulation',
      lastUpdated: expect.any(Number),
    });
  });

  test('should reset all anomalies', () => {
    // First modify some anomalies
    updateAnomaly('1', { threatLevel: 'critical', status: 'captured' });
    updateAnomaly('2', { threatLevel: 'low', status: 'captured' });

    // Verify they're changed
    const modifiedAnomaly1 = getAnomalyById('1');
    expect(modifiedAnomaly1?.threatLevel).toBe('critical');
    expect(modifiedAnomaly1?.status).toBe('captured');

    // Now reset
    const resetResult = resetAnomalies();

    // Check that all are reset to initial state
    const anomaly1 = getAnomalyById('1');
    expect(anomaly1?.threatLevel).toBe('high');
    expect(anomaly1?.status).toBe('active');

    const anomaly2 = getAnomalyById('2');
    expect(anomaly2?.threatLevel).toBe('medium');
    expect(anomaly2?.status).toBe('active');

    // Also check return value
    expect(resetResult).toHaveLength(12);
    expect(resetResult[0].name).toBe('Kitsune');
    expect(resetResult[0].status).toBe('active');
  });
});
