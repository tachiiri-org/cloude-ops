import { describe, expect, it } from 'vitest';

import { resolveRendererMode } from './renderer-mode';

describe('resolveRendererMode', () => {
  it('defaults to app mode', () => {
    expect(resolveRendererMode('')).toBe('app');
    expect(resolveRendererMode('?foo=bar')).toBe('app');
  });

  it('switches to selector mode when explicitly requested', () => {
    expect(resolveRendererMode('?mode=selector')).toBe('selector');
  });
});
