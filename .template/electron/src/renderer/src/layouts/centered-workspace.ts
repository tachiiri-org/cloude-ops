import type { ViewportProfileId } from '../contracts/viewport-profile';

type CenteredWorkspaceModel = {
  readonly details: string;
  readonly header: string;
  readonly status: string;
  readonly viewport: ViewportProfileId;
};

export const renderCenteredWorkspace = (model: CenteredWorkspaceModel): string => `
  <section class="pattern-frame pattern-frame--${model.viewport}">
    <section class="pattern pattern--centered pattern--centered-${model.viewport}">
      <div class="pattern__centered-surface">
        <div class="workspace__lead">
          ${model.header}
        </div>
        <div class="workspace__body workspace__body--stacked">
          ${model.details}
          ${model.status}
        </div>
      </div>
    </section>
  </section>
`;
