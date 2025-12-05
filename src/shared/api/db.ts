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

// Initialize the database with 5 initial anomalies
if (!global.mockDB) {
  global.mockDB = {
    anomalies: [
      {
        id: '1',
        name: 'Kitsune',
        threatLevel: 'high',
        location: 'Shinjuku District',
        status: 'active',
        description: 'Fox spirit with multiple tails, capable of illusions and fire manipulation',
        lastUpdated: Date.now(),
      },
      {
        id: '2',
        name: 'Tengu',
        threatLevel: 'medium',
        location: 'Mount Kurama',
        status: 'active',
        description: 'Crow-like yokai with supernatural abilities and martial arts skills',
        lastUpdated: Date.now(),
      },
      {
        id: '3',
        name: 'Kappa',
        threatLevel: 'medium',
        location: 'Rivers of Saitama',
        status: 'active',
        description: 'Water-dwelling creature known for mischief and dangerous strength',
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
    ],
  };
}

// CRUD operations for anomalies
export const getAllAnomalies = (): Anomaly[] => {
  // Return plain objects without methods to ensure serialization
  return JSON.parse(JSON.stringify([...global.mockDB.anomalies])); // Return a copy
};

export const getAnomalyById = (id: string): Anomaly | undefined => {
  const anomaly = global.mockDB.anomalies.find(anomaly => anomaly.id === id);
  return anomaly ? JSON.parse(JSON.stringify(anomaly)) : undefined;
};

export const updateAnomaly = (id: string, updates: Partial<Anomaly>): Anomaly | undefined => {
  const index = global.mockDB.anomalies.findIndex(anomaly => anomaly.id === id);
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
  const activeAnomalies = global.mockDB.anomalies.filter(anomaly => anomaly.status === 'active');
  if (activeAnomalies.length === 0) return undefined;

  const randomIndex = Math.floor(Math.random() * activeAnomalies.length);
  // Return plain object without methods to ensure serialization
  return JSON.parse(JSON.stringify({...activeAnomalies[randomIndex]})); // Return a copy
};

export const updateThreatLevel = (id: string, threatLevel: Anomaly['threatLevel']): Anomaly | undefined => {
  return updateAnomaly(id, { threatLevel });
};