import { IViewFn, IViewConstructor } from "../../ts-layout";
import { IView } from "../../ts-common/view";
import { Toolbar } from "../../ts-toolbar";
import { EventSystem } from "../../ts-common/events";
export interface IWindowConfig {
    css?: string;
    title?: string;
    html?: string;
    minWidth?: number;
    minHeight?: number;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    footer?: boolean;
    header?: boolean;
    viewportOverflow?: boolean;
    resizable?: boolean;
    movable?: boolean;
    modal?: boolean;
    closable?: boolean;
    node?: any;
}
export interface IPosition {
    left: number;
    top: number;
}
export interface ISize {
    width: number;
    height: number;
}
export interface IState extends ISize, IPosition {
}
export interface IWindow {
    config: IWindowConfig;
    events: EventSystem<WindowEvents, IWindowEventHandlersMap>;
    header: Toolbar;
    footer: Toolbar;
    setSize(width: number, height: number): void;
    getSize(): ISize;
    setPosition(left: number, top: number): void;
    getPosition(): IPosition;
    getWidget(): any;
    getContainer(): HTMLElement;
    show(left?: number, top?: number): void;
    hide(): void;
    isVisible(): boolean;
    attach(name: string | IViewFn | IView | IViewConstructor | any, config?: any): void;
    attachHTML(html: string): void;
    destructor(): void;
    paint(): void;
    isFullScreen(): boolean;
    setFullScreen(): void;
    unsetFullScreen(): void;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    fullScreen(): void;
}
export interface IDirectionConfig {
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
}
export declare enum WindowEvents {
    resize = "resize",
    headerDoubleClick = "headerdoubleclick",
    move = "move",
    afterShow = "aftershow",
    afterHide = "afterhide",
    beforeShow = "beforeshow",
    beforeHide = "beforehide"
}
export interface IWindowEventHandlersMap {
    [key: string]: (...args: any[]) => any;
    [WindowEvents.resize]: (state: (ISize & IPosition) | ISize | IPosition, oldState: (ISize & IPosition) | ISize | IPosition, editettypes: IDirectionConfig) => void;
    [WindowEvents.headerDoubleClick]: (e: Event) => void;
    [WindowEvents.move]: (position: IPosition, oldPosition: IPosition, side: IDirectionConfig) => void;
    [WindowEvents.afterHide]: (position: IPosition, e?: Event) => void;
    [WindowEvents.afterShow]: (position: IPosition) => void;
    [WindowEvents.beforeHide]: (position: IPosition, e?: Event) => boolean | void;
    [WindowEvents.beforeShow]: (position: IPosition) => boolean | void;
}
