import { IGridConfig, IRendererConfig, IScrollBarWidth, Split } from "../types";
export declare const BORDERS = 2;
export declare function calcScrollBarWidth(config: IGridConfig | IRendererConfig, customScroll?: boolean, sizes?: {
    width: number;
    height: number;
}): IScrollBarWidth;
export declare function getCurrFixedCols(config: IGridConfig, split: Split.left | Split.right): import("../types").ICol[];
/**
 * Number of header rows. `aria-rowindex` is a position within the whole grid,
 * so header rows occupy the first indices and body rows are offset by this.
 */
export declare function getHeaderRowCount(config: IGridConfig | IRendererConfig): number;
/** Number of footer rows; they are the last rows of the grid for `aria-rowcount`. */
export declare function getFooterRowCount(config: IGridConfig | IRendererConfig): number;
export declare function getNormalizeDateObject(item: string | Date, dateFormat: string): Date | null;
