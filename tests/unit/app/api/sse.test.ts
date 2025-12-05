import { GET as handleSSE } from '@/app/api/sse/route';

describe('SSE API Route', () => {
  // Mock global ReadableStream
  const originalReadableStream = global.ReadableStream;

  beforeAll(() => {
    global.ReadableStream = class MockReadableStream {
      constructor(
        public start: (controller: any) => void,
        public pull?: (controller: any) => void
      ) {}
    } as any;
  });

  afterAll(() => {
    global.ReadableStream = originalReadableStream;
  });

  test('should return proper SSE headers', async () => {
    // Mock TextEncoder
    const originalTextEncoder = global.TextEncoder;
    (global as any).TextEncoder = class {
      encode = jest.fn().mockReturnValue(new Uint8Array());
    };

    const response = await handleSSE(new Request('http://localhost/api/sse'));

    expect(response.headers.get('Content-Type')).toBe('text/event-stream');
    expect(response.headers.get('Cache-Control')).toBe('no-cache');
    expect(response.headers.get('Connection')).toBe('keep-alive');
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');

    // Restore TextEncoder
    global.TextEncoder = originalTextEncoder;
  });
});
