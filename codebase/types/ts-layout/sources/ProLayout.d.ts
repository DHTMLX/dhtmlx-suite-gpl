import { ILayout, ILayoutConfig, ICell } from "./types";
import { Layout } from "./Layout";
export declare class ProLayout extends Layout implements ILayout {
    constructor(parent: any, config: ILayoutConfig);
    protected _createCell(cell: ILayoutConfig): ICell;
}
