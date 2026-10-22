import { IEventSystem } from "../../ts-common/events";
import { View } from "../../ts-common/view";
import { DataCollection, DataEvents, TreeCollection } from "../../ts-data";
import { ChartEvents, IChart, IChartConfig, IChartSeries, IComposeLayer, ILegendConfig, IScaleConfig, IScales, ISeria, ScaleType, SeriaConfig, TChartType } from "./types";
import { Exporter } from "./Export";
type ScaleConfigs = {
    [position: string]: IScaleConfig;
};
export declare class Chart extends View implements IChart {
    data: DataCollection | TreeCollection;
    events: IEventSystem<DataEvents | ChartEvents>;
    config: IChartConfig;
    export: Exporter;
    protected _layers: IComposeLayer;
    protected _series: IChartSeries;
    protected _scales: IScales;
    protected _primaryScales: {
        x?: ScaleType;
        y?: ScaleType;
    };
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
    protected _isProOnlyType(type: TChartType): boolean;
    protected _seriaType(cfg: SeriaConfig): TChartType;
    /**
     * Positions of the scales a series is drawn against: the argument axis and the value axis.
     * The value axis is chosen by the type of the series, not by the direction of the scale -
     * BarX remaps the positions on its own, see BarX.addScale.
     */
    protected _resolveSeriaScales(cfg: SeriaConfig, type: TChartType): ScaleType[];
    protected _valueAxis(type: TChartType, scales: ScaleType[]): ScaleType;
    protected _prepareSeriaConfig(cfg: SeriaConfig, index: number): SeriaConfig;
    protected _prepareLegendConfig(cfg: ILegendConfig): ILegendConfig;
    protected _setScale(config: IScaleConfig, position: string): void;
    /**
     * Binds the scale to the one it takes the number of ticks from, so that the grids match.
     * Both of them have to be linear: the ticks of a logarithmic axis are not evenly spaced,
     * so an equal number of them would still land at different offsets.
     */
    protected _alignScale(configs: ScaleConfigs, position: ScaleType): void;
    protected _detectScaleType(config: any, key: any): any;
    private _initEvents;
}
export {};
