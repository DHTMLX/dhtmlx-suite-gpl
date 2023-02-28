import { IFitPosition } from "../../../ts-common/html";
import { DataCollection } from "../../../ts-data";
import { ICalendarHeatMapConfig, PointData, SvgElement } from "../types";
import BaseSeria from "./BaseSeria";
export default class CalendarHeatMap extends BaseSeria {
    config: ICalendarHeatMapConfig;
    protected _data: DataCollection;
    private _headerHeight;
    private _dateLocator;
    private _valueLocator;
    private _cellSize;
    private _years;
    private _maxValue;
    private _minValue;
    scaleReady(sizes: IFitPosition): IFitPosition;
    dataReady(): PointData[];
    paint(width: number, height: number): SvgElement;
    protected _setDefaults(config: ICalendarHeatMapConfig): void;
    protected _defaultLocator(v: any): any[];
}
