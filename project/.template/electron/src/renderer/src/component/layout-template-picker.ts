import type { LayoutTemplate, LayoutTemplateId } from '../contract/layout-template';

const renderTemplateButton = (
  template: LayoutTemplate,
  selectedTemplateId: LayoutTemplateId,
): string => `
  <button
    type="button"
    class="layout-picker__button${template.id === selectedTemplateId ? ' is-active' : ''}"
    data-layout-template="${template.id}"
    aria-pressed="${template.id === selectedTemplateId ? 'true' : 'false'}"
  >
    <span class="layout-picker__label">${template.label}</span>
    <span class="layout-picker__description">${template.description}</span>
  </button>
`;

export const renderLayoutTemplatePicker = (
  templates: readonly LayoutTemplate[],
  selectedTemplateId: LayoutTemplateId,
): string => `
  <nav class="layout-picker" aria-label="Layout template selector">
    ${templates.map((template) => renderTemplateButton(template, selectedTemplateId)).join('')}
  </nav>
`;
