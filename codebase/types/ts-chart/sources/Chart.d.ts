import { IEventSystem } from "../../ts-common/events";
import { View } from "../../ts-common/view";
import { DataCollection, DataEvents, TreeCollection } from "../../ts-data";
import { ChartEvents, IChart, IChartConfig, ISeria } from "./types";
export declare class Chart extends View implements IChart {
    data: DataCollection | TreeCollection;
    events: IEventSystem<DataEvents | ChartEvents>;
    config: IChartConfig;
    private _layers;
    private _series;
    private _scales;
    private _tooltip;
    private _globalHTMLHandlers;
    private _width;
    private _height;
    private _left;
    private _top;
    constructor(node: HTMLElement | string, config?: IChartConfig);
    getSeries(key: string): ISeria;
    eachSeries(handler: (serie: ISeria) => any): any[];
    destructor(): void;
    setConfig(config: IChartConfig): void;
    private _setScale;
    private _detectScaleType;
    private _initEvents;
}
