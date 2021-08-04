import { IScaleConfig, ITextScale, SvgElement } from "../types";
import { Scale } from "./Scale";
import { IFitPosition } from "../../../ts-common/html";
export declare class TextScale extends Scale implements ITextScale {
    scaleReady(sizes: IFitPosition): void;
    point(value: any): number;
    paint(width: number, height: number): SvgElement;
    scaleGrid(): object;
    protected _setDefaults(config: IScaleConfig): void;
    private _getAxisPoint;
}
