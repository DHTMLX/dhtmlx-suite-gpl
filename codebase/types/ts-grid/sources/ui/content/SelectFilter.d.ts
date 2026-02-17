import { VNode } from "../../../../ts-common/dom";
import { IEventSystem } from "../../../../ts-common/events";
import { IBaseHandlersMap, ICol, IRendererConfig } from "../../types";
import { HeaderFilterEvent, IHeaderFilter } from "../content";
export declare class SelectFilter implements IHeaderFilter {
    column: ICol;
    config: IRendererConfig;
    data: any[];
    value: string;
    events: IEventSystem<HeaderFilterEvent>;
    protected _handlers: IBaseHandlersMap;
    private _isFocused;
    private _grid;
    constructor({ column, config, uniqueData, value, grid }: {
        column: any;
        config: any;
        uniqueData?: any[];
        value: any;
        grid: any;
    });
    toHTML(): VNode;
    getFilter(): any;
    setValue(value: string, silent?: boolean): void;
    clear(silent?: boolean): void;
    focus(): void;
    blur(): void;
    private initHandlers;
}
