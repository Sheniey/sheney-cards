
export const SITE = {
  baseURL: 'https://cumpleanos.vercel.app',
  keywords: 'fc,feliz cumpleaños,happy birthday,amigos,celebración',
  
  authorPseudonym: 'Sheñey',
  authorFirstName: 'José Daniel',
  authorLastName: 'Ávalos Becerra',
  authorIg: 'https://www.instagram.com/sheyney/',

  favicon: '/favicon.jpg',
  faviconType: 'image/jpeg',

  ogImage: '/og.jpg',
  ogImageAlt: 'Imagen de cumpleaños',
  ogImageType: 'image/jpeg',
  ogType: 'website',

  twitterCard: 'summary_large_image',
  twitterCreator: '@Sheñey',
} as const;

export function getBirthdayURL(name: string): string {
  return `${SITE.baseURL}/birthday/${encodeURIComponent(name)}`;
}

export function getDescription(name: string, message: string): string {
  return `🎂 ¡Feliz cumpleaños, ${name}! De parte de JD con mucho amor y cariño: ${message} 🎉🎂🎈`;
}

export function getFaviconData(): { url: string, type: string } {
  return {
    url: SITE.favicon,
    type: SITE.faviconType,
  };
}

export function getOgImageData(): { url: string, alt: string, type: string } {
  return {
    url: `${SITE.baseURL}${SITE.ogImage}`,
    alt: SITE.ogImageAlt,
    type: SITE.ogImageType,
  };
}

export function getOgDescription(name: string, message: string): string {
  return getDescription(name, message);
}

export function getTwitterImageData(): { url: string, alt: string, type: string } {
  return getOgImageData();
}

export function getTwitterDescription(name: string, message: string): string {
  return getDescription(name, message);
}
