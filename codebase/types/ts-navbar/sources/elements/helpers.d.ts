import { VNode } from "../../../ts-common/dom";
import { IItem } from "../types";
export declare function getCount(item: any, widgetClass: any, isLimited: any): any;
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
