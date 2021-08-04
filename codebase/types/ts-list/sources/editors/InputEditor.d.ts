import { IListConfig, IListItem } from "../types";
import { List } from "../List";
export declare class InputEditor {
    protected _handlers: {
        [key: string]: (...args: any[]) => void;
    };
    protected _mode: boolean;
    protected _config: IListConfig;
    protected _list: List;
    protected _item: IListItem;
    protected _input: HTMLInputElement;
    constructor(item: any, list: List);
    endEdit(): void;
    toHTML(): any;
    protected _initHandlers(): void;
}
