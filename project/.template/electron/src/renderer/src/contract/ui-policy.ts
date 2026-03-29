import type { DesignPolicy } from './design-policy';
import type { InteractionPolicy } from './interaction-policy';
import type { LayoutPolicy } from './layout-policy';

export type UiPolicy = {
  readonly designPolicy: DesignPolicy;
  readonly interactionPolicy: InteractionPolicy;
  readonly layoutPolicy: LayoutPolicy;
};
