import { VNode } from "../../../../ts-common/dom";
import { IEventSystem } from "../../../../ts-common/events";
import { IBaseHandlersMap, IHeaderFilter, HeaderFilterEvent, ICol, IRendererConfig } from "../../types";
export declare class SelectFilter implements IHeaderFilter {
    column: ICol;
    config: IRendererConfig;
    data: any[];
    value: string;
    events: IEventSystem<HeaderFilterEvent>;
    private _isFocused;
    protected _handlers: IBaseHandlersMap;
    constructor(column: any, config: any, uniqueData: any, value: any);
    toHTML(): VNode;
    getFilter(): any;
    setValue(value: string, silent?: boolean): void;
    clear(silent?: boolean): void;
    focus(): void;
    blur(): void;
    private initHandlers;
}
