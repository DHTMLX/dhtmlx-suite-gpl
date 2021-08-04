import { Grid } from "./Grid";
import { IGridConfig, IProGrid } from "./types";
import { IDataCollection, IDataItem } from "../../ts-data";
import { ScrollView } from "../../ts-common/ScrollView";
export declare class ProGrid extends Grid implements IProGrid {
    scrollView: ScrollView;
    constructor(container: HTMLElement | string, config?: IGridConfig);
    protected _createView(): any;
    protected _setEventHandlers(): void;
    protected _prepareData(data: IDataItem[] | IDataCollection): any;
    protected _prepareDataFromTo(data: IDataCollection, from: number, to: number): IDataItem[];
    private _lazyLoad;
    private _getColumnGhost;
    private _dragStartColumn;
}
