import { ICol, IRendererConfig, IRow, IEditor, ISpan } from "../../types";
export declare class TextAreaEditor implements IEditor {
    protected _handlers: {
        [key: string]: (...args: any[]) => void;
    };
    protected _cell: {
        row: IRow;
        col: ICol;
    };
    protected _config: IRendererConfig;
    protected _input: HTMLTextAreaElement;
    private type;
    private _minHeight;
    private _prevHeight;
    private _width;
    private _initialValue;
    constructor(row: IRow, col: ICol, config: IRendererConfig, span?: ISpan);
    endEdit(withoutSave?: boolean): void;
    toHTML(value?: string): any;
    protected _initHandlers(): void;
    private _getCurrentHeight;
    private _getElementHeight;
    private _applyValuePattern;
    private _removeValuePattern;
    private _getCellWidth;
    private _updateHeight;
}
