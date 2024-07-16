import { Grid } from "./Grid";
import { IGridConfig, ICol, IRow, IProGrid, IFooter, IHeader } from "./types";
import { IDataCollection, IDataItem } from "../../ts-data";
import { ScrollView } from "../../ts-common/ScrollView";
export declare class ProGrid extends Grid implements IProGrid {
    scrollView: ScrollView;
    constructor(container: HTMLElement | string, config?: IGridConfig);
    protected _createView(): any;
    protected _setEventHandlers(): void;
    protected getNormalizeContentHeight(row: IFooter | IHeader, col: ICol, config: IGridConfig): number;
    protected _prepareData(data: IDataItem[] | IDataCollection): IDataItem[] | IRow[];
    protected _prepareDataFromTo(data: IDataCollection, from: number, to: number): IDataItem[];
    protected _dragStart(event: any): void;
    private _lazyLoad;
    private _getColumnGhost;
    private _dragStartColumn;
}
