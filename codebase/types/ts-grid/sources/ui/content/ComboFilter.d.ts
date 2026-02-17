import { ProCombobox } from "../../../../ts-combobox";
import { IEventSystem } from "../../../../ts-common/events";
import { IDataItem } from "../../../../ts-data";
import { ICol, IRendererConfig } from "../../types";
import { HeaderFilterEvent, IComboFilterConfig, IHeaderFilter } from "../content";
export declare class ComboFilter implements IHeaderFilter {
    column: ICol;
    config: IRendererConfig;
    data: string[] | IDataItem[];
    value: string | string[];
    filterConfig: IComboFilterConfig;
    events: IEventSystem<HeaderFilterEvent>;
    private _filter;
    private _grid;
    private _isFocused;
    private _silentMode;
    constructor({ column, config, headerConfig, uniqueData, value, grid }: {
        column: any;
        config: any;
        headerConfig: any;
        uniqueData: any;
        value: any;
        grid: any;
    });
    protected initFilter(): void;
    protected initHandlers(): void;
    getFilter(): ProCombobox;
    setValue(value: string | string[], silent?: boolean): void;
    clear(silent?: boolean): void;
    focus(): void;
    blur(): void;
    destructor(): void;
    private _setData;
    private _checkValue;
}
