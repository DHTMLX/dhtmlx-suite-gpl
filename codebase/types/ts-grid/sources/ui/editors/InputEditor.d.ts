import { ICol, IRendererConfig, IRow, IEditor } from "../../types";
export declare class InputEditor implements IEditor {
    protected _handlers: {
        [key: string]: (...args: any[]) => void;
    };
    protected _cell: {
        row: IRow;
        col: ICol;
    };
    protected _config: IRendererConfig;
    protected _input: HTMLInputElement;
    private prevValue;
    private type;
    constructor(row: IRow, col: ICol, config: IRendererConfig);
    endEdit(withoutSave?: boolean): void;
    toHTML(value?: string | number): any;
    protected _initHandlers(): void;
    private _isValidWord;
    private _isCorrectRange;
    private _applyValuePattern;
    private _removeValuePattern;
}
