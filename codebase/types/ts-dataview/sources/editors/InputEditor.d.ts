import { IDataViewConfig, IDataViewItem } from "../types";
import { DataView } from "../DataView";
export declare class InputEditor {
    protected _handlers: {
        [key: string]: (...args: any[]) => void;
    };
    protected _mode: boolean;
    protected _config: IDataViewConfig;
    protected _dataView: DataView;
    protected _item: IDataViewItem;
    protected _input: HTMLInputElement;
    constructor(item: IDataViewItem, dataView: DataView);
    endEdit(): void;
    toHTML(isLastItemInRow: boolean): any;
    protected _initHandlers(): void;
}
