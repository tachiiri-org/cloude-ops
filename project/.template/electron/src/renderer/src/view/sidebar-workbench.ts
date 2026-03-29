import { renderMetadataGrid } from '../component/metadata-grid';
import { renderStatusBanner } from '../component/status-banner';
import { renderSidebarLayout } from '../layout/sidebar-layout';
import type { UiViewDefinition, UiViewProps } from '../contract/ui-view';
import type { SidebarShellSectionId } from '../state/layout-gallery-view-model';

const renderSidebarShellHeader = (props: UiViewProps): string => {
  const titles: Record<SidebarShellSectionId, string> = {
    'ui-patterns': 'Editor',
    design: 'Design Surface',
    interaction: 'Interaction Flow',
    'runtime-info': 'Runtime Record',
  };

  const summaries: Record<SidebarShellSectionId, string> = {
    'ui-patterns':
      'The adopted shell keeps the explorer persistent while the editor detail stays live.',
    design: 'Monochrome, flat, and simple surfaces are the current baseline for this template.',
    interaction:
      'The selector can export policy while letting the workbench remain directly manipulable.',
    'runtime-info': 'Runtime metadata and update state stay embedded inside the adopted shell.',
  };

  return `
    <div class="pattern__editor-block">
      <span class="pattern__section-title">${props.mode === 'app' ? 'Adopted View' : 'UI Pattern'}</span>
      <h1>${props.runtime.title}</h1>
      <p class="pattern__editor-kicker">${titles[props.navigation.section]}</p>
      <p>${summaries[props.navigation.section]}</p>
    </div>
  `;
};

const renderPolicyPane = (props: UiViewProps): string => `
  <div class="pattern__editor-block">
    <span class="pattern__section-title">Repository Policy</span>
    <h1>ui-policy.json</h1>
    <p>The adopted shell can be exported as policy and then reconciled during setup.</p>
  </div>
  <pre class="pattern__artifact-code">{
  "defaultTemplateId": "${props.layoutPolicy.defaultTemplateId}",
  "workspaceKind": "${props.layoutPolicy.workspaceKind}",
  "rationale": "${props.layoutPolicy.rationale.replaceAll('"', '\\"')}"
}</pre>
`;

const renderLivePane = (props: UiViewProps): string => {
  switch (props.navigation.section) {
    case 'ui-patterns':
      return `
        ${renderSidebarShellHeader(props)}
        <div class="pattern__editor-grid">
          <div class="pattern__editor-panel">Persistent explorer</div>
          <div class="pattern__editor-panel">Live detail host</div>
          ${props.viewport.id === 'desktop' ? '<div class="pattern__editor-panel">Auxiliary output</div>' : ''}
        </div>
        ${renderMetadataGrid(props.runtime.metadata)}
        ${renderStatusBanner({
          bootstrapError: props.runtime.bootstrapError,
          updateMessage: props.runtime.updateMessage,
        })}
      `;
    case 'design':
      return `
        ${renderSidebarShellHeader(props)}
        <div class="design-preview">
          <div class="design-preview__surface">tone=${props.designPolicy.tone}</div>
          <div class="design-preview__surface is-muted">density=${props.designPolicy.density}</div>
          <div class="design-preview__surface is-strong">contrast=${props.designPolicy.contrast}</div>
        </div>
      `;
    case 'interaction':
      return `
        ${renderSidebarShellHeader(props)}
        <div class="policy-lines">
          <p>selectionFlow=${props.interactionPolicy.selectionFlow}</p>
          <p>panelBehavior=${props.interactionPolicy.panelBehavior}</p>
          <p>layoutSelection=${props.interactionPolicy.layoutSelection}</p>
        </div>
      `;
    case 'runtime-info':
      return `
        ${renderSidebarShellHeader(props)}
        ${renderMetadataGrid(props.runtime.metadata)}
        ${renderStatusBanner({
          bootstrapError: props.runtime.bootstrapError,
          updateMessage: props.runtime.updateMessage,
        })}
      `;
  }
};

const renderWorkbench = (props: UiViewProps): string => {
  const content =
    props.navigation.tab === 'policy' ? renderPolicyPane(props) : renderLivePane(props);

  if (props.viewport.id === 'mobile') {
    if (props.navigation.mobilePane === 'files') {
      return `
        <div class="pattern__mobile-section">
          <span class="pattern__section-title">Files</span>
          <button class="pattern__row is-active">ui-policy.json</button>
          <button class="pattern__row">view-registry.ts</button>
          <button class="pattern__row">layout.css</button>
        </div>
      `;
    }

    if (props.navigation.mobilePane === 'output') {
      return `
        <div class="pattern__mobile-section">
          <span class="pattern__section-title">Output</span>
          <pre class="runtime-summary">${props.runtime.runtimeSummary}</pre>
        </div>
      `;
    }
  }

  return content;
};

export const sidebarWorkbenchView: UiViewDefinition = {
  id: 'sidebar-layout',
  label: 'Workbench Sidebar',
  description:
    'The adopted shell for this template: a persistent explorer with a live workbench detail.',
  render: (props) =>
    renderSidebarLayout({
      mode: props.mode,
      mobilePane: props.navigation.mobilePane,
      section: props.navigation.section,
      tab: props.navigation.tab,
      viewport: props.viewport.id,
      workbench: renderWorkbench(props),
    }),
};
