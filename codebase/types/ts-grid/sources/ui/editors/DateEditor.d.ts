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
    protected _cleanConfig(col: ICol): {
        date?: string | Date;
        css?: string;
        mark?: (a: Date) => string;
        disabledDates?: (a: Date) => boolean;
        weekStart?: "monday" | "sunday" | "saturday";
        weekNumbers?: boolean;
        mode?: import("../../../../ts-calendar").ViewMode;
        timePicker?: boolean;
        timeFormat?: 12 | 24;
        thisMonthOnly?: boolean;
        width?: string | number;
        $rangeMark?: (a: Date) => string;
        block?: (a: Date) => boolean;
        view?: import("../../../../ts-calendar").ViewMode;
    };
    protected _initHandlers(): void;
}
