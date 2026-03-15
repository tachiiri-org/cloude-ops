import type { DesignPolicy } from '../contracts/design-policy';
import type { LayoutPolicy } from '../contracts/layout-policy';
import type { RuntimeDiagnosticsSnapshot } from '../contracts/runtime-diagnostics';
import type { RuntimeDiagnosticsSource } from '../contracts/runtime-diagnostics-source';
import type { InteractionPolicy } from '../contracts/interaction-policy';
import type { UiPolicy } from '../contracts/ui-policy';
import type { LayoutTemplateId } from '../contracts/layout-template';
import {
  defaultViewportProfileId,
  viewportProfiles,
  type ViewportProfileId,
} from '../contracts/viewport-profile';
import { createLayoutGalleryViewModel } from '../state/layout-gallery-view-model';
import type {
  SidebarShellMobilePaneId,
  SidebarShellSectionId,
  SidebarShellTabId,
} from '../state/layout-gallery-view-model';
import { attachPatternSelector } from '../tools/pattern-selector/attach-pattern-selector';
import { renderPatternSelectorScreen } from '../tools/pattern-selector/render-pattern-selector-screen';
import {
  defaultSelectorConcernId,
  defaultSelectorTopicId,
  selectorConcerns,
  selectorTopics,
  type SelectorConcernId,
  type SelectorTopicId,
} from '../tools/pattern-selector/selector-navigation';
import { resolveRendererRoot } from './resolve-renderer-root';

type MountTemplateGalleryOptions = {
  readonly getDesignPolicy: () => DesignPolicy;
  readonly getInteractionPolicy: () => InteractionPolicy;
  readonly getLayoutPolicy: () => LayoutPolicy;
  readonly runtimeDiagnosticsSource: RuntimeDiagnosticsSource;
};

export const mountTemplateGallery = async (options: MountTemplateGalleryOptions): Promise<void> => {
  let currentSnapshot: RuntimeDiagnosticsSnapshot | null = null;
  let currentLayoutPolicy: LayoutPolicy = options.getLayoutPolicy();
  let currentDesignPolicy: DesignPolicy = options.getDesignPolicy();
  let currentInteractionPolicy: InteractionPolicy = options.getInteractionPolicy();
  let currentSelectorConcernId: SelectorConcernId = defaultSelectorConcernId;
  let currentSelectorTopicId: SelectorTopicId = defaultSelectorTopicId;
  let currentLayoutTemplateId: LayoutTemplateId = currentLayoutPolicy.defaultTemplateId;
  let currentViewportId: ViewportProfileId = defaultViewportProfileId;
  let currentSidebarSectionId: SidebarShellSectionId = 'ui-patterns';
  let currentSidebarTabId: SidebarShellTabId = 'live-shell';
  let currentSidebarMobilePaneId: SidebarShellMobilePaneId = 'explorer';
  let currentBootstrapError: string | null = null;

  const resolveTopics = (concernId: SelectorConcernId) =>
    selectorTopics.filter((topic) => topic.concernId === concernId);

  const render = (): void => {
    const root = resolveRendererRoot();
    const currentTopics = resolveTopics(currentSelectorConcernId);

    root.innerHTML = renderPatternSelectorScreen(
      createLayoutGalleryViewModel(
        currentLayoutPolicy,
        currentDesignPolicy,
        currentInteractionPolicy,
        currentSnapshot,
        selectorConcerns,
        currentSelectorConcernId,
        currentTopics,
        currentSelectorTopicId,
        currentSelectorTopicId === 'sidebar-layout'
          ? currentSelectorTopicId
          : currentLayoutTemplateId,
        viewportProfiles,
        currentViewportId,
        {
          mobilePane: currentSidebarMobilePaneId,
          section: currentSidebarSectionId,
          tab: currentSidebarTabId,
        },
        currentBootstrapError,
      ),
    );
    const uiPolicy: UiPolicy = {
      designPolicy: currentDesignPolicy,
      interactionPolicy: currentInteractionPolicy,
      layoutPolicy: currentLayoutPolicy,
    };
    attachPatternSelector(root, {
      onSelectConcern: (nextConcernId) => {
        currentSelectorConcernId = nextConcernId;
        currentSelectorTopicId = resolveTopics(nextConcernId)[0]?.id ?? defaultSelectorTopicId;
        render();
      },
      onSelectLayoutTemplate: (nextLayoutTemplateId) => {
        currentLayoutTemplateId = nextLayoutTemplateId as LayoutTemplateId;
        currentSelectorTopicId = nextLayoutTemplateId as SelectorTopicId;
        render();
      },
      onSelectTopic: (nextTopicId) => {
        currentSelectorTopicId = nextTopicId;
        if (nextTopicId === 'sidebar-layout') {
          currentLayoutTemplateId = nextTopicId;
        }
        render();
      },
      onSelectViewport: (nextViewportId) => {
        currentViewportId = nextViewportId;
        render();
      },
      onSelectSidebarMobilePane: (nextPaneId) => {
        currentSidebarMobilePaneId = nextPaneId;
        render();
      },
      onSelectSidebarSection: (nextSectionId) => {
        currentSidebarSectionId = nextSectionId;
        render();
      },
      onSelectSidebarTab: (nextTabId) => {
        currentSidebarTabId = nextTabId;
        render();
      },
      uiPolicy,
    });
  };

  const showBootstrapError = (message: string): void => {
    currentBootstrapError = message;
    currentSnapshot = null;
    render();
  };

  try {
    currentLayoutPolicy = options.getLayoutPolicy();
    currentDesignPolicy = options.getDesignPolicy();
    currentInteractionPolicy = options.getInteractionPolicy();
    currentSelectorConcernId = defaultSelectorConcernId;
    currentSelectorTopicId = defaultSelectorTopicId;
    currentLayoutTemplateId = currentLayoutPolicy.defaultTemplateId;
    currentSidebarSectionId = 'ui-patterns';
    currentSidebarTabId = 'live-shell';
    currentSidebarMobilePaneId = 'explorer';
    currentSnapshot = await options.runtimeDiagnosticsSource.getInitialSnapshot();
    currentBootstrapError = null;

    render();
    options.runtimeDiagnosticsSource.subscribe((nextSnapshot) => {
      currentSnapshot = nextSnapshot;
      currentBootstrapError = null;
      render();
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Runtime snapshot is unavailable.';

    showBootstrapError(message);
    throw error;
  }
};
