import { VNode } from "../../../ts-common/dom";
import { IItem } from "../types";
export declare function getCount(item: any, widgetClass: any, isLimited: any): any;
export declare function isToggleItem(item: any): boolean;
/** The position a toggle item is in, as the string an ARIA state attribute takes. */
export declare function getToggleState(item: any): "true" | "false";
/** The accessible name of a button: its text, else its tooltip, else the fallback, then its count. */
export declare function getButtonLabel(item: any, fallback?: unknown): string | undefined;
export declare function getIcon(iconName: string, type: any): any;
export declare function navbarComponentMixin(widgetName: string, item: IItem, asMenuItem: boolean, body: VNode): VNode;
export declare function getNavbarButtonCSS({ color, size, view, full, icon, circle, loading, value, active, count }: {
    color: any;
    size: any;
    view: any;
    full: any;
    icon: any;
    circle: any;
    loading: any;
    value: any;
    active: any;
    count: any;
}, widgetName: any): string;
