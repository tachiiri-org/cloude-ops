import type { DesignPolicy } from './design-policy';
import type { InteractionPolicy } from './interaction-policy';
import type { LayoutPolicy } from './layout-policy';
import type { LayoutTemplateId } from './layout-template';
import type { ViewportProfile } from './viewport-profile';
import type { RuntimeViewModel } from '../state/runtime-view-model';
import type {
  SidebarShellMobilePaneId,
  SidebarShellSectionId,
  SidebarShellTabId,
} from '../state/layout-gallery-view-model';

export type UiViewId = LayoutTemplateId;

export type UiViewMode = 'app' | 'preview';

export type UiViewNavigationState = {
  readonly mobilePane: SidebarShellMobilePaneId;
  readonly section: SidebarShellSectionId;
  readonly tab: SidebarShellTabId;
};

export type UiViewProps = {
  readonly designPolicy: DesignPolicy;
  readonly interactionPolicy: InteractionPolicy;
  readonly layoutPolicy: LayoutPolicy;
  readonly mode: UiViewMode;
  readonly navigation: UiViewNavigationState;
  readonly runtime: RuntimeViewModel;
  readonly viewport: ViewportProfile;
};

export type UiViewDefinition = {
  readonly description: string;
  readonly id: UiViewId;
  readonly label: string;
  readonly render: (props: UiViewProps) => string;
};
