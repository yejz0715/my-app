export type childType = {
    id: string;
    name: string;
    parentId: string;
};

export type chapterType = {
    id: string;
    name: string;
    children: childType[];
};

export type cardType = {
    name: string;
    imgUrl: string;
    rgb: string;
};

export type colorsType = {
    name: string;
    rgb: string;
};

export type pathType = {
    id: string;
    component: React.FC;
};
