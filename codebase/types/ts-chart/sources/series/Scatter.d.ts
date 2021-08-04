import { IScale, ISeriaConfig, ScaleType } from "../types";
import Line from "./Line";
export default class Scatter extends Line {
    addScale(type: ScaleType, scale: IScale): void;
    protected _setDefaults(config: ISeriaConfig): void;
}
