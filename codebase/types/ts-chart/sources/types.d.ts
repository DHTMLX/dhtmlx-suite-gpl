import { IEventSystem } from "../../ts-common/events";
import { DataCollection, DataEvents, IDataEventsHandlersMap } from "../../ts-data";
import { IFitPosition } from "../../ts-common/html";
export interface IChart {
    events: IEventSystem<DataEvents | ChartEvents, IDataEventsHandlersMap & IChartEventHandlersMap>;
    data: DataCollection;
    eachSeries(handler: (seria: ISeria) => any): any[];
    setConfig(config: IChartConfig): void;
    paint(): void;
    getSeries(id: string): ISeria;
}
export interface IChartConfig {
    type?: TChartType;
    css?: string;
    barWidth?: number;
    scales?: IScalesConfig;
    legend?: ILegendConfig;
    series?: SeriaConfig[];
    maxPoints?: number;
    data?: DataCollection<any> | any[];
    exportStyles?: boolean | string[];
}
export declare type TChartType = "bar" | "line" | "spline" | "scatter" | "area" | "donut" | "pie" | "pie3D" | "radar" | "xbar" | "splineArea" | "treeMap" | "calendarHeatMap";
export declare enum ChartEvents {
    toggleSeries = "toggleSeries",
    chartMouseMove = "chartMouseMove",
    chartMouseLeave = "chartMouseLeave",
    resize = "resize",
    serieClick = "serieClick",
    seriaMouseMove = "seriaMouseMove",
    seriaMouseLeave = "seriaMouseLeave"
}
export interface IChartEventHandlersMap {
    [key: string]: (...args: any[]) => any;
    [ChartEvents.toggleSeries]: (id: string, pieLike: object | undefined) => void;
    [ChartEvents.chartMouseMove]: (x: number, y: number, left: number, top: number) => void;
    [ChartEvents.chartMouseLeave]: () => void;
    [ChartEvents.resize]: (width: number, height: number) => void;
    [ChartEvents.serieClick]: (id: string, value: string) => void;
    [ChartEvents.seriaMouseMove]: (id: string, value: string, e: MouseEvent) => void;
    [ChartEvents.seriaMouseLeave]: (id: string, value: string) => void;
}
export interface IChartSeries {
    [id: string]: ISeria;
}
export interface ISeria extends ILikeSeria {
    id: string;
    config: ISeriaConfig;
    toggle(id?: string): void;
    addScale(type: ScaleType, scale: IScale): void;
    getPoints(): PointData[];
    getTooltipText(id: string): string;
    getTooltipType(id: string, x?: number, y?: number): TooltipType;
    getClosest(x: number, y: number): [number, number, number, string];
    getClosestVertical(x: number): [number, number, number, string, number];
}
export declare type TreeDirectionType = "asc" | "desc";
export interface ISeriaConfig {
    id?: string;
    type?: TChartType;
    value?: string;
    valueY?: string;
    label?: ((item: ISeriaConfig) => string) | string;
    pointType?: PointType;
    legendType?: LegendType;
    scales?: ScaleType[];
    active?: boolean;
    pointColor?: string;
    dashed?: boolean;
    stroke?: string;
    strokeWidth?: number;
    barWidth?: number;
    css?: string;
    fill?: string;
    color?: string;
    alpha?: number;
    gradient?: Gradient;
    showText?: boolean;
    showTextRotate?: number | string;
    showTextTemplate?: (points: any) => string;
    tooltip?: boolean;
    tooltipType?: TooltipType;
    tooltipTemplate?: (points: any[]) => string;
    direction?: TreeDirectionType;
    treeSeries?: ITreeSeries[];
    baseLine?: number;
    stacked?: boolean;
}
export declare type SeriaConfig = ISeriaConfig | INoScaleConfig;
export interface IScale extends IComposable {
    locator?: Locator;
    add(chart: ILikeSeria): void;
    point(item: object | number): number;
    getSize(): number;
    addPadding(): void;
}
export interface IScaleConfig extends IAxisCreatorConfig {
    type?: ScaleType;
    title?: string;
    text?: SmartLocator;
    textTemplate?: <T>(value: T) => string;
    size?: number;
    scalePadding?: number;
    scaleRotate?: number;
    textPadding?: number;
    hidden?: boolean;
    grid?: boolean;
    dashed?: boolean;
    targetLine?: number | string;
    targetValue?: number;
    showText?: boolean;
    locator?: SmartLocator;
}
export declare type ScaleType = "left" | "right" | "top" | "bottom" | "radial";
export interface IScales {
    left?: IScale | ITextScale;
    right?: IScale | ITextScale;
    top?: IScale | ITextScale;
    bottom?: IScale | ITextScale;
    radial?: IScale;
}
export interface IScalesConfig {
    left?: IScaleConfig | boolean;
    right?: IScaleConfig | boolean;
    top?: IScaleConfig | boolean;
    bottom?: IScaleConfig | boolean;
    radial?: IRadialScaleConfig;
}
export interface ILegendConfig {
    values?: {
        id?: SmartLocator;
        text: SmartLocator;
        color: SmartLocator;
        alpha?: SmartLocator;
        positiveColor?: SmartLocator;
        negativeColor?: SmartLocator;
        minValue?: number;
        maxValue?: number;
        value?: string;
        step?: number;
        tick?: number;
        majorTick?: number;
        tickTemplate?: <T>(value: T) => string;
    };
    size?: number;
    form?: Shape;
    type?: LegendType;
    itemPadding?: number;
    halign?: HorizontalPosition;
    valign?: VerticalPosition;
    series?: string[];
    treeSeries?: ITreeSeries[];
    margin?: number;
    direction?: LegendDirection;
    $seriesInfo?: ISeria[];
    $sizes?: LegendSizes;
}
export interface ITreeSeries {
    less?: number | string;
    from?: number | string;
    to?: number | string;
    greater?: number | string;
    color?: string;
    active?: boolean;
    id?: string;
    name?: string;
}
export interface ILegendDrawData {
    id: string;
    alpha: number;
    text: string;
    fill: string;
    active?: boolean;
    color?: string;
    minValue?: number;
    maxValue?: number;
    negativeColor?: string;
    positiveColor?: string;
    step?: number;
    tick?: number;
    majorTick?: number;
    tickTemplate?: <T>(value: T) => string;
}
export interface IComposable {
    paint(width: number, height: number, prev?: PointData[]): object;
    paintformAndMarkers?(width: number, height: number, prev?: PointData[]): [object, object];
    dataReady?(prev?: PointData[]): PointData[];
    scaleReady?(sizes: IFitPosition): void;
    destructor?(): void;
}
export interface IComposeLayer {
    add(obj: any): void;
    clear(): void;
    getSizes(): IFitPosition;
    toVDOM(width: number, height: number): void;
}
export interface IRadarConfig extends ISeriaConfig {
    radius?: number;
    paddings?: number;
    scales: ScaleType[];
}
export interface IRadialScaleConfig extends IScaleConfig {
    value?: string;
    zebra?: boolean;
    showAxis?: boolean;
}
export interface IRadarScaleDrawData {
    scales: string[];
    axis: number[];
    realAxis: number[];
    zebra: boolean;
    attribute: string;
}
export interface ITreeMapConfig extends ISeriaConfig {
    paddings?: number;
    text?: string;
}
export interface ICalendarHeatMapConfig extends ISeriaConfig {
    paddings?: number;
    date?: string;
    dateFormat?: string;
    weekStart?: "saturday" | "sunday" | "monday";
    positiveColor?: SmartLocator;
    negativeColor?: SmartLocator;
    minValue?: number;
    maxValue?: number;
    startDate?: string | Date;
    endDate?: string | Date;
    days?: string[];
    months?: string[];
}
export interface IAxisCreatorConfig {
    max?: number;
    min?: number;
    log?: boolean;
    padding?: number;
    maxTicks?: number;
    type?: string;
}
export interface IAxisScale {
    min: number;
    max: number;
    steps: number[];
}
export interface IAxisCreator {
    config: IAxisCreatorConfig;
    getScale(): IAxisScale;
}
export interface IAxisLike<T> {
    steps: T[];
    max: number;
    min?: number;
}
export interface INoScaleConfig extends ISeriaConfig {
    text?: SmartLocator;
    value?: string;
    useLines?: boolean;
    subType?: NoScaleSubType;
    stroke?: string;
    monochrome?: string;
    paddings?: number;
}
export declare type PointType = "circle" | "rect" | "triangle" | "rhombus" | "simpleRect" | "simpleCircle" | "empty";
export declare type Gradient = (color: string) => any;
export declare type TooltipType = "simple" | "right" | "left" | "top" | "bot";
export declare type SvgElement = any;
export declare type Shape = "rect" | "circle" | "line";
export declare type HorizontalPosition = "left" | "center" | "right";
export declare type VerticalPosition = "top" | "middle" | "bottom";
export declare type LegendDirection = "row" | "column";
export declare type LegendType = "groupName" | "range" | "scale";
export declare type LegendSizes = {
    width: number;
    height: number;
};
export interface ILikeSeria extends IComposable {
    getPoints(): PointData[];
    seriesShift?(size?: number): number;
}
export interface ITextScale extends IScale {
    addPadding(): void;
}
export declare type Locator = (item: any) => any;
export declare type DrawPoint = (x: number, y: number, ref?: string) => any;
export declare type NoScaleSubType = "basic" | "percentOnly" | "valueOnly";
export declare type SmartLocator = Locator | string;
export interface IStacker extends IComposable, ILikeSeria {
    add(seria: ISeria): void;
}
export declare type PointData = [number, number, string, (number | string)?, number?, TreePointData?];
export declare type TreePointData = {
    items: PointData[];
};
export interface IGridRenderConfig {
    targetLine?: number;
    dashed: boolean;
    grid: boolean;
    targetValue?: number;
    hidden?: boolean;
}
