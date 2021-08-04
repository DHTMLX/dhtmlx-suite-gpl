import { IRadialScaleConfig, SvgElement } from "../types";
import { Scale } from "./Scale";
export declare class RadialScale extends Scale {
    config: IRadialScaleConfig;
    constructor(_data: any, config: IRadialScaleConfig);
    paint(width: number, height: number): SvgElement;
    point(val: number): number;
}
