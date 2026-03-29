import type { ViewportProfileId } from '../contract/viewport-profile';

export const renderGraphInspectorWorkspace = (viewport: ViewportProfileId): string => `
  <section class="pattern-frame pattern-frame--${viewport}">
    <section class="pattern pattern--graph pattern--graph-${viewport}">
      <div class="pattern__graph-canvas">
        <span class="pattern__graph-node node-a">Gateway</span>
        <span class="pattern__graph-node node-b">BFF</span>
        <span class="pattern__graph-node node-c">Worker</span>
        <span class="pattern__graph-node node-d">Store</span>
      </div>
      <aside class="pattern__inspector">
        <span class="pattern__section-title">Selected Node</span>
        <h3>Gateway</h3>
        <p>Primary ingress for cloud requests and policy hydration.</p>
        <div class="pattern__inspector-list">
          <span>latency 42ms</span>
          <span>errors 0.2%</span>
          <span>owner platform</span>
        </div>
      </aside>
    </section>
  </section>
`;
