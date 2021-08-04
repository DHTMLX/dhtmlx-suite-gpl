import { ICol, IRendererConfig, IRow, IEditor } from "../../types";
export declare class TextAreaEditor implements IEditor {
    protected _handlers: {
        [key: string]: (...args: any[]) => void;
    };
    protected _cell: {
        row: IRow;
        col: ICol;
    };
    protected _config: IRendererConfig;
    protected _editor: HTMLTextAreaElement;
    private _minHeight;
    private _prevHeight;
    private _width;
    constructor(row: IRow, col: ICol, config: IRendererConfig);
    endEdit(withoutSave?: boolean): void;
    toHTML(): any;
    protected _initHandlers(): void;
    private _getCurrentHeight;
    private _getElementHeight;
}
