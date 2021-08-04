import { IScale, PointData, ScaleType, SvgElement, TooltipType } from "../types";
import Bar from "./Bar";
export default class BarX extends Bar {
    addScale(type: ScaleType, scale: IScale): void;
    paint(width: number, height: number, prev?: PointData[]): SvgElement;
    getTooltipType(id: string, x?: number, y?: number): TooltipType;
    getClosest(x: number, y: number): [number, number, number, string];
    protected _getText(item: any): any;
    protected _getClosestDist(x: any, y: any, px: any, py: any): number;
    protected _path(item: any, prev: any): string;
    protected _base(height: any): number;
    protected _text(item: any, prev: any, rotate: any): {
        x: number;
        y: any;
        class: string;
        transform: string;
    };
}
