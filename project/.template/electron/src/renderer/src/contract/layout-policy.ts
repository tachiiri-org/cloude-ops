import type { LayoutTemplate, LayoutTemplateId } from './layout-template';

export type WorkspaceKind =
  | 'diagnostics'
  | 'exploration'
  | 'editing'
  | 'conversation'
  | 'monitoring'
  | 'topology'
  | 'commanding';

export type LayoutPolicy = {
  readonly availableTemplateIds: readonly LayoutTemplateId[];
  readonly availableTemplates: readonly LayoutTemplate[];
  readonly defaultTemplateId: LayoutTemplateId;
  readonly rationale: string;
  readonly workspaceKind: WorkspaceKind;
};
