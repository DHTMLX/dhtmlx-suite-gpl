import { INoScaleConfig, Locator, PointData, TooltipType } from "../types";
import { IFitPosition } from "../../../ts-common/html";
import BaseSeria from "./BaseSeria";
export default class NoScaleSeria extends BaseSeria {
    config: INoScaleConfig;
    protected _textLocator: Locator;
    protected _colorLocator: Locator;
    protected _valueLocator: Locator;
    protected _gradient: any;
    protected _center: [number, number];
    protected _tooltipData: Array<[number, number]>;
    private _sum;
    scaleReady(sizes: IFitPosition): IFitPosition;
    dataReady(): PointData[];
    toggle(id?: string): void;
    getClosest(x: number, y: number): [number, number, number, string];
    getTooltipText(id: string): any;
    getTooltipType(_id: string): TooltipType;
    protected _setDefaults(config: INoScaleConfig): void;
    protected _defaultLocator(v: any): any[];
    private _getPercent;
}
