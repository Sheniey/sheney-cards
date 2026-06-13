
export type Song = {
    title: string;
    filename: string;
    alt: string;
    type: string;
};

export type ResponsiveColor = {
    cel: string;
    pc: string;
};

export type Quote = {
    message: string;
    author: string;
};

export type PhotoAsset = {
    title: string;
    url?: string;
    alt: string;
    type: string;
    style: string;
};

export type MafiaStatus = 'alive' | 'dead';

export type MafiaPerson = PhotoAsset & {
    summary: string | null;
    status: MafiaStatus;
    wantedPerson: string | null;
    occupation: string | null;
    age: number | null;
    importance_lvl: number;
    villainColor: string;
};

export type MafiaConfig = {
    mvp: MafiaPerson;
    common: MafiaPerson[];
};

export type SocialLinks = {
    instagram: string | null;
    twitter: string | null;
    facebook: string | null;
    linkedin: string | null;
    github: string | null;
    website: string | null;
};

export type ThemeConfig = {
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
    complementaryColor: string[];
};

export type DecorationConfig = {
    linesColor?: ResponsiveColor | string;
    heartsColor?: ResponsiveColor | string;
    strangeBgColor?: ResponsiveColor | string;
};

export interface PersonBirthdayData {
    id: string;
    seo: {
        title: string;
    };
    profile: {
        name: string;
        firstName: string;
        lastName: string;
        bornDate: string;
    };
    social: SocialLinks;
    content: {
        password: string | null;
        message: string;
        quotes: Quote[];
        phrases: string[];
    };
    appearance: {
        theme: ThemeConfig;
        decorations: DecorationConfig | null;
    };
    media: {
        mainPhoto: PhotoAsset;
        galleryPhotos: PhotoAsset[];
        songs: Song[];
        mafia: MafiaConfig | null;
    };
}
