
export const MEDIA = {
    photosPath: '/photos',
    musicPath: '/music',
} as const;

export function getPhotoURL(nameId: string, title: string): string {
    return `${MEDIA.photosPath}/${nameId}/${title}`;
}

export function getMusicURL(title: string): string {
    return `${MEDIA.musicPath}/${title}`;
}
