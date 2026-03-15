export type LayoutSelectionMode = 'gallery' | 'fixed';
export type PanelBehavior = 'fixed' | 'resizable';
export type PolicyPersistence = 'local-export' | 'local-file' | 'cloud-bff';
export type SelectionFlow = 'preview-first' | 'direct-apply';

export type InteractionPolicy = {
  readonly layoutSelection: LayoutSelectionMode;
  readonly panelBehavior: PanelBehavior;
  readonly persistence: PolicyPersistence;
  readonly selectionFlow: SelectionFlow;
};
