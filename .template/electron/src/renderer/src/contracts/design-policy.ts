export type DesignDensity = 'comfortable' | 'compact';
export type DesignTone = 'diagnostic' | 'editorial' | 'workspace' | 'conversational';
export type DesignContrast = 'high' | 'balanced';
export type DesignMotion = 'subtle' | 'minimal';

export type DesignPolicy = {
  readonly contrast: DesignContrast;
  readonly density: DesignDensity;
  readonly motion: DesignMotion;
  readonly tone: DesignTone;
};
