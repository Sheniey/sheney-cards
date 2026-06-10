import { getMusicURL } from '@/config/media';
import payload from '@/data/birthdays.json';
import type { PersonBirthdayData, Song } from '@/types';

type RawBirthdayData = Omit<PersonBirthdayData, 'links' | 'theme' | 'songList'> & {
    links?: Partial<PersonBirthdayData['links']>;
    theme?: Partial<PersonBirthdayData['theme']>;
    songList?: Song[] | null;
};

const defaultSong: Song = {
    title: 'Las Mañanitas',
    filename: getMusicURL('mañanitas.mp3'),
    alt: 'Las Mañanitas cantadas por Vicente Fernández',
    type: 'audio/mpeg',
};

const emptyLinks: PersonBirthdayData['links'] = {
    instagram: null,
    twitter: null,
    facebook: null,
    linkedin: null,
    github: null,
    website: null,
};

const defaultTheme: PersonBirthdayData['theme'] = {
    backgroundColor: '#050505',
    primaryColor: '#ff4fa3',
    secondaryColor: '#ffffff',
    complementaryColor: ['#ff4fa334', '#ff4fa31f'],
};

const rawBirthdays = payload as Record<string, RawBirthdayData>;

const birthdays: Record<string, PersonBirthdayData> = Object.fromEntries(
    Object.entries(rawBirthdays).map(([name, person]) => {
        const normalized: PersonBirthdayData = {
            ...person,
            links: {
                ...emptyLinks,
                ...(person.links ?? {}),
            },
            quote: person.quote ?? null,
            phrases: person.phrases ?? [],
            theme: {
                ...defaultTheme,
                ...(person.theme ?? {}),
                complementaryColor:
                    person.theme?.complementaryColor ??
                    defaultTheme.complementaryColor,
            },
            songList:
                person.songList && person.songList.length > 0
                    ? person.songList
                    : [defaultSong],
        };

        return [name.toLowerCase(), normalized];
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
        Object.entries(birthdays).map(([name, person]) => [name, person.bornDate])
    );
}
