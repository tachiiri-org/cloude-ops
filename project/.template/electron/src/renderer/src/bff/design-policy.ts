import designPolicyDocument from '../../../../ui/design-policy.json';

import type { DesignPolicy } from '../contract/design-policy';

const parseDensity = (value: string): DesignPolicy['density'] =>
  value === 'compact' ? 'compact' : 'comfortable';

const parseTone = (value: string): DesignPolicy['tone'] => {
  if (
    value === 'diagnostic' ||
    value === 'editorial' ||
    value === 'workspace' ||
    value === 'conversational'
  ) {
    return value;
  }

  return 'diagnostic';
};

const parseContrast = (value: string): DesignPolicy['contrast'] =>
  value === 'balanced' ? 'balanced' : 'high';

const parseMotion = (value: string): DesignPolicy['motion'] =>
  value === 'minimal' ? 'minimal' : 'subtle';

export const getDesignPolicy = (): DesignPolicy => ({
  contrast: parseContrast(designPolicyDocument.contrast),
  density: parseDensity(designPolicyDocument.density),
  motion: parseMotion(designPolicyDocument.motion),
  tone: parseTone(designPolicyDocument.tone),
});
