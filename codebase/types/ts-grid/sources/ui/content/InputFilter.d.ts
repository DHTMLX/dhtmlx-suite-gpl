import { IEventSystem } from "../../../../ts-common/events";
import { Id } from "../../../../ts-common/types";
import { IBaseHandlersMap, IHeaderFilter, HeaderFilterEvent, ICol, IRendererConfig } from "../../types";
export declare class InputFilter implements IHeaderFilter {
    column: ICol;
    config: IRendererConfig;
    value: string;
    id: Id;
    events: IEventSystem<HeaderFilterEvent>;
    private _filter;
    private _isFocused;
    protected _handlers: IBaseHandlersMap;
    protected _inputDelay: any;
    constructor(column: any, config: any, id: any, value: any);
    protected initHandlers(): void;
    protected initFilter(): void;
    getFilter(): HTMLElement;
    setValue(value: string, silent?: boolean): void;
    clear(silent?: boolean): void;
    focus(): void;
    blur(): void;
}
