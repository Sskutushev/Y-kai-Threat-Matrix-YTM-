import { z } from 'zod';

// Define Zod schemas
export const ThreatLevelSchema = z.enum(['low', 'medium', 'high', 'critical']);
export type ThreatLevel = z.infer<typeof ThreatLevelSchema>;

export const AnomalyStatusSchema = z.enum(['active', 'captured']);
export type AnomalyStatus = z.infer<typeof AnomalyStatusSchema>;

export const AnomalySchema = z.object({
  id: z.string(),
  name: z.string(),
  threatLevel: ThreatLevelSchema,
  location: z.string(),
  status: AnomalyStatusSchema,
  description: z.string().optional(),
  lastUpdated: z.number(),
});

export type Anomaly = z.infer<typeof AnomalySchema>;

// Define schema for API responses
export const AnomaliesResponseSchema = z.array(AnomalySchema);
export type AnomaliesResponse = z.infer<typeof AnomaliesResponseSchema>;

// Define schema for capture requests
export const CaptureRequestSchema = z.object({
  id: z.string(),
});

export type CaptureRequest = z.infer<typeof CaptureRequestSchema>;

// Define schema for SSE events
export const SseEventSchema = z.object({
  id: z.string(),
  threatLevel: ThreatLevelSchema,
});

export type SseEvent = z.infer<typeof SseEventSchema>;