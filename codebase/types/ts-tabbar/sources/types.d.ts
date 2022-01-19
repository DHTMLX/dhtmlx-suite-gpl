import { ILayoutConfig, LayoutEvents, ILayoutEventHandlersMap, ICellConfig, ICell } from "../../ts-layout";
import { EventSystem } from "../../ts-common/events";
import { Position } from "../../ts-common/html";
export interface ITabbarConfig extends ILayoutConfig {
    mode?: Position;
    noContent?: boolean;
    css?: string;
    disabled?: string | string[];
    closable?: boolean | string[];
    activeTab?: string;
    tabAutoWidth?: boolean;
    tabAutoHeight?: boolean;
    tabWidth?: number | string;
    tabHeight?: number | string;
    tabAlign?: "left" | "start" | "center" | "middle" | "right" | "end";
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    closeButtons?: boolean;
}
export interface ITab extends ICell {
    config: ITabConfig;
}
export interface ITabConfig extends ICellConfig {
    tabAutoWidth?: boolean;
    tabAutoHeight?: boolean;
    tabWidth?: number | string;
    tabHeight?: number | string;
}
export declare enum TabbarEvents {
    beforeChange = "beforeChange",
    change = "change",
    beforeClose = "beforeClose",
    afterClose = "afterClose",
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    close = "close"
}
export interface ITabbar {
    config: ITabbarConfig;
    events: EventSystem<TabbarEvents | LayoutEvents, ITabbarEventHandlersMap | ILayoutEventHandlersMap>;
    toVDOM(nodes?: any[]): any;
    paint(): void;
    destructor(): void;
    getId(index: number): string;
    getCell(id: string): ICell;
    setActive(id: string): void;
    getWidget(): any;
    getActive(): string;
    removeTab(id: string): void;
    addTab(config: ITabbarConfig, index: number): void;
    disableTab(id: string): boolean;
    enableTab(id: string): void;
    isDisabled(id?: string): boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    removeCell(id: string): void;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    addCell(config: ITabbarConfig, index: number): any;
}
export interface ITabbarEventHandlersMap {
    [key: string]: (...args: any[]) => any;
    [TabbarEvents.beforeChange]: (id: string, prev: string) => boolean | void;
    [TabbarEvents.change]: (id: string, prev: string) => void;
    [TabbarEvents.beforeClose]: (id: string) => boolean | void;
    [TabbarEvents.afterClose]: (id: string) => void;
    [TabbarEvents.close]: (id: string) => any;
}
