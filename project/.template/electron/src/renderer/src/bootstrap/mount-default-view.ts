import type { DesignPolicy } from '../contract/design-policy';
import type { InteractionPolicy } from '../contract/interaction-policy';
import type { LayoutPolicy } from '../contract/layout-policy';
import type { RuntimeDiagnosticsSource } from '../contract/runtime-diagnostics-source';
import { viewportProfiles } from '../contract/viewport-profile';
import { createRuntimeViewModel } from '../state/runtime-view-model';
import { resolveRendererRoot } from './resolve-renderer-root';
import { getViewDefinition } from '../view/view-registry';

type MountDefaultViewOptions = {
  readonly getDesignPolicy: () => DesignPolicy;
  readonly getInteractionPolicy: () => InteractionPolicy;
  readonly getLayoutPolicy: () => LayoutPolicy;
  readonly runtimeDiagnosticsSource: RuntimeDiagnosticsSource;
};

export const mountDefaultView = async (options: MountDefaultViewOptions): Promise<void> => {
  const root = resolveRendererRoot();
  const currentLayoutPolicy = options.getLayoutPolicy();
  const currentDesignPolicy = options.getDesignPolicy();
  const currentInteractionPolicy = options.getInteractionPolicy();
  let currentBootstrapError: string | null = null;

  const render = (runtime = createRuntimeViewModel(null, currentBootstrapError)): void => {
    const selectedView = getViewDefinition(currentLayoutPolicy.defaultTemplateId);

    root.innerHTML = `
      <main class="default-view-screen">
        ${selectedView.render({
          designPolicy: currentDesignPolicy,
          interactionPolicy: currentInteractionPolicy,
          layoutPolicy: currentLayoutPolicy,
          mode: 'app',
          navigation: {
            mobilePane: 'explorer',
            section: 'ui-patterns',
            tab: 'live-shell',
          },
          runtime,
          viewport: viewportProfiles[0]!,
        })}
      </main>
    `;
  };

  try {
    const initialSnapshot = await options.runtimeDiagnosticsSource.getInitialSnapshot();
    currentBootstrapError = null;
    render(createRuntimeViewModel(initialSnapshot));

    options.runtimeDiagnosticsSource.subscribe((nextSnapshot) => {
      currentBootstrapError = null;
      render(createRuntimeViewModel(nextSnapshot));
    });
  } catch (error: unknown) {
    currentBootstrapError =
      error instanceof Error ? error.message : 'Runtime snapshot is unavailable.';
    render(createRuntimeViewModel(null, currentBootstrapError));
  }
};
