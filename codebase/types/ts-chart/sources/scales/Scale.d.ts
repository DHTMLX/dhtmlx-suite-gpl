import { DataCollection } from "../../../ts-data";
import { IAxisLike, ILikeSeria, IScale, IScaleConfig, Locator, ScaleType, SvgElement } from "../types";
export declare class Scale implements IScale {
    protected _data: DataCollection;
    locator: Locator;
    protected _isXDirection: boolean;
    protected config: IScaleConfig;
    protected _axis: IAxisLike<any>;
    protected _position: ScaleType;
    protected _padding: boolean;
    protected _charts: ILikeSeria[];
    constructor(_data: DataCollection, config: IScaleConfig, position: ScaleType);
    addPadding(): void;
    getSize(): number;
    scaleReady(sizes: any): void;
    point(pos: number): number;
    add(val: ILikeSeria): void;
    paint(width: number, height: number): SvgElement;
    scaleGrid(): object;
    protected _setDefaults(config: IScaleConfig): void;
    private _logPoint;
}
