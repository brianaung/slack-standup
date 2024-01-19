/* Taken from SMP Client */

export const pixelToVh = (value: number): string => {
  return `${(value / 1080) * 100}vh`;
};

export const pixelToVw = (value: number): string => {
  return `${(value / 1920) * 100}vw`;
};

export const responsivePixel = (
  pixel: number,
  currentViewPortWidth: number
): number => {
  return (pixel * currentViewPortWidth) / 1920;
};
