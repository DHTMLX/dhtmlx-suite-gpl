import { IFitPosition } from "../../../ts-common/html";
import { IScale, ISeriaConfig, PointData, ScaleType, SvgElement, TooltipType } from "../types";
import ScaleSeria from "./ScaleSeria";
export default class Bar extends ScaleSeria {
    protected _shift: number;
    protected _baseLinePosition: number;
    private _gradients;
    addScale(type: ScaleType, scale: IScale): void;
    seriesShift(shift?: number): number;
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
    protected _getForm(points: PointData[], _width: number, height: number, prev: PointData[]): object;
    paintTotals(labels: string[], stack: PointData[][]): SvgElement;
    getTotalsPadding(_labels: string[]): IFitPosition;
    protected _getText(item: any): any;
    protected _getTotalAnchor(index: number, stack: PointData[][]): [number, number];
    protected _getTotalText([x, y]: [number, number], total: string): SvgElement;
    protected _getTotalTextHeight(): number;
    protected _getFill(id: string): string;
    private _gradientFill;
    private _gradientDefs;
    protected _setDefaults(config: ISeriaConfig): void;
}
