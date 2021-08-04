import { Id } from "../../ts-common/types";
import { IEventSystem } from "../../ts-common/events";
import { DataEvents, IDataEventsHandlersMap, IDataItem, TreeCollection } from "../../ts-data";
export { DataEvents } from "../../ts-data";
export interface IHtmlExtendable {
    html?: string;
}
export interface IState {
    [key: string]: string;
}
export declare type NavigationType = "pointer" | "click";
export interface IGroups {
    [key: string]: {
        active?: Id;
        elements: string[];
    };
}
export declare type ContextMode = "bottom" | "right";
export interface INavbarConfig {
    navigationType?: NavigationType;
    css?: string;
    menuCss?: string;
    data?: any[] | TreeCollection<any>;
}
export interface INavbar {
    data: TreeCollection;
    events: IEventSystem<DataEvents | NavigationBarEvents, IDataEventsHandlersMap & INavbarEventHandlersMap>;
    config: INavbarConfig;
    paint(): void;
    disable(ids: Id | Id[]): void;
    enable(ids: Id | Id[]): void;
    isDisabled(id: Id): boolean;
    show(ids: Id | Id[]): void;
    hide(ids: Id | Id[]): void;
    destructor(): void;
    select(id: Id, unselect: boolean): void;
    unselect(id?: Id): void;
    isSelected(id: Id): boolean;
    getSelected(): Id[];
}
export declare type ItemType = "button" | "imageButton" | "selectButton" | "customButton" | "input" | "separator" | "title" | "spacer" | "menuItem" | "block" | "navItem" | "customHTML" | "customHTMLButton" | "datePicker";
export interface IItem extends IDataItem {
    id?: Id;
    type?: ItemType;
    parent?: Id;
    css?: string | string[];
    hidden?: boolean;
    disabled?: boolean;
}
export declare type IMenuElement = ISpacer | ISeparator | INavItem | IMenuItem | ICustomHTML;
export interface IMenuItem extends IItem, IHtmlExtendable {
    type?: "menuItem";
    $openIcon?: string;
    icon?: string;
    items?: IMenuElement[];
    hotkey?: string;
    count?: number | string;
    countColor?: "danger" | "secondary" | "primary" | "success";
    value?: string;
}
export interface IPopup {
    data: any[];
    mode: "bottom" | "other";
    position: any;
    width: number;
    height: number;
}
export interface INavItem extends IItem, IHtmlExtendable {
    type: "navItem";
    twoState?: boolean;
    group?: string;
    $openIcon?: string;
    icon?: string;
    items?: IMenuElement[];
    value?: string;
    hotkey?: string;
    active?: boolean;
    count?: number | string;
    countColor?: "danger" | "secondary" | "primary" | "success";
}
export interface ICustomHTML extends IItem, IHtmlExtendable {
    type: "customHTML";
}
export interface ITitle extends IItem, IHtmlExtendable {
    type: "title";
    value?: string;
    tooltip?: string;
}
export interface ISpacer extends IItem {
    type: "spacer";
}
export interface ISeparator extends IItem {
    type: "separator";
}
export interface IButton extends IItem, IHtmlExtendable {
    type: "button";
    css?: string;
    hotkey?: string;
    tooltip?: string;
    count?: number;
    countColor?: "danger" | "secondary" | "primary" | "success";
    items?: IMenuElement[];
    group?: string;
    twoState?: boolean;
    active?: boolean;
    multiClick?: boolean;
    icon?: string;
    view?: "flat" | "link";
    size?: "small" | "medium" | string;
    color?: "danger" | "secondary" | "primary" | "success";
    full?: boolean;
    circle?: boolean;
    loading?: boolean;
    value?: string;
}
export interface IInput extends IItem {
    type: "input";
    icon?: string;
    placeholder?: string;
    width?: string;
    label?: string;
    value?: string;
}
export interface IImageButton extends IItem {
    type: "imageButton";
    src: string;
    twoState?: boolean;
    active?: boolean;
    hotkey?: string;
    group?: string;
    count?: number | string;
    countColor?: "danger" | "secondary" | "primary" | "success";
}
export interface ISelectButton extends IItem {
    type: "selectButton";
    $openIcon?: string;
    icon?: string;
    items?: IMenuElement[];
    count?: number | string;
    countColor?: "danger" | "secondary" | "primary" | "success";
    value?: string;
}
export interface ICustomHTMLButton extends IItem {
    type: "customHTMLButton";
    twoState?: boolean;
    active?: boolean;
    value?: string;
    count?: number;
    countColor?: "danger" | "secondary" | "primary" | "success";
}
export interface IBlock extends IItem {
    type: "block";
    title?: string;
    direction?: "row" | "col";
    css?: "string";
}
export interface IDatePicker extends IItem {
    type: "datePicker";
    icon?: string;
    placeholder?: string;
    width?: string;
    label?: string;
    value?: string | Date;
    dateFormat?: string;
}
export declare enum NavigationBarEvents {
    inputCreated = "inputCreated",
    click = "click",
    openMenu = "openMenu",
    beforeHide = "beforeHide",
    afterHide = "afterHide",
    inputFocus = "inputFocus",
    inputBlur = "inputBlur",
    inputChange = "inputChange"
}
export interface INavbarEventHandlersMap {
    [key: string]: (...args: any[]) => any;
    [NavigationBarEvents.inputCreated]: (id: Id, input: HTMLInputElement) => void;
    [NavigationBarEvents.openMenu]: (id: Id) => void;
    [NavigationBarEvents.click]: (id: Id, events: Event) => void;
    [NavigationBarEvents.beforeHide]: (id: Id, events: Event) => void | boolean;
    [NavigationBarEvents.afterHide]: (events: Event) => void;
    [NavigationBarEvents.inputBlur]: (id: Id) => void;
    [NavigationBarEvents.inputFocus]: (id: Id) => void;
    [NavigationBarEvents.inputChange]: (id: Id, newValue: string) => void;
}
