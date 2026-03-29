type ExplorerDetailWorkspaceModel = {
  readonly detail: string;
  readonly explorer: string;
  readonly inspector?: string;
};

export const renderExplorerDetailWorkspace = (model: ExplorerDetailWorkspaceModel): string => `
  <section class="workspace workspace--explorer-detail${model.inspector ? ' workspace--explorer-detail-with-inspector' : ''}">
    ${model.explorer}
    ${model.detail}
    ${model.inspector ?? ''}
  </section>
`;
