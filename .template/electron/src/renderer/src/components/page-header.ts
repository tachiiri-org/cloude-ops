type PageHeaderModel = {
  readonly eyebrow: string;
  readonly summary: string;
  readonly title: string;
};

export const renderPageHeader = (model: PageHeaderModel): string => `
  <header class="hero">
    <p class="eyebrow">${model.eyebrow}</p>
    <h1>${model.title}</h1>
    <p class="summary">${model.summary}</p>
  </header>
`;
