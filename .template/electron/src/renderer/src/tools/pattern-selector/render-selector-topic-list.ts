import type { SelectorTopic, SelectorTopicId } from './selector-navigation';

export const renderSelectorTopicList = (
  concernPicker: string,
  topics: readonly SelectorTopic[],
  selectedTopicId: SelectorTopicId,
): string => `
  <aside class="selector-explorer">
    <div class="selector-explorer__header">
      ${concernPicker}
    </div>
    <ul class="selector-explorer__list">
      ${topics
        .map(
          (topic) => `
            <li>
              <button
                type="button"
                class="selector-explorer__button${topic.id === selectedTopicId ? ' is-active' : ''}"
                data-selector-topic="${topic.id}"
              >
                <span class="selector-explorer__label">${topic.label}</span>
                ${
                  topic.referenceExample
                    ? `<span class="selector-explorer__reference">${topic.referenceExample}</span>`
                    : ''
                }
              </button>
            </li>
          `,
        )
        .join('')}
    </ul>
  </aside>
`;
