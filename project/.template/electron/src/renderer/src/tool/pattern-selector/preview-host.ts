import type { ViewportProfile } from '../../contract/viewport-profile';

export const renderPreviewHost = (
  viewport: ViewportProfile,
  toolbar: string,
  content: string,
): string => `
  <div class="selector-preview" data-preview-host>
    <div class="selector-preview__toolbar">
      ${toolbar}
    </div>
    <div class="selector-preview__canvas" data-preview-canvas>
      <div
        class="selector-preview__surface"
        data-preview-surface
        data-preview-width="${viewport.width}"
        data-preview-height="${viewport.height}"
      >
        ${content}
      </div>
    </div>
    <pre class="selector-preview__debug" data-preview-debug></pre>
  </div>
`;

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.max(minimum, Math.min(value, maximum));

const resolvePreferredHeight = (canvasHeight: number): number =>
  clamp(canvasHeight * 0.9, 360, 860);

type PreviewSurfaceSize = {
  readonly height: number;
  readonly width: number;
};

export const resolvePreviewSurfaceSize = (
  canvasWidth: number,
  canvasHeight: number,
  previewWidth: number,
  previewHeight: number,
): PreviewSurfaceSize => {
  if (!canvasWidth || !canvasHeight || !previewWidth || !previewHeight) {
    return {
      height: 0,
      width: 0,
    };
  }

  const aspectRatio = previewWidth / previewHeight;
  const preferredHeight = resolvePreferredHeight(canvasHeight);
  const maxWidthAtPreferredHeight = preferredHeight * aspectRatio;

  if (maxWidthAtPreferredHeight <= canvasWidth) {
    return {
      height: preferredHeight,
      width: maxWidthAtPreferredHeight,
    };
  }

  const fittedWidth = canvasWidth;
  const fittedHeight = fittedWidth / aspectRatio;

  return {
    height: Math.min(fittedHeight, canvasHeight),
    width: fittedWidth,
  };
};

const applyPreviewScale = (host: HTMLElement): void => {
  const canvas = host.querySelector<HTMLElement>('[data-preview-canvas]');
  const surface = host.querySelector<HTMLElement>('[data-preview-surface]');
  const debug = host.querySelector<HTMLElement>('[data-preview-debug]');

  if (!canvas || !surface || !debug) {
    return;
  }

  const previewWidth = Number(surface.dataset.previewWidth ?? '0');
  const previewHeight = Number(surface.dataset.previewHeight ?? '0');

  if (!previewWidth || !previewHeight) {
    return;
  }

  const availableWidth = canvas.clientWidth;
  const availableHeight = canvas.clientHeight;

  if (!availableWidth || !availableHeight) {
    return;
  }

  const targetSize = resolvePreviewSurfaceSize(
    availableWidth,
    availableHeight,
    previewWidth,
    previewHeight,
  );

  surface.style.setProperty('--preview-width', `${targetSize.width}px`);
  surface.style.setProperty('--preview-height', `${targetSize.height}px`);

  debug.textContent = [
    `canvas ${availableWidth}x${availableHeight}`,
    `preview ${previewWidth}x${previewHeight}`,
    `preferredHeight ${resolvePreferredHeight(availableHeight).toFixed(1)}`,
    `target ${targetSize.width.toFixed(1)}x${targetSize.height.toFixed(1)}`,
  ].join('\n');
};

export const attachPreviewHosts = (root: HTMLElement): void => {
  for (const host of root.querySelectorAll<HTMLElement>('[data-preview-host]')) {
    const observer = new ResizeObserver(() => {
      applyPreviewScale(host);
    });

    observer.observe(host);
    applyPreviewScale(host);
  }
};
