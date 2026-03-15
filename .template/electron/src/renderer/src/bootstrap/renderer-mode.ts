export type RendererMode = 'app' | 'selector';

export const resolveRendererMode = (search: string): RendererMode => {
  const params = new URLSearchParams(search);

  return params.get('mode') === 'selector' ? 'selector' : 'app';
};
