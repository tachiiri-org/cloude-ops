import type { ViewportProfileId } from '../contract/viewport-profile';
import type {
  SidebarShellMobilePaneId,
  SidebarShellSectionId,
  SidebarShellTabId,
} from '../state/layout-gallery-view-model';

type SidebarLayoutModel = {
  readonly mode: 'app' | 'preview';
  readonly mobilePane: SidebarShellMobilePaneId;
  readonly section: SidebarShellSectionId;
  readonly tab: SidebarShellTabId;
  readonly viewport: ViewportProfileId;
  readonly workbench: string;
};

type SidebarItem = {
  readonly label: string;
  readonly meta: string;
};

const sidebarItemsBySection: Record<SidebarShellSectionId, readonly SidebarItem[]> = {
  'ui-patterns': [
    { label: 'Editor', meta: 'Primary workspace shell' },
    { label: 'Files', meta: 'Repository-local settings' },
    { label: 'Search', meta: 'Quick jump and filter entry' },
    { label: 'Output', meta: 'Diagnostics and task output' },
  ],
  design: [
    { label: 'Tone', meta: 'Monochrome, flat baseline' },
    { label: 'Surfaces', meta: 'Panel depth and emphasis' },
    { label: 'Typography', meta: 'Dense editor-oriented rhythm' },
    { label: 'Motion', meta: 'Subtle transitions only' },
  ],
  interaction: [
    { label: 'Selection Flow', meta: 'Preview before commit' },
    { label: 'Panel Behavior', meta: 'Fixed shell posture' },
    { label: 'Persistence', meta: 'Local export for setup' },
    { label: 'Shortcuts', meta: 'Keyboard-first navigation' },
  ],
  'runtime-info': [
    { label: 'Version', meta: 'Channel and build identity' },
    { label: 'Updater', meta: 'Latest published artifact state' },
    { label: 'Bootstrap', meta: 'Startup failure visibility' },
    { label: 'Environment', meta: 'Runtime and platform record' },
  ],
};

const tabLabels: Record<SidebarShellTabId, string> = {
  'live-shell': 'Live Shell',
  policy: 'Policy File',
};

const sectionLabels: Record<SidebarShellSectionId, string> = {
  'ui-patterns': 'Editor',
  design: 'Design',
  interaction: 'Interaction',
  'runtime-info': 'Runtime',
};

const renderSidebarItems = (section: SidebarShellSectionId, tab: SidebarShellTabId): string =>
  sidebarItemsBySection[section]
    .map(
      (item, index) => `
        <div class="pattern__sidebar-item${index === 0 ? ' is-active' : ''}">
          <span>${item.label}</span>
          <span class="pattern__sidebar-item-meta">${tab === 'policy' ? 'json' : item.meta}</span>
        </div>
      `,
    )
    .join('');

export const renderSidebarLayout = (model: SidebarLayoutModel): string => {
  const viewport = model.viewport;
  const shellClass = `pattern pattern--sidebar${viewport === 'tablet' ? ' pattern--sidebar-tablet' : ''}${model.mode === 'app' ? ' pattern--sidebar-app' : ''}`;

  if (viewport === 'mobile') {
    return `
      <section class="${model.mode === 'app' ? 'pattern-shell' : 'pattern-frame pattern-frame--mobile'}">
        <div class="${shellClass} pattern--sidebar-mobile">
          <header class="pattern__topbar">
            <span class="pattern__title">Editor</span>
            <span class="pattern__action">Search</span>
          </header>
          <div class="pattern__mobile-nav">
            <button class="pattern__tab${model.mobilePane === 'explorer' ? ' is-active' : ''}" data-sidebar-mobile-pane="explorer">Explorer</button>
            <button class="pattern__tab${model.mobilePane === 'files' ? ' is-active' : ''}" data-sidebar-mobile-pane="files">Files</button>
            <button class="pattern__tab${model.mobilePane === 'output' ? ' is-active' : ''}" data-sidebar-mobile-pane="output">Output</button>
          </div>
          <div class="pattern__mobile-page">
            ${model.workbench}
          </div>
        </div>
      </section>
    `;
  }

  return `
    <section class="${model.mode === 'app' ? 'pattern-shell' : `pattern-frame pattern-frame--${viewport}`}">
      <div class="${shellClass}">
        <aside class="pattern__sidebar">
          <div class="pattern__sidebar-header">Explorer</div>
          <label class="pattern__sidebar-field">
            <span class="pattern__sidebar-label">View</span>
            <select class="pattern__sidebar-select" data-sidebar-section-select>
              <option value="ui-patterns"${model.section === 'ui-patterns' ? ' selected' : ''}>${sectionLabels['ui-patterns']}</option>
              <option value="design"${model.section === 'design' ? ' selected' : ''}>${sectionLabels.design}</option>
              <option value="interaction"${model.section === 'interaction' ? ' selected' : ''}>${sectionLabels.interaction}</option>
              <option value="runtime-info"${model.section === 'runtime-info' ? ' selected' : ''}>${sectionLabels['runtime-info']}</option>
            </select>
          </label>
          <label class="pattern__sidebar-field">
            <span class="pattern__sidebar-label">Source</span>
            <select class="pattern__sidebar-select" data-sidebar-tab-select>
              <option value="live-shell"${model.tab === 'live-shell' ? ' selected' : ''}>${tabLabels['live-shell']}</option>
              <option value="policy"${model.tab === 'policy' ? ' selected' : ''}>${tabLabels.policy}</option>
            </select>
          </label>
          <div class="pattern__sidebar-group">
            ${renderSidebarItems(model.section, model.tab)}
          </div>
        </aside>
        <main class="pattern__editor-shell">
          <div class="pattern__editor-tabs">
            <button class="pattern__editor-tab${model.tab === 'live-shell' ? ' is-active' : ''}" data-sidebar-tab="live-shell">live-shell.ts</button>
            <button class="pattern__editor-tab${model.tab === 'policy' ? ' is-active' : ''}" data-sidebar-tab="policy">ui-policy.json</button>
          </div>
          <div class="pattern__editor-surface">${model.workbench}</div>
        </main>
      </div>
    </section>
  `;
};
