
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

export interface PersonBirthdayData {
    title: string;
    name: string;
    firstName: string;
    lastName: string;
    bornDate: string;
    nameId: string;
    links: {
        instagram: string | null;
        twitter: string | null;
        facebook: string | null;
        linkedin: string | null;
        github: string | null;
        website: string | null;
    },
    message: string;
    quotes: { message: string; author: string }[] | null;
    phrases: string[] | null;
    theme: {
        backgroundColor: string;
        primaryColor: string;
        secondaryColor: string;
        complementaryColor: string[] | null;
    };
    mainPhoto: {
        title: string;
        alt: string;
        type: string;
        style: string;
    };
    extraPhotos: Record<string, {
        title: string;
        url?: string;
        alt: string;
        type: string;
        style: string;
    }> | null;
    songList: Song[] | null;
    bgDecoration: {
        linesColor?: ResponsiveColor | string;
        heartsColor?: ResponsiveColor | string;
    } | null;
};
