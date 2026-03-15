import interactionPolicyDocument from '../../../../ui/interaction-policy.json';

import type { InteractionPolicy } from '../contracts/interaction-policy';

const parseLayoutSelection = (value: string): InteractionPolicy['layoutSelection'] =>
  value === 'fixed' ? 'fixed' : 'gallery';

const parsePanelBehavior = (value: string): InteractionPolicy['panelBehavior'] =>
  value === 'resizable' ? 'resizable' : 'fixed';

const parsePersistence = (value: string): InteractionPolicy['persistence'] => {
  if (value === 'local-file' || value === 'cloud-bff') {
    return value;
  }

  return 'local-export';
};

const parseSelectionFlow = (value: string): InteractionPolicy['selectionFlow'] =>
  value === 'direct-apply' ? 'direct-apply' : 'preview-first';

export const getInteractionPolicy = (): InteractionPolicy => ({
  layoutSelection: parseLayoutSelection(interactionPolicyDocument.layoutSelection),
  panelBehavior: parsePanelBehavior(interactionPolicyDocument.panelBehavior),
  persistence: parsePersistence(interactionPolicyDocument.persistence),
  selectionFlow: parseSelectionFlow(interactionPolicyDocument.selectionFlow),
});
