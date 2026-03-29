import type { LayoutTemplateId } from '../../contract/layout-template';

export type SelectorConcernId = 'ui-patterns' | 'design' | 'interaction' | 'runtime-info';

export type SelectorTopicId =
  | LayoutTemplateId
  | 'design-tone'
  | 'design-surfaces'
  | 'interaction-selection'
  | 'interaction-persistence'
  | 'runtime-summary';

export type SelectorTopic = {
  readonly concernId: SelectorConcernId;
  readonly description: string;
  readonly id: SelectorTopicId;
  readonly label: string;
  readonly referenceExample?: string;
};

export type SelectorConcern = {
  readonly description: string;
  readonly id: SelectorConcernId;
  readonly label: string;
};

export const selectorConcerns: readonly SelectorConcern[] = [
  {
    id: 'ui-patterns',
    label: 'UI Pattern',
    description: 'Inspect the sidebar workbench shell adopted by this template.',
  },
  {
    id: 'design',
    label: 'Design',
    description: 'Review the visual policy and baseline tone for the repository.',
  },
  {
    id: 'interaction',
    label: 'Interaction',
    description: 'Review baseline interaction posture before implementation diverges.',
  },
  {
    id: 'runtime-info',
    label: 'Runtime Info',
    description: 'Review runtime and updater metadata as one diagnostic record.',
  },
] as const;

export const selectorTopics: readonly SelectorTopic[] = [
  {
    id: 'sidebar-layout',
    concernId: 'ui-patterns',
    label: 'Sidebar Workbench',
    description: 'Persistent explorer plus runtime-aware workbench detail.',
    referenceExample: 'VS Code, command-centered desktop shells',
  },
  {
    id: 'design-tone',
    concernId: 'design',
    label: 'Tone',
    description: 'Typography, contrast, and overall visual posture.',
  },
  {
    id: 'design-surfaces',
    concernId: 'design',
    label: 'Surfaces',
    description: 'Panel hierarchy, monochrome fill, and active states.',
  },
  {
    id: 'interaction-selection',
    concernId: 'interaction',
    label: 'Selection Flow',
    description: 'How the user moves from choosing to applying.',
  },
  {
    id: 'interaction-persistence',
    concernId: 'interaction',
    label: 'Persistence',
    description: 'Where selected policy is exported or stored.',
  },
  {
    id: 'runtime-summary',
    concernId: 'runtime-info',
    label: 'Version Summary',
    description: 'One record of runtime and updater metadata.',
  },
] as const;

export const defaultSelectorConcernId: SelectorConcernId = 'ui-patterns';
export const defaultSelectorTopicId: SelectorTopicId = 'sidebar-layout';
