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
