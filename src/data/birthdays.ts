import payload from '@/data/birthdays.json';
import type {
    DecorationConfig,
    MafiaConfig,
    PersonBirthdayData,
    PhotoAsset,
    Quote,
    SocialLinks,
    Song,
    ThemeConfig,
} from '@/types';

type RawBirthdayData = Omit<PersonBirthdayData, 'social' | 'content' | 'appearance' | 'media'> & {
    social?: Partial<SocialLinks>;
    content?: {
        password?: string | null;
        message?: string;
        quotes?: Quote[] | null;
        phrases?: string[] | null;
    };
    appearance?: {
        theme?: Partial<ThemeConfig>;
        decorations?: DecorationConfig | null;
    };
    media?: {
        mainPhoto?: PhotoAsset;
        galleryPhotos?: PhotoAsset[] | null;
        songs?: Song[] | null;
        mafia?: MafiaConfig | null;
    };
};

const defaultSong: Song = {
    title: 'Las Mañanitas',
    filename: 'mannanitas.mp3',
    alt: 'Las Mañanitas cantadas por Vicente Fernández',
    type: 'audio/mpeg',
};

const emptyLinks: SocialLinks = {
    instagram: null,
    twitter: null,
    facebook: null,
    linkedin: null,
    github: null,
    website: null,
};

const defaultTheme: ThemeConfig = {
    backgroundColor: '#050505',
    primaryColor: '#ff4fa3',
    secondaryColor: '#ffffff',
    complementaryColor: ['#ff4fa334', '#ff4fa31f', '#ffffff'],
};

const rawBirthdays = payload as Record<string, RawBirthdayData>;
const MUSIC_PATH_PREFIX = '/music/';

const birthdays: Record<string, PersonBirthdayData> = Object.fromEntries(
    Object.entries(rawBirthdays).map(([entryName, person]) => {
        const normalizedId = person.id ?? entryName.toLowerCase();
        const normalized: PersonBirthdayData = {
            id: normalizedId,
            seo: {
                title: person.seo.title,
            },
            profile: {
                name: person.profile.name,
                firstName: person.profile.firstName,
                lastName: person.profile.lastName,
                bornDate: person.profile.bornDate,
            },
            social: {
                ...emptyLinks,
                ...(person.social ?? {}),
            },
            content: {
                password: person.content?.password ?? null,
                message: person.content?.message ?? '',
                quotes: person.content?.quotes ?? [],
                phrases: person.content?.phrases ?? [],
            },
            appearance: {
                theme: {
                    ...defaultTheme,
                    ...(person.appearance?.theme ?? {}),
                    complementaryColor:
                        person.appearance?.theme?.complementaryColor ??
                        defaultTheme.complementaryColor,
                },
                decorations: person.appearance?.decorations ?? null,
            },
            media: {
                mainPhoto: person.media?.mainPhoto ?? {
                    title: 'front.jpg',
                    alt: person.profile.name,
                    type: 'image/jpeg',
                    style: '',
                },
                galleryPhotos: person.media?.galleryPhotos ?? [],
                songs:
                    person.media?.songs && person.media.songs.length > 0
                        ? person.media.songs
                        : [defaultSong],
                mafia: person.media?.mafia ?? null,
            },
        };

        normalized.media.songs = normalized.media.songs.map((song) => ({
            ...song,
            filename: song.filename.startsWith(MUSIC_PATH_PREFIX)
                ? song.filename.slice(MUSIC_PATH_PREFIX.length)
                : song.filename,
        }));

        return [normalizedId, normalized];
    }),
);

export function getBirthdayNames(): string[] {
    return Object.keys(birthdays);
}

export function getBirthdayDataOrNull(name: string): PersonBirthdayData | null {
    return birthdays[name.toLowerCase()] ?? null;
}

export function getBirthdayData(name: string): PersonBirthdayData {
    const person = getBirthdayDataOrNull(name);

    if (!person) {
        throw new Error(`Birthday not found: ${name}`);
    }

    return person;
}

export function getAllBornDates(): Record<string, string> {
    return Object.fromEntries(
        Object.entries(birthdays).map(([name, person]) => [name, person.profile.bornDate])
    );
}
