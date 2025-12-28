import { ImageMetadata, iconFromMeta } from './icon';

// Route segment config
export const runtime = 'edge';

// Image metadata
export function generateImageMetadata(): ImageMetadata[] {
  return [
    {
      contentType: 'image/png',
      size: { width: 57, height: 57 },
      id: 'xsmall',
    },
    {
      contentType: 'image/png',
      size: { width: 60, height: 60 },
      id: 'small',
    },
    {
      contentType: 'image/png',
      size: { width: 72, height: 72 },
      id: 'medium',
    },
    {
      contentType: 'image/png',
      size: { width: 76, height: 76 },
      id: 'large',
    },
    {
      contentType: 'image/png',
      size: { width: 144, height: 144 },
      id: 'xlarge',
    },
    {
      contentType: 'image/png',
      size: { width: 152, height: 152 },
      id: 'xxlarge',
    },
    {
      contentType: 'image/png',
      size: { width: 180, height: 180 },
      id: 'xxxlarge',
    },
  ];
}

// Image generation
export default iconFromMeta(generateImageMetadata());
