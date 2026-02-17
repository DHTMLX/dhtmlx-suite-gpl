import { VNode } from "../../../../ts-common/dom";
import { IEventSystem } from "../../../../ts-common/events";
import { Id } from "../../../../ts-common/types";
import { IBaseHandlersMap, ICol, IRendererConfig } from "../../types";
import { HeaderFilterEvent, IHeaderFilter, IInputFilterConfig } from "../content";
export declare class InputFilter implements IHeaderFilter {
    column: ICol;
    config: IRendererConfig;
    value: string;
    id: Id;
    events: IEventSystem<HeaderFilterEvent>;
    filterConfig: IInputFilterConfig;
    protected _handlers: IBaseHandlersMap;
    protected _inputDelay: any;
    private _isFocused;
    private _grid;
    constructor({ column, config, id, value, headerConfig, grid }: {
        column: any;
        config: any;
        id: any;
        value: any;
        headerConfig: any;
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
