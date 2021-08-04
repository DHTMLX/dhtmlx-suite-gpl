import { ISpacer, ISeparator, IMenuItem, NavigationBarEvents, DataEvents, INavbar, INavbarEventHandlersMap, ITitle, ICustomHTML, INavItem } from "../../ts-navbar";
import { IEventSystem } from "../../ts-common/events";
import { IDataEventsHandlersMap, TreeCollection } from "../../ts-data";
import { ScrollView } from "../../ts-common/ScrollView";
export interface ISidebarConfig {
    css?: string;
    menuCss?: string;
    data?: any[] | TreeCollection<ISidebarElement>;
    width?: number | string;
    minWidth?: number | string;
    collapsed?: boolean;
}
export declare type ISidebarElement = ISeparator | ISpacer | ITitle | INavItem | IMenuItem | ICustomHTML;
export interface ISidebar extends INavbar {
    config: ISidebarConfig;
    events: IEventSystem<DataEvents | NavigationBarEvents, IDataEventsHandlersMap & INavbarEventHandlersMap & SidebarEvents & ISidebarEventHandlersMap>;
    toggle(): void;
    isCollapsed(): boolean;
    expand(): void;
    collapse(): void;
}
export interface IProSidebar extends ISidebar {
    scrollView: ScrollView;
}
export declare enum SidebarEvents {
    beforeCollapse = "beforeCollapse",
    afterCollapse = "afterCollapse",
    beforeExpand = "beforeExpand",
    afterExpand = "afterExpand",
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    toggle = "toggle"
}
export interface ISidebarEventHandlersMap {
    [key: string]: (...args: any[]) => any;
    [SidebarEvents.beforeCollapse]: () => boolean | void;
    [SidebarEvents.afterCollapse]: () => void;
    [SidebarEvents.beforeExpand]: () => boolean | void;
    [SidebarEvents.afterExpand]: () => void;
    [SidebarEvents.toggle]: () => any;
}
