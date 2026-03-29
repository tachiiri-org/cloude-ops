import type { UiPolicy } from '../contract/ui-policy';
import { getDesignPolicy } from './design-policy';
import { getInteractionPolicy } from './interaction-policy';
import { getLayoutPolicy } from './layout-policy';

export const getUiPolicy = (): UiPolicy => ({
  designPolicy: getDesignPolicy(),
  interactionPolicy: getInteractionPolicy(),
  layoutPolicy: getLayoutPolicy(),
});
