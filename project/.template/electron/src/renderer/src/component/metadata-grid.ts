type MetadataEntry = {
  readonly id: string;
  readonly label: string;
  readonly value: string;
};

export const renderMetadataGrid = (entries: readonly MetadataEntry[]): string => `
  <dl class="metadata">
    ${entries
      .map(
        (entry) => `
          <div>
            <dt>${entry.label}</dt>
            <dd id="${entry.id}">${entry.value}</dd>
          </div>
        `,
      )
      .join('')}
  </dl>
`;
