import { IGridConfig, IRendererConfig, IScrollBarWidth, Split } from "../types";
export declare const BORDERS = 2;
export declare function calcScrollBarWidth(config: IGridConfig | IRendererConfig, customScroll?: boolean, sizes?: {
    width: number;
    height: number;
}): IScrollBarWidth;
export declare function getCurrFixedCols(config: IGridConfig, split: Split.left | Split.right): import("../types").ICol[];
