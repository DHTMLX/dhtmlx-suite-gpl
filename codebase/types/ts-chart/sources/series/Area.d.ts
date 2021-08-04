import { ISeriaConfig, PointData, SvgElement } from "../types";
import ScaleSeria from "./ScaleSeria";
export default class Area extends ScaleSeria {
    paint(width: number, height: number, prev?: PointData[]): SvgElement;
    paintformAndMarkers(width: number, height: number, prev?: PointData[]): [SvgElement, SvgElement];
    protected _markers(svg: any[]): void;
    protected _form(width: number, height: number, svg: any[], prev: PointData[]): object;
    protected _setDefaults(config: ISeriaConfig): void;
}
