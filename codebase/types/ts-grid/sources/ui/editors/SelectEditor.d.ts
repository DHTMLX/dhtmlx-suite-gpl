import { ICol, IRendererConfig, IEditor, IRow } from "../../types";
export declare class SelectEditor implements IEditor {
    protected _handlers: {
        [key: string]: (...args: any[]) => void;
    };
    protected _cell: {
        row: IRow;
        col: ICol;
    };
    protected _config: IRendererConfig;
    protected _input: HTMLSelectElement;
    constructor(row: any, col: ICol, config: IRendererConfig);
    endEdit(withoutSave?: boolean): void;
    toHTML(): any;
    protected _initHandlers(): void;
}
