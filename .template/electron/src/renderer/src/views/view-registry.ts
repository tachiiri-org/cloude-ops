import type { UiViewDefinition, UiViewId } from '../contracts/ui-view';
import { sidebarWorkbenchView } from './sidebar-workbench';

export const viewRegistry: readonly UiViewDefinition[] = [sidebarWorkbenchView] as const;

export const getViewDefinition = (viewId: UiViewId): UiViewDefinition =>
  viewRegistry.find((view) => view.id === viewId) ?? viewRegistry[0]!;
