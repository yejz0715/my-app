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

export type pathType = {
    id: string;
    component: (props?: any) => JSX.Element;
    props?: { [id: string]: any };
};

export type sidebarProps = {
    contents: chapterType[];
};

export type selectDataType = {
    data: { [id: string]: any };
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
