export interface ITree {
    title: string;
    key: any;
    expanded?: boolean;
    isLeaf?: boolean;
    children?: ITree[];
}
