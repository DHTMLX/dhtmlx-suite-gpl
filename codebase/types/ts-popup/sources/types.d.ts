import { VNode } from "../../ts-common/dom";
import { IEventSystem } from "../../ts-common/events";
import { Position } from "../../ts-common/html";
export interface IPopup {
    show(node: HTMLElement, config?: IShowConfig, attach?: any): void;
    hide(): void;
    toVDOM(): void;
    attachHTML(html: string): void;
    attach(node: HTMLElement, config?: IShowConfig, attached?: any): VNode;
    isVisible(): boolean;
    paint(): void;
    destructor(): void;
    getWidget(): any;
    getContainer(): HTMLElement;
}
export interface IPopupConfig {
    css?: string;
    events?: IEventSystem<any>;
}
export declare enum PopupEvents {
    beforeHide = "beforeHide",
    beforeShow = "beforeShow",
    afterHide = "afterHide",
    afterShow = "afterShow",
    click = "click"
}
export interface IShowConfig {
    centering?: boolean;
    auto?: boolean;
    mode?: Position;
    indent?: number | string;
}
export interface IPopupEventHandlersMap {
    [key: string]: (...args: any[]) => any;
    [PopupEvents.click]: (e: Event) => any;
    [PopupEvents.afterHide]: (e: Event) => void;
    [PopupEvents.afterShow]: (node: HTMLElement) => void;
    [PopupEvents.beforeHide]: (fromOuterClick: boolean, e: Event) => void | boolean;
    [PopupEvents.beforeShow]: (node: HTMLElement) => void | boolean;
}
