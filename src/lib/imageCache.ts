export interface ImageCache {
  images: (HTMLImageElement | null)[];
  bitmaps: (ImageBitmap | null)[];
}

const FRAME_COUNT = 48;

if (!(window as any).__lucaImageCache) {
  (window as any).__lucaImageCache = {
    images: Array(FRAME_COUNT).fill(null),
    bitmaps: Array(FRAME_COUNT).fill(null),
  };
}

export const imageCache: ImageCache = (window as any).__lucaImageCache;
