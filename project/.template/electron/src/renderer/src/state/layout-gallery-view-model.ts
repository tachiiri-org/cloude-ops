import type { DesignPolicy } from '../contract/design-policy';
import type { InteractionPolicy } from '../contract/interaction-policy';
import type { LayoutPolicy, WorkspaceKind } from '../contract/layout-policy';
import type { RuntimeDiagnosticsSnapshot } from '../contract/runtime-diagnostics';
import type { LayoutTemplate, LayoutTemplateId } from '../contract/layout-template';
import type { ViewportProfile, ViewportProfileId } from '../contract/viewport-profile';
import { createRuntimeViewModel, type RuntimeViewModel } from './runtime-view-model';
import type {
  SelectorConcern,
  SelectorConcernId,
  SelectorTopic,
  SelectorTopicId,
} from '../tool/pattern-selector/selector-navigation';

export type SidebarShellSectionId = 'ui-patterns' | 'design' | 'interaction' | 'runtime-info';

export type SidebarShellTabId = 'live-shell' | 'policy';

export type SidebarShellMobilePaneId = 'explorer' | 'files' | 'output';

export type SidebarShellState = {
  readonly mobilePane: SidebarShellMobilePaneId;
  readonly section: SidebarShellSectionId;
  readonly tab: SidebarShellTabId;
};

export type LayoutGalleryViewModel = {
  readonly bootstrapError: string | null;
  readonly concerns: readonly SelectorConcern[];
  readonly designPolicy: DesignPolicy;
  readonly interactionPolicy: InteractionPolicy;
  readonly rationale: string;
  readonly selectedConcern: SelectorConcern;
  readonly selectedTopic: SelectorTopic;
  readonly selectedTemplate: LayoutTemplate;
  readonly topics: readonly SelectorTopic[];
  readonly templates: readonly LayoutTemplate[];
  readonly runtime: RuntimeViewModel;
  readonly sidebarShell: SidebarShellState;
  readonly selectedViewport: ViewportProfile;
  readonly viewportProfiles: readonly ViewportProfile[];
  readonly workspaceKind: WorkspaceKind;
};

const resolveSelectedTemplate = (selectedTemplateId: LayoutTemplateId): LayoutTemplate =>
  layoutPolicy.availableTemplates.find((template) => template.id === selectedTemplateId) ??
  layoutPolicy.availableTemplates[0]!;

const resolveSelectedTopic = (
  topics: readonly SelectorTopic[],
  selectedTopicId: SelectorTopicId,
): SelectorTopic => topics.find((topic) => topic.id === selectedTopicId) ?? topics[0]!;

let layoutPolicy: LayoutPolicy = {
  availableTemplateIds: [],
  availableTemplates: [],
  defaultTemplateId: 'sidebar-layout',
  rationale: '',
  workspaceKind: 'diagnostics',
};

export const createLayoutGalleryViewModel = (
  nextLayoutPolicy: LayoutPolicy,
  designPolicy: DesignPolicy,
  interactionPolicy: InteractionPolicy,
  snapshot: RuntimeDiagnosticsSnapshot | null,
  concerns: readonly SelectorConcern[],
  selectedConcernId: SelectorConcernId,
  topics: readonly SelectorTopic[],
  selectedTopicId: SelectorTopicId,
  selectedTemplateId: LayoutTemplateId,
  viewportProfiles: readonly ViewportProfile[],
  selectedViewportId: ViewportProfileId,
  sidebarShell: SidebarShellState,
  bootstrapError: string | null = null,
): LayoutGalleryViewModel => {
  const selectedTopic = resolveSelectedTopic(topics, selectedTopicId);

  layoutPolicy = nextLayoutPolicy;

  return {
    bootstrapError,
    concerns,
    designPolicy,
    interactionPolicy,
    rationale: nextLayoutPolicy.rationale,
    selectedConcern: concerns.find((concern) => concern.id === selectedConcernId) ?? concerns[0]!,
    selectedTopic,
    selectedTemplate: resolveSelectedTemplate(selectedTemplateId),
    sidebarShell,
    selectedViewport:
      viewportProfiles.find((profile) => profile.id === selectedViewportId) ?? viewportProfiles[0]!,
    topics,
    templates: nextLayoutPolicy.availableTemplates,
    runtime: createRuntimeViewModel(snapshot, bootstrapError),
    viewportProfiles,
    workspaceKind: nextLayoutPolicy.workspaceKind,
  };
};
