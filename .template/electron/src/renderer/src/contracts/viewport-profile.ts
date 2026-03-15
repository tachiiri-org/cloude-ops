export type ViewportProfileId = 'desktop' | 'tablet' | 'mobile';

export type ViewportProfile = {
  readonly height: number;
  readonly id: ViewportProfileId;
  readonly label: string;
  readonly width: number;
};

export const viewportProfiles: readonly ViewportProfile[] = [
  {
    id: 'desktop',
    label: 'Desktop',
    width: 1280,
    height: 820,
  },
  {
    id: 'tablet',
    label: 'Tablet',
    width: 820,
    height: 1180,
  },
  {
    id: 'mobile',
    label: 'Mobile',
    width: 420,
    height: 920,
  },
] as const;

export const defaultViewportProfileId: ViewportProfileId = 'desktop';
