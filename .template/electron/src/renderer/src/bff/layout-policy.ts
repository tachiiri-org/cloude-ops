import layoutPolicyDocument from '../../../../ui/layout-policy.json';

import type { LayoutPolicy } from '../contracts/layout-policy';
import type { LayoutTemplate, LayoutTemplateId } from '../contracts/layout-template';
import { viewRegistry } from '../views/view-registry';

const layoutCatalog: readonly LayoutTemplate[] = viewRegistry.map((view) => ({
  description: view.description,
  id: view.id,
  label: view.label,
}));

const isLayoutTemplateId = (value: string): value is LayoutTemplateId =>
  layoutCatalog.some((template) => template.id === value);

const parseWorkspaceKind = (value: string): LayoutPolicy['workspaceKind'] => {
  if (
    value === 'diagnostics' ||
    value === 'exploration' ||
    value === 'editing' ||
    value === 'conversation' ||
    value === 'monitoring' ||
    value === 'topology' ||
    value === 'commanding'
  ) {
    return value;
  }

  return 'diagnostics';
};

const resolveAvailableTemplates = (
  availableTemplateIds: readonly LayoutTemplateId[],
): readonly LayoutTemplate[] =>
  availableTemplateIds
    .map((templateId) => layoutCatalog.find((template) => template.id === templateId))
    .filter((template): template is LayoutTemplate => Boolean(template));

export const getLayoutPolicy = (): LayoutPolicy => {
  const availableTemplateIds = layoutPolicyDocument.availableTemplateIds.filter(isLayoutTemplateId);
  const defaultTemplateId = isLayoutTemplateId(layoutPolicyDocument.defaultTemplateId)
    ? layoutPolicyDocument.defaultTemplateId
    : 'sidebar-layout';

  return {
    availableTemplateIds,
    availableTemplates: resolveAvailableTemplates(availableTemplateIds),
    defaultTemplateId,
    rationale: layoutPolicyDocument.rationale,
    workspaceKind: parseWorkspaceKind(layoutPolicyDocument.workspaceKind),
  };
};
