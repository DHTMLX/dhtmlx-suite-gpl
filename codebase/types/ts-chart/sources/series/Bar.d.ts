import { IScale, ISeriaConfig, PointData, ScaleType, SvgElement, TooltipType } from "../types";
import ScaleSeria from "./ScaleSeria";
export default class Bar extends ScaleSeria {
    protected _shift: number;
    protected _baseLinePosition: number;
    addScale(type: ScaleType, scale: IScale): void;
    seriesShift(shift: number): number;
    paint(width: number, height: number, prev?: PointData[]): SvgElement;
    getTooltipType(_id: string, _x?: number, y?: number): TooltipType;
    protected _getClosestDist(x: any, y: any, px: any, py: any): number;
    protected _path(item: any, prev: any): string;
    protected _base(height: any): number;
    protected _text(item: any, prev: any, rotate: any): {
        x: any;
        y: number;
        class: string;
        transform: string;
    };
    protected _getForm(points: PointData[], css: string, _width: number, height: number, prev: PointData[]): object;
    protected _getText(item: any): any;
    protected _setDefaults(config: ISeriaConfig): void;
}
