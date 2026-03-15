import type { ViewportProfileId } from '../contracts/viewport-profile';

export const renderCommandWorkspace = (viewport: ViewportProfileId): string => `
  <section class="pattern-frame pattern-frame--${viewport}">
    <section class="pattern pattern--command pattern--command-${viewport}">
      <div class="pattern__command-palette">
        <div class="pattern__command-line">
          <span class="command-line__prompt">></span>
          <span class="command-line__value">Open the release dashboard</span>
          <span class="pattern__command-shortcut">enter</span>
        </div>
        <div class="pattern__command-results">
          <button class="pattern__command-result is-active">
            <span>Release Dashboard</span>
            <span>Workspace</span>
          </button>
          <button class="pattern__command-result">
            <span>Update Diagnostics</span>
            <span>Runtime</span>
          </button>
          <button class="pattern__command-result">
            <span>Export UI Policy</span>
            <span>Action</span>
          </button>
        </div>
      </div>
      ${
        viewport === 'mobile'
          ? ''
          : '<aside class="pattern__command-detail">Command results and follow-up actions remain visible beside the palette.</aside>'
      }
    </section>
  </section>
`;
