import { VNode } from "../../../../ts-common/dom";
import { IEventSystem } from "../../../../ts-common/events";
import { Id } from "../../../../ts-common/types";
import { IBaseHandlersMap, IHeaderFilter, HeaderFilterEvent, ICol, IRendererConfig } from "../../types";
export declare class InputFilter implements IHeaderFilter {
    column: ICol;
    config: IRendererConfig;
    value: string;
    id: Id;
    events: IEventSystem<HeaderFilterEvent>;
    protected _handlers: IBaseHandlersMap;
    protected _inputDelay: any;
    private _isFocused;
    constructor(column: any, config: any, id: any, value: any);
    toHTML(): VNode;
    getFilter(): any;
    setValue(value: string, silent?: boolean): void;
    clear(silent?: boolean): void;
    focus(): void;
    blur(): void;
    private initHandlers;
}
