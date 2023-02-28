import { IEventSystem } from "../../ts-common/events";
import { View } from "../../ts-common/view";
import { DataCollection, DataEvents, TreeCollection } from "../../ts-data";
import { ChartEvents, IChart, IChartConfig, IChartSeries, IComposeLayer, IScaleConfig, IScales, ISeria } from "./types";
import { Exporter } from "./Export";
export declare class Chart extends View implements IChart {
    data: DataCollection | TreeCollection;
    events: IEventSystem<DataEvents | ChartEvents>;
    config: IChartConfig;
    export: Exporter;
    protected _layers: IComposeLayer;
    protected _series: IChartSeries;
    protected _scales: IScales;
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
    protected _setScale(config: IScaleConfig, position: string): void;
    protected _detectScaleType(config: any, key: any): any;
    private _initEvents;
}
