import { TextEncoder, TextDecoder } from 'util';
import { TransformStream, ReadableStream } from 'node:stream/web';
import 'isomorphic-fetch';
import '@testing-library/jest-dom';

// --- POLYFILLS ---
/* eslint-disable @typescript-eslint/no-explicit-any */
global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;
global.TransformStream = TransformStream as any;
global.ReadableStream = ReadableStream as any;
/* eslint-enable @typescript-eslint/no-explicit-any */

// --- MOCK WINDOW.MATCHMEDIA ---
/* eslint-disable @typescript-eslint/no-empty-function */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
/* eslint-enable @typescript-eslint/no-empty-function */
