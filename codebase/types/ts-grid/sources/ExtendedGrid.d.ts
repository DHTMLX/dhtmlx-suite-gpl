import { IGridConfig, ICol, IRow, IFooter, IHeader, IGroupOrderItem, IExtendedGrid, IExtendedGridConfig } from "./types";
import { IDataCollection, IDataItem } from "../../ts-data";
import { ScrollView } from "../../ts-common/ScrollView";
import { Grid } from "./Grid";
export declare class ExtendedGrid extends Grid implements IExtendedGrid {
    scrollView: ScrollView;
    config: IExtendedGridConfig;
    constructor(container: HTMLElement | string | null, config?: IExtendedGridConfig);
    protected _createView(): any;
    protected _setEventHandlers(): void;
    protected getNormalizeContentHeight(row: IFooter | IHeader, col: ICol, config: IGridConfig): number;
    protected _prepareData(data: IDataItem[] | IDataCollection): IDataItem[] | IRow[];
    protected _prepareDataFromTo(data: IDataCollection, from: number, to: number): IDataItem[];
    protected _dragStart(event: any): void;
    protected _group(order: IGroupOrderItem[]): void;
    private _lazyLoad;
    private _getGhostItem;
    private _dragStartColumn;
    private _dragStartGroupItem;
    private _changeGroupItemAfterSort;
    private _isGroupableColumn;
    private _isGroupClosable;
}
