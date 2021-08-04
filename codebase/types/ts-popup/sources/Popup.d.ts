import { VNode } from "../../ts-common/dom";
import { IEventSystem } from "../../ts-common/events";
import { View } from "../../ts-common/view";
import { IPopup, IPopupConfig, IPopupEventHandlersMap, IShowConfig, PopupEvents } from "./types";
export declare class Popup extends View implements IPopup {
    config: IPopupConfig;
    events: IEventSystem<PopupEvents, IPopupEventHandlersMap>;
    private _html;
    private _ui;
    private _popup;
    private _clickEvent;
    private _isActive;
    private _outerClickDestructor;
    private _timeout;
    constructor(config?: IPopupConfig);
    show(node: HTMLElement, config?: IShowConfig, attached?: any): void;
    hide(): void;
    isVisible(): boolean;
    attach(name: any, config?: any): VNode;
    attachHTML(html: string): void;
    getWidget(): any;
    getContainer(): HTMLElement;
    toVDOM(): any;
    destructor(): void;
    private _setPopupSize;
    private _detectOuterClick;
    private _hide;
}
