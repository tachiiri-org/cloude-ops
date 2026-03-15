type TemplatePreviewCardModel = {
  readonly body: string;
  readonly eyebrow: string;
  readonly title: string;
};

export const renderTemplatePreviewCard = (model: TemplatePreviewCardModel): string => `
  <article class="template-preview-card">
    <p class="template-preview-card__eyebrow">${model.eyebrow}</p>
    <h2 class="template-preview-card__title">${model.title}</h2>
    <div class="template-preview-card__body">
      ${model.body}
    </div>
  </article>
`;
