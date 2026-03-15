import { electronRuntimeDiagnosticsSource } from '../adapters/electron/runtime-diagnostics-source';
import { getDesignPolicy } from '../bff/design-policy';
import { getInteractionPolicy } from '../bff/interaction-policy';
import { getLayoutPolicy } from '../bff/layout-policy';
import { mountDefaultView } from './mount-default-view';
import { resolveRendererMode } from './renderer-mode';
import { mountTemplateGallery } from './mount-template-gallery';

export const mountRenderer = async (): Promise<void> => {
  const rendererMode = resolveRendererMode(window.location.search);

  if (rendererMode === 'selector') {
    await mountTemplateGallery({
      getDesignPolicy,
      getInteractionPolicy,
      getLayoutPolicy,
      runtimeDiagnosticsSource: electronRuntimeDiagnosticsSource,
    });

    return;
  }

  await mountDefaultView({
    getDesignPolicy,
    getInteractionPolicy,
    getLayoutPolicy,
    runtimeDiagnosticsSource: electronRuntimeDiagnosticsSource,
  });
};
