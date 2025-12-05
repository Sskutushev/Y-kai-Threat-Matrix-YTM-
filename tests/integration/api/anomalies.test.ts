/**
 * @jest-environment node
 */

import { GET } from '@/app/api/anomalies/route';
import { db, Anomaly } from '@/shared/api/db';
import { NextRequest } from 'next/server';

const initialAnomalies: Anomaly[] = [
  { id: '1', name: 'Kitsune', location: 'Shibuya', threatLevel: 'high', status: 'active', lastUpdated: Date.now() },
  { id: '2', name: 'Oni', location: 'Roppongi', threatLevel: 'critical', status: 'captured', lastUpdated: Date.now() },
];

describe('GET /api/anomalies', () => {
  beforeEach(() => {
    // We need to manually reset the global mock DB for each test
    global.mockDB = { anomalies: JSON.parse(JSON.stringify(initialAnomalies)) };
  });

  it('should return a list of all anomalies', async () => {
    const req = new NextRequest('http://localhost/api/anomalies');
    const response = await GET(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toHaveLength(2);
    expect(body[0].name).toBe('Kitsune');
  });
});
