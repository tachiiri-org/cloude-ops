import type { LayoutTemplateId } from '../../contract/layout-template';
import type { UiPolicy } from '../../contract/ui-policy';
import type { ViewportProfileId } from '../../contract/viewport-profile';
import type {
  SidebarShellMobilePaneId,
  SidebarShellSectionId,
  SidebarShellTabId,
} from '../../state/layout-gallery-view-model';
import { exportUiPolicy } from './export-ui-policy';
import type { SelectorConcernId, SelectorTopicId } from './selector-navigation';
import { attachPreviewHosts } from './preview-host';

type AttachPatternSelectorOptions = {
  readonly onSelectConcern: (concernId: SelectorConcernId) => void;
  readonly onSelectLayoutTemplate: (layoutTemplateId: LayoutTemplateId) => void;
  readonly onSelectSidebarMobilePane: (paneId: SidebarShellMobilePaneId) => void;
  readonly onSelectSidebarSection: (sectionId: SidebarShellSectionId) => void;
  readonly onSelectSidebarTab: (tabId: SidebarShellTabId) => void;
  readonly onSelectTopic: (topicId: SelectorTopicId) => void;
  readonly onSelectViewport: (viewportId: ViewportProfileId) => void;
  readonly uiPolicy: UiPolicy;
};

export const attachPatternSelector = (
  root: HTMLElement,
  options: AttachPatternSelectorOptions,
): void => {
  attachPreviewHosts(root);

  const concernSelect = root.querySelector<HTMLSelectElement>('[data-selector-concern-select]');

  concernSelect?.addEventListener('change', () => {
    const nextConcernId = concernSelect.value as SelectorConcernId;

    options.onSelectConcern(nextConcernId);
  });

  for (const button of root.querySelectorAll<HTMLElement>('[data-selector-concern]')) {
    button.addEventListener('click', () => {
      const nextConcernId = button.dataset.selectorConcern as SelectorConcernId | undefined;

      if (nextConcernId) {
        options.onSelectConcern(nextConcernId);
      }
    });
  }

  for (const button of root.querySelectorAll<HTMLElement>('[data-selector-topic]')) {
    button.addEventListener('click', () => {
      const nextTopicId = button.dataset.selectorTopic as SelectorTopicId | undefined;

      if (nextTopicId) {
        options.onSelectTopic(nextTopicId);
      }
    });
  }

  for (const button of root.querySelectorAll<HTMLElement>('[data-layout-template]')) {
    button.addEventListener('click', () => {
      const nextLayoutTemplateId = button.dataset.layoutTemplate as LayoutTemplateId | undefined;

      if (nextLayoutTemplateId) {
        options.onSelectLayoutTemplate(nextLayoutTemplateId);
      }
    });
  }

  for (const button of root.querySelectorAll<HTMLElement>('[data-viewport-profile]')) {
    button.addEventListener('click', () => {
      const nextViewportId = button.dataset.viewportProfile as ViewportProfileId | undefined;

      if (nextViewportId) {
        options.onSelectViewport(nextViewportId);
      }
    });
  }

  for (const button of root.querySelectorAll<HTMLElement>('[data-sidebar-section]')) {
    button.addEventListener('click', () => {
      const nextSectionId = button.dataset.sidebarSection as SidebarShellSectionId | undefined;

      if (nextSectionId) {
        options.onSelectSidebarSection(nextSectionId);
      }
    });
  }

  for (const button of root.querySelectorAll<HTMLElement>('[data-sidebar-tab]')) {
    button.addEventListener('click', () => {
      const nextTabId = button.dataset.sidebarTab as SidebarShellTabId | undefined;

      if (nextTabId) {
        options.onSelectSidebarTab(nextTabId);
      }
    });
  }

  const sectionSelect = root.querySelector<HTMLSelectElement>('[data-sidebar-section-select]');

  sectionSelect?.addEventListener('change', () => {
    const nextSectionId = sectionSelect.value as SidebarShellSectionId;

    options.onSelectSidebarSection(nextSectionId);
  });

  const tabSelect = root.querySelector<HTMLSelectElement>('[data-sidebar-tab-select]');

  tabSelect?.addEventListener('change', () => {
    const nextTabId = tabSelect.value as SidebarShellTabId;

    options.onSelectSidebarTab(nextTabId);
  });

  for (const button of root.querySelectorAll<HTMLElement>('[data-sidebar-mobile-pane]')) {
    button.addEventListener('click', () => {
      const nextPaneId = button.dataset.sidebarMobilePane as SidebarShellMobilePaneId | undefined;

      if (nextPaneId) {
        options.onSelectSidebarMobilePane(nextPaneId);
      }
    });
  }

  const exportButton = root.querySelector<HTMLElement>('[data-action="export-ui-policy"]');

  exportButton?.addEventListener('click', () => {
    exportUiPolicy(options.uiPolicy);
  });
};
