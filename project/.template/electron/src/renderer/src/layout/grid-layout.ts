import type { ViewportProfileId } from '../contract/viewport-profile';

export const renderGridLayout = (viewport: ViewportProfileId): string => `
  <section class="pattern-frame pattern-frame--${viewport}">
    <section class="pattern pattern--grid pattern--grid-${viewport}">
      <header class="pattern__dashboard-header">
        <div>
          <span class="pattern__section-title">Revenue Overview</span>
          <h3>Analytics Grid</h3>
        </div>
        <div class="pattern__pills">
          <span class="pattern__pill is-active">7d</span>
          <span class="pattern__pill">30d</span>
          <span class="pattern__pill">90d</span>
        </div>
      </header>
      <div class="pattern__grid-cards">
        ${[
          ['MRR', '$124.8k', '+8.2%'],
          ['Conversion', '4.19%', '+0.4%'],
          ['Retention', '91.4%', '+1.1%'],
          ['Incidents', '2', '-3'],
        ]
          .map(
            ([label, value, delta]) => `
              <article class="pattern__metric-card">
                <span>${label}</span>
                <strong>${value}</strong>
                <span>${delta}</span>
              </article>
            `,
          )
          .join('')}
      </div>
      <div class="pattern__grid-panels">
        <section class="pattern__panel pattern__panel--chart"></section>
        <section class="pattern__panel pattern__panel--table"></section>
      </div>
    </section>
  </section>
`;
