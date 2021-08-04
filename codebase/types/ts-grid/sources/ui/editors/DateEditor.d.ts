import { ICol, IRendererConfig, IRow, IEditor } from "../../types";
export declare class DateEditor implements IEditor {
    protected _handlers: {
        [key: string]: (...args: any[]) => void;
    };
    protected _cell: {
        row: IRow;
        col: ICol;
    };
    protected _config: IRendererConfig;
    protected _input: HTMLInputElement;
    private _calendar;
    private _popup;
    private _value;
    constructor(row: IRow, col: ICol, config: IRendererConfig);
    endEdit(withoutSave?: boolean, calendarChange?: boolean): void;
    toHTML(): any;
    protected _initHandlers(): void;
}
