import { getDictionary } from '@/get-dictionnary';
import { i18n } from '@/i18n-config';
import { generateImageMetadata } from './icon';
import { MetadataRoute } from 'next';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const appImages = generateImageMetadata().filter((metadata) => metadata.id.startsWith('app-'));
  const dictionnary = await getDictionary(i18n.defaultLocale);
  return {
    name: dictionnary.global.appName,
    short_name: dictionnary.global.appName,
    description: dictionnary.global.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#000',
    theme_color: '#000',
    icons: appImages.map((metadata) => ({
      src: `/icon/${metadata.id}`,
      sizes: `${metadata.size.width}x${metadata.size.height}`,
      type: metadata.contentType,
    })),
  };
}
