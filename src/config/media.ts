
export const MEDIA = {
    photosPath: '/photos',
    musicPath: '/music',
} as const;

export function getPersonPhotoURL(personId: string, photoName: string): string {
    return `${MEDIA.photosPath}/${personId}/${photoName}`;
}

export function getPhotoURL(nameId: string, title: string): string {
    return getPersonPhotoURL(nameId, title);
}

export function getMusicURL(fileName: string): string {
    return `${MEDIA.musicPath}/${fileName}`;
}
