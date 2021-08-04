import { ICell, ICellConfig, ILayout, ILayoutConfig, LayoutCallback } from "./types";
import { Cell } from "./Cell";
export declare class Layout extends Cell implements ILayout {
    config: ILayoutConfig;
    protected _all: any;
    protected _cells: ICell[];
    protected _root: ILayout;
    private _xLayout;
    private _isViewLayout;
    constructor(parent: any, config: ILayoutConfig);
    destructor(): void;
    toVDOM(): any;
    removeCell(id: string): any;
    addCell(config: ICellConfig, index?: number): void;
    getId(index: number): string;
    getRefs(name: string): any;
    getCell(id: string): any;
    forEach(callback: LayoutCallback, parent?: string, level?: number): void;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    cell(id: string): any;
    protected _getCss(content?: boolean): string;
    private _parseConfig;
    protected _createCell(cell: ILayoutConfig): ICell;
    private _haveCells;
    private _inheritTypes;
}
