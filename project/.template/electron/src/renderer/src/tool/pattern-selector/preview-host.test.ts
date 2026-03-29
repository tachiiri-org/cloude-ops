import { describe, expect, it } from 'vitest';

import { resolvePreviewSurfaceSize } from './preview-host';

describe('resolvePreviewSurfaceSize', () => {
  it('keeps a shared preferred height when the canvas is wide enough', () => {
    expect(resolvePreviewSurfaceSize(900, 820, 420, 920)).toEqual({
      height: 738,
      width: 336.9130434782609,
    });
  });

  it('falls back to width fitting when the preferred height would overflow horizontally', () => {
    expect(resolvePreviewSurfaceSize(260, 820, 420, 920)).toEqual({
      height: 569.5238095238095,
      width: 260,
    });
  });

  it('caps the preferred height to avoid oversized previews on very tall canvases', () => {
    expect(resolvePreviewSurfaceSize(1600, 1200, 1280, 820)).toEqual({
      height: 860,
      width: 1342.439024390244,
    });
  });
});
