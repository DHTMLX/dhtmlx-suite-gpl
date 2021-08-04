import { IRadarConfig, IScale, PointData, ScaleType, SvgElement } from "../types";
import { IFitPosition } from "../../../ts-common/html";
import BaseSeria from "./BaseSeria";
export default class Radar extends BaseSeria {
    config: IRadarConfig;
    private _scale;
    private _locator;
    addScale(type: ScaleType, scale: IScale): void;
    scaleReady(sizes: IFitPosition): IFitPosition;
    dataReady(prev?: PointData[]): PointData[];
    getTooltipText(id: string): any;
    paint(width: number, height: number): SvgElement;
    protected _calckFinalPoints(width: number, height: number): void;
    protected _defaultLocator(v: any): any;
    protected _setDefaults(config: IRadarConfig): void;
}
