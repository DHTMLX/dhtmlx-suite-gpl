import { ISeriaConfig, PointData, SvgElement } from "../types";
import ScaleSeria from "./ScaleSeria";
export default class Line extends ScaleSeria {
    paint(width: number, height: number): SvgElement;
    protected _getForm(points: PointData[], config: any, css: string, width: number, height: number): object;
    protected _setDefaults(config: ISeriaConfig): void;
}
