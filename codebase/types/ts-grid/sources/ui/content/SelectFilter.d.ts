import { IEventSystem } from "../../../../ts-common/events";
import { IBaseHandlersMap, IHeaderFilter, HeaderFilterEvent, ICol, IRendererConfig } from "../../types";
export declare class SelectFilter implements IHeaderFilter {
    column: ICol;
    config: IRendererConfig;
    data: any[];
    value: string;
    events: IEventSystem<HeaderFilterEvent>;
    private _filter;
    private _isFocused;
    protected _handlers: IBaseHandlersMap;
    constructor(column: any, config: any, uniqueData: any, value: any);
    protected initHandlers(): void;
    protected initFilter(): void;
    getFilter(): HTMLElement;
    setValue(value: string, silent?: boolean): void;
    clear(silent?: boolean): void;
    focus(): void;
    blur(): void;
}
