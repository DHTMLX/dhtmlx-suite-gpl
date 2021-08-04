import { ICol, IRendererConfig, IRow, IEditor } from "../../types";
export declare class CheckboxEditor implements IEditor {
    protected _handlers: {
        [key: string]: (...args: any[]) => void;
    };
    protected _cell: {
        row: IRow;
        col: ICol;
    };
    protected _config: IRendererConfig;
    protected _checkbox: HTMLInputElement;
    protected _input: HTMLInputElement;
    protected _checked: boolean;
    constructor(row: IRow, col: ICol, config: IRendererConfig);
    endEdit(): void;
    toHTML(): any;
    protected _initHandlers(): void;
}
