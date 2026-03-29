import { renderViewportSwitcher } from '../../component/viewport-switcher';
import { renderPolicyExportButton } from '../../component/policy-export-button';
import { renderTemplatePreviewCard } from '../../component/template-preview-card';
import { renderExplorerDetailWorkspace } from '../../layout/explorer-detail-workspace';
import type { LayoutGalleryViewModel } from '../../state/layout-gallery-view-model';
import { renderPreviewHost } from './preview-host';
import { renderSelectorTopicList } from './render-selector-topic-list';
import { getViewDefinition } from '../../view/view-registry';

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const renderSelectedTemplate = (viewModel: LayoutGalleryViewModel): string => {
  const selectedView = getViewDefinition(viewModel.selectedTemplate.id);

  return selectedView.render({
    designPolicy: viewModel.designPolicy,
    interactionPolicy: viewModel.interactionPolicy,
    layoutPolicy: {
      availableTemplateIds: viewModel.templates.map((template) => template.id),
      availableTemplates: viewModel.templates,
      defaultTemplateId: viewModel.selectedTemplate.id,
      rationale: viewModel.rationale,
      workspaceKind: viewModel.workspaceKind,
    },
    mode: 'preview',
    navigation: viewModel.sidebarShell,
    runtime: viewModel.runtime,
    viewport: viewModel.selectedViewport,
  });
};

const renderPreviewPanel = (viewModel: LayoutGalleryViewModel): string =>
  renderPreviewHost(
    viewModel.selectedViewport,
    renderViewportSwitcher(viewModel.viewportProfiles, viewModel.selectedViewport.id),
    renderSelectedTemplate(viewModel),
  );

const renderInspectorPanel = (viewModel: LayoutGalleryViewModel): string => `
  <aside class="selector-inspector">
    <div class="selector-inspector__section">
      <span class="pattern__section-title">Topic</span>
      <p>${escapeHtml(viewModel.selectedTopic.label)}</p>
      <p>${escapeHtml(viewModel.selectedTopic.description)}</p>
    </div>
    <div class="selector-inspector__section">
      <span class="pattern__section-title">Reference</span>
      <p>${escapeHtml(viewModel.selectedTopic.referenceExample ?? 'Template baseline')}</p>
    </div>
    <div class="selector-inspector__section">
      <span class="pattern__section-title">Viewport</span>
      <p>${viewModel.selectedViewport.label}</p>
    </div>
    <div class="selector-inspector__section">
      <span class="pattern__section-title">Context</span>
      <p>section=${viewModel.sidebarShell.section}</p>
      <p>tab=${viewModel.sidebarShell.tab}</p>
      <p>mobilePane=${viewModel.sidebarShell.mobilePane}</p>
    </div>
    ${renderPolicyExportButton()}
  </aside>
`;

const renderDetailPanel = (viewModel: LayoutGalleryViewModel): string => {
  switch (viewModel.selectedTopic.id) {
    case 'sidebar-layout':
      return renderPreviewPanel(viewModel);
    case 'design-tone':
      return renderTemplatePreviewCard({
        eyebrow: 'Design',
        title: 'Tone',
        body: `
          <div class="policy-lines">
            <p>tone=${viewModel.designPolicy.tone}</p>
            <p>density=${viewModel.designPolicy.density}</p>
            <p>contrast=${viewModel.designPolicy.contrast}</p>
            <p>motion=${viewModel.designPolicy.motion}</p>
          </div>
          <div class="design-preview">
            <div class="design-preview__surface">Surface</div>
            <div class="design-preview__surface is-muted">Muted Surface</div>
            <div class="design-preview__surface is-strong">Active Element</div>
          </div>
        `,
      });
    case 'design-surfaces':
      return renderTemplatePreviewCard({
        eyebrow: 'Design',
        title: 'Surfaces',
        body: `
          <div class="design-preview">
            <div class="design-preview__surface">Editor Surface</div>
            <div class="design-preview__surface is-muted">Sidebar Surface</div>
            <div class="design-preview__surface is-strong">Active Selection</div>
          </div>
        `,
      });
    case 'interaction-selection':
      return renderTemplatePreviewCard({
        eyebrow: 'Interaction',
        title: 'Selection Flow',
        body: `
          <div class="policy-lines">
            <p>layoutSelection=${viewModel.interactionPolicy.layoutSelection}</p>
            <p>panelBehavior=${viewModel.interactionPolicy.panelBehavior}</p>
            <p>selectionFlow=${viewModel.interactionPolicy.selectionFlow}</p>
          </div>
        `,
      });
    case 'interaction-persistence':
      return renderTemplatePreviewCard({
        eyebrow: 'Interaction',
        title: 'Persistence',
        body: `
          <div class="policy-lines">
            <p>persistence=${viewModel.interactionPolicy.persistence}</p>
          </div>
        `,
      });
    case 'runtime-summary':
      return renderTemplatePreviewCard({
        eyebrow: 'Runtime',
        title: 'Version and Diagnostics',
        body: `<pre class="runtime-summary">${viewModel.runtime.runtimeSummary}</pre>`,
      });
  }
};

export const renderPatternSelectorScreen = (viewModel: LayoutGalleryViewModel): string => `
  <section class="template-gallery">
    <header class="template-gallery__header">
      <div class="template-gallery__title">
        <span class="template-gallery__product">${viewModel.runtime.title}</span>
        <span class="template-gallery__divider">/</span>
        <span class="template-gallery__section">Template Catalog</span>
      </div>
    </header>
    ${renderExplorerDetailWorkspace({
      explorer: renderSelectorTopicList(
        `
          <label class="template-gallery__concern-picker">
            <select data-selector-concern-select>
              ${viewModel.concerns
                .map(
                  (concern) => `
                    <option value="${concern.id}"${concern.id === viewModel.selectedConcern.id ? ' selected' : ''}>
                      ${concern.label}
                    </option>
                  `,
                )
                .join('')}
            </select>
          </label>
        `,
        viewModel.topics,
        viewModel.selectedTopic.id,
      ),
      detail: renderDetailPanel(viewModel),
      inspector: renderInspectorPanel(viewModel),
    })}
  </section>
`;
