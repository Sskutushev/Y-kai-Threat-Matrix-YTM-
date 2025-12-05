// Types for our mock database
export interface Anomaly {
  id: string;
  name: string;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  status: 'active' | 'captured';
  description?: string;
  lastUpdated: number; // timestamp
}

// Global in-memory database for hot reload support
declare global {
  // eslint-disable-next-line no-var
  var mockDB: {
    anomalies: Anomaly[];
  };
}

// Initialize the database with 12 initial anomalies
if (!global.mockDB) {
  global.mockDB = {
    anomalies: [
      {
        id: '1',
        name: 'Kitsune',
        threatLevel: 'high',
        location: 'Shinjuku District',
        status: 'active',
        description:
          'Fox spirit with multiple tails, capable of illusions and fire manipulation',
        lastUpdated: Date.now(),
      },
      {
        id: '2',
        name: 'Tengu',
        threatLevel: 'medium',
        location: 'Mount Kurama',
        status: 'active',
        description:
          'Crow-like yokai with supernatural abilities and martial arts skills',
        lastUpdated: Date.now(),
      },
      {
        id: '3',
        name: 'Kappa',
        threatLevel: 'medium',
        location: 'Rivers of Saitama',
        status: 'active',
        description:
          'Water-dwelling creature known for mischief and dangerous strength',
        lastUpdated: Date.now(),
      },
      {
        id: '4',
        name: 'Oni',
        threatLevel: 'critical',
        location: 'Nearby Mountains',
        status: 'active',
        description: 'Demon with horns and incredible strength, very dangerous',
        lastUpdated: Date.now(),
      },
      {
        id: '5',
        name: 'Yuki-onna',
        threatLevel: 'high',
        location: 'Snowy Mountains',
        status: 'active',
        description: 'Ghostly woman of the snow who appears during blizzards',
        lastUpdated: Date.now(),
      },
      {
        id: '6',
        name: 'Rokurokubi',
        threatLevel: 'medium',
        location: 'Old Town',
        status: 'active',
        description:
          'Woman with an impossibly long neck, stretches to spy on people at night',
        lastUpdated: Date.now(),
      },
      {
        id: '7',
        name: 'Kage',
        threatLevel: 'low',
        location: 'Abandoned Theater',
        status: 'active',
        description:
          'Living shadow that mimics human movements and feeds on light',
        lastUpdated: Date.now(),
      },
      {
        id: '8',
        name: 'Nue',
        threatLevel: 'high',
        location: 'Ancient Temple',
        status: 'active',
        description:
          'Cloud demon with the body of a monkey, tiger paws, and snake tail',
        lastUpdated: Date.now(),
      },
      {
        id: '9',
        name: 'Bake-kujira',
        threatLevel: 'medium',
        location: 'Harbor District',
        status: 'active',
        description:
          'Ghost of a whale that appears in the sky as an omen of disaster',
        lastUpdated: Date.now(),
      },
      {
        id: '10',
        name: 'Funayurei',
        threatLevel: 'medium',
        location: 'Port Area',
        status: 'active',
        description:
          'Vengeful spirit of a drowned sailor seeking revenge on the living',
        lastUpdated: Date.now(),
      },
      {
        id: '11',
        name: 'Shinigami',
        threatLevel: 'critical',
        location: 'Underworld Gate',
        status: 'active',
        description:
          'Death god that harvests souls and maintains balance between life and death',
        lastUpdated: Date.now(),
      },
      {
        id: '12',
        name: 'Umibōzu',
        threatLevel: 'high',
        location: 'Deep Sea',
        status: 'active',
        description:
          'Giant monk-like yokai that emerges from the ocean depths during storms',
        lastUpdated: Date.now(),
      },
    ],
  };
}

// CRUD operations for anomalies
export const getAllAnomalies = (): Anomaly[] => {
  // Return plain objects without methods to ensure serialization
  return JSON.parse(JSON.stringify([...global.mockDB.anomalies])); // Return a copy
};

export const getAnomalyById = (id: string): Anomaly | undefined => {
  const anomaly = global.mockDB.anomalies.find((anomaly) => anomaly.id === id);
  return anomaly ? JSON.parse(JSON.stringify(anomaly)) : undefined;
};

export const updateAnomaly = (
  id: string,
  updates: Partial<Anomaly>
): Anomaly | undefined => {
  const index = global.mockDB.anomalies.findIndex(
    (anomaly) => anomaly.id === id
  );
  if (index === -1) return undefined;

  const updatedAnomaly = {
    ...global.mockDB.anomalies[index],
    ...updates,
    lastUpdated: Date.now(),
  };

  global.mockDB.anomalies[index] = updatedAnomaly;
  // Return plain object without methods to ensure serialization
  return JSON.parse(JSON.stringify(updatedAnomaly));
};

export const captureAnomaly = (id: string): Anomaly | undefined => {
  return updateAnomaly(id, { status: 'captured' });
};

export const getRandomActiveAnomaly = (): Anomaly | undefined => {
  const activeAnomalies = global.mockDB.anomalies.filter(
    (anomaly) => anomaly.status === 'active'
  );
  if (activeAnomalies.length === 0) return undefined;

  const randomIndex = Math.floor(Math.random() * activeAnomalies.length);
  // Return plain object without methods to ensure serialization
  return JSON.parse(JSON.stringify({ ...activeAnomalies[randomIndex] })); // Return a copy
};

// Store the initial anomalies to reset them later
const initialAnomalies: Anomaly[] = [
  {
    id: '1',
    name: 'Kitsune',
    threatLevel: 'high',
    location: 'Shinjuku District',
    status: 'active',
    description:
      'Fox spirit with multiple tails, capable of illusions and fire manipulation',
    lastUpdated: Date.now(),
  },
  {
    id: '2',
    name: 'Tengu',
    threatLevel: 'medium',
    location: 'Mount Kurama',
    status: 'active',
    description:
      'Crow-like yokai with supernatural abilities and martial arts skills',
    lastUpdated: Date.now(),
  },
  {
    id: '3',
    name: 'Kappa',
    threatLevel: 'medium',
    location: 'Rivers of Saitama',
    status: 'active',
    description:
      'Water-dwelling creature known for mischief and dangerous strength',
    lastUpdated: Date.now(),
  },
  {
    id: '4',
    name: 'Oni',
    threatLevel: 'critical',
    location: 'Nearby Mountains',
    status: 'active',
    description: 'Demon with horns and incredible strength, very dangerous',
    lastUpdated: Date.now(),
  },
  {
    id: '5',
    name: 'Yuki-onna',
    threatLevel: 'high',
    location: 'Snowy Mountains',
    status: 'active',
    description: 'Ghostly woman of the snow who appears during blizzards',
    lastUpdated: Date.now(),
  },
  {
    id: '6',
    name: 'Rokurokubi',
    threatLevel: 'medium',
    location: 'Old Town',
    status: 'active',
    description:
      'Woman with an impossibly long neck, stretches to spy on people at night',
    lastUpdated: Date.now(),
  },
  {
    id: '7',
    name: 'Kage',
    threatLevel: 'low',
    location: 'Abandoned Theater',
    status: 'active',
    description: 'Living shadow that mimics human movements and feeds on light',
    lastUpdated: Date.now(),
  },
  {
    id: '8',
    name: 'Nue',
    threatLevel: 'high',
    location: 'Ancient Temple',
    status: 'active',
    description:
      'Cloud demon with the body of a monkey, tiger paws, and snake tail',
    lastUpdated: Date.now(),
  },
  {
    id: '9',
    name: 'Bake-kujira',
    threatLevel: 'medium',
    location: 'Harbor District',
    status: 'active',
    description:
      'Ghost of a whale that appears in the sky as an omen of disaster',
    lastUpdated: Date.now(),
  },
  {
    id: '10',
    name: 'Funayurei',
    threatLevel: 'medium',
    location: 'Port Area',
    status: 'active',
    description:
      'Vengeful spirit of a drowned sailor seeking revenge on the living',
    lastUpdated: Date.now(),
  },
  {
    id: '11',
    name: 'Shinigami',
    threatLevel: 'critical',
    location: 'Underworld Gate',
    status: 'active',
    description:
      'Death god that harvests souls and maintains balance between life and death',
    lastUpdated: Date.now(),
  },
  {
    id: '12',
    name: 'Umibōzu',
    threatLevel: 'high',
    location: 'Deep Sea',
    status: 'active',
    description:
      'Giant monk-like yokai that emerges from the ocean depths during storms',
    lastUpdated: Date.now(),
  },
];

export const updateThreatLevel = (
  id: string,
  threatLevel: Anomaly['threatLevel']
): Anomaly | undefined => {
  return updateAnomaly(id, { threatLevel });
};

// Reset all anomalies to their initial state
export const resetAnomalies = (): Anomaly[] => {
  global.mockDB.anomalies = initialAnomalies.map((anomaly) => ({
    ...anomaly,
    lastUpdated: Date.now(),
  }));
  return JSON.parse(JSON.stringify([...global.mockDB.anomalies]));
};
