export interface ITree {
    title: string;
    key: any;
    expanded?: boolean;
    isLeaf?: boolean;
    children?: ITree[];
}


export interface IMenu {
    title: string;
    key: any;
    expanded?: boolean;
    isLeaf?: boolean;
    icon?: string,
    url?: string,
    order?: number,
    permissionCode?: string,
    isActive: boolean,
    isHomePage: boolean,
    isTab: boolean,
    children?: IMenu[];
}