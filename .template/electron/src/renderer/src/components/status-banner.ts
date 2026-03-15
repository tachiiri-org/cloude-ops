type StatusBannerModel = {
  readonly bootstrapError: string | null;
  readonly updateMessage: string;
};

export const renderStatusBanner = (model: StatusBannerModel): string => `
  <p class="update-message" id="update-message">${model.updateMessage}</p>
  <p class="bootstrap-error" id="bootstrap-error"${model.bootstrapError ? '' : ' hidden'}>${model.bootstrapError ?? ''}</p>
`;
