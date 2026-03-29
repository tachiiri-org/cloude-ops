import type { ViewportProfile, ViewportProfileId } from '../contract/viewport-profile';

export const renderViewportSwitcher = (
  profiles: readonly ViewportProfile[],
  selectedProfileId: ViewportProfileId,
): string => `
  <div class="viewport-switcher" role="tablist" aria-label="Preview viewport">
    ${profiles
      .map(
        (profile) => `
          <button
            type="button"
            class="viewport-switcher__button${profile.id === selectedProfileId ? ' is-active' : ''}"
            data-viewport-profile="${profile.id}"
            aria-pressed="${profile.id === selectedProfileId ? 'true' : 'false'}"
          >
            ${profile.label}
          </button>
        `,
      )
      .join('')}
  </div>
`;
