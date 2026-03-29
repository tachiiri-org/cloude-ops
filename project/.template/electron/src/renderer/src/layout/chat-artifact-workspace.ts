import type { ViewportProfileId } from '../contract/viewport-profile';

export const renderChatArtifactWorkspace = (viewport: ViewportProfileId): string => `
  <section class="pattern-frame pattern-frame--${viewport}">
    <section class="pattern pattern--chat pattern--chat-${viewport}">
      <div class="pattern__chat-pane">
        <div class="pattern__message">
          <span class="pattern__message-role">User</span>
          <p>Adjust the desktop shell and keep export behavior intact.</p>
        </div>
        <div class="pattern__message">
          <span class="pattern__message-role">Assistant</span>
          <p>I rewired the selector and captured a new smoke screenshot.</p>
        </div>
      </div>
      <div class="pattern__artifact-pane">
        <div class="pattern__artifact-header">
          <span class="pattern__section-title">Artifact</span>
          <span>ui-policy.json</span>
        </div>
        <pre class="pattern__artifact-code">{
  "defaultTemplateId": "explorer-detail",
  "workspaceKind": "diagnostics"
}</pre>
      </div>
    </section>
  </section>
`;
