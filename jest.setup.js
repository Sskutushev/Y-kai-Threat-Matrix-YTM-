require('@testing-library/jest-dom');
const util = require('util');
const { Response, Request, fetch } = require('node-fetch');

// Polyfill web-standard APIs for the Node.js environment
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = util.TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = util.TextDecoder;
}
if (typeof global.Response === 'undefined') {
  global.Response = Response;
}
if (typeof global.Request === 'undefined') {
  global.Request = Request;
}
if (typeof global.fetch === 'undefined') {
  global.fetch = fetch;
}

// Mock classes for Web APIs not available in Node
if (typeof global.BroadcastChannel === 'undefined') {
    class BroadcastChannelMock {
      constructor(name) {}
      addEventListener(event, listener) {}
      removeEventListener(event, listener) {}
      postMessage(message) {}
      close() {}
    }
    global.BroadcastChannel = BroadcastChannelMock;
}

if (typeof global.WritableStream === 'undefined') {
    class WritableStreamMock {
        constructor() {}
        getWriter() {
            return {
                write: () => {},
                close: () => {},
                abort: () => {},
            };
        }
    }
    global.WritableStream = WritableStreamMock;
}