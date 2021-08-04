import { IScale, Locator, PointData, ScaleType } from "../types";
import BaseSeria from "./BaseSeria";
export default class ScaleSeria extends BaseSeria {
    protected _yLocator: Locator;
    protected _xLocator: Locator;
    protected xScale: IScale;
    protected yScale: IScale;
    protected _gradient: any;
    addScale(type: ScaleType, scale: IScale): void;
    paint(width: number, height: number): void;
    dataReady(prev?: PointData[]): PointData[];
    protected _calckFinalPoints(width: number, height: number): void;
    protected _defaultLocator(v: any): any[];
}
