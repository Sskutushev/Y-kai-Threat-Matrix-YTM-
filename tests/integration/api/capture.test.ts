/**
 * @jest-environment node
 */

import { POST } from '@/app/api/capture/route';
import { Anomaly } from '@/shared/api/db';
import { NextRequest } from 'next/server';

const initialAnomalies: Anomaly[] = [
  { id: '1', name: 'Kitsune', location: 'Shibuya', threatLevel: 'high', status: 'active', lastUpdated: Date.now() },
  { id: '2', name: 'Oni', location: 'Roppongi', threatLevel: 'critical', status: 'captured', lastUpdated: Date.now() },
];

describe('POST /api/capture', () => {
  beforeEach(() => {
    // Reset the mockDB before each test
    global.mockDB = { anomalies: JSON.parse(JSON.stringify(initialAnomalies)) };
  });

  it('should capture an active anomaly successfully', async () => {
    const req = new NextRequest('http://localhost/api/capture', {
      method: 'POST',
      body: JSON.stringify({ id: '1' }),
    });

    // Mock Math.random to ensure the capture succeeds
    const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.5);

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe('captured');
    expect(global.mockDB.anomalies.find(a => a.id === '1')?.status).toBe('captured');

    mathRandomSpy.mockRestore();
  });

  it('should return an error when capture fails randomly', async () => {
    const req = new NextRequest('http://localhost/api/capture', {
      method: 'POST',
      body: JSON.stringify({ id: '1' }),
    });

    // Mock Math.random to ensure the capture fails
    const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toContain('Capture failed');
    expect(global.mockDB.anomalies.find(a => a.id === '1')?.status).toBe('active');

    mathRandomSpy.mockRestore();
  });

  it('should return 404 if the anomaly does not exist', async () => {
    const req = new NextRequest('http://localhost/api/capture', {
      method: 'POST',
      body: JSON.stringify({ id: '999' }),
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.error).toBe('Anomaly not found');
  });

  it('should return 400 if the anomaly is already captured', async () => {
    const req = new NextRequest('http://localhost/api/capture', {
      method: 'POST',
      body: JSON.stringify({ id: '2' }),
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('Anomaly already captured');
  });

  it('should return 400 for an invalid request body', async () => {
    const req = new NextRequest('http://localhost/api/capture', {
      method: 'POST',
      body: JSON.stringify({ not_an_id: '1' }),
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('Validation error');
  });
});
