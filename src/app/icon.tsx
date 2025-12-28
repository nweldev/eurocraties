import { ImageResponse } from 'next/server';
import SimpleMap from './[lang]/_components/simple-map';

// Route segment config
export const runtime = 'edge';

export interface ImageMetadata {
  contentType: string;
  size: { width: number; height: number };
  id: string;
}

// Image metadata
export function generateImageMetadata(): ImageMetadata[] {
  return [
    {
      contentType: 'image/png',
      size: { width: 16, height: 16 },
      id: 'small',
    },
    {
      contentType: 'image/png',
      size: { width: 32, height: 32 },
      id: 'medium',
    },
    {
      contentType: 'image/png',
      size: { width: 96, height: 96 },
      id: 'large',
    },
    {
      contentType: 'image/png',
      size: { width: 192, height: 192 },
      id: 'xlarge',
    },
    {
      contentType: 'image/png',
      size: { width: 36, height: 36 },
      id: 'app-xsmall',
    },
    {
      contentType: 'image/png',
      size: { width: 48, height: 48 },
      id: 'app-small',
    },
    {
      contentType: 'image/png',
      size: { width: 72, height: 72 },
      id: 'app-medium',
    },
    {
      contentType: 'image/png',
      size: { width: 96, height: 96 },
      id: 'app-large',
    },
    {
      contentType: 'image/png',
      size: { width: 144, height: 144 },
      id: 'app-xlarge',
    },
    {
      contentType: 'image/png',
      size: { width: 192, height: 192 },
      id: 'app-xxlarge',
    },
  ];
}

export const iconFromMeta = (metadatas: ImageMetadata[]) => {
  return ({ id }: { id: string }) => {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            resize: 'horizontal',
            overflow: 'hidden',
            height: '100%',
            width: '100%',
          }}
        >
          <SimpleMap fill="#a1a1aa" stroke="#000" width="100%" strokeWidth="8" />
        </div>
      ),
      {
        ...metadatas.find((metadata) => metadata.id === id)?.size,
      }
    );
  };
};

// Image generation
export default iconFromMeta(generateImageMetadata());
