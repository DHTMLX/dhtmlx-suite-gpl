import { EventSystem } from "../../ts-common/events";
import { Layout, LayoutEvents, ILayoutEventHandlersMap } from "../../ts-layout";
import { ITabbarConfig, TabbarEvents, ITabbarEventHandlersMap, ITabbar, ITab } from "./types";
export declare class Tabbar extends Layout implements ITabbar {
    config: ITabbarConfig;
    events: EventSystem<TabbarEvents | LayoutEvents, ITabbarEventHandlersMap | ILayoutEventHandlersMap>;
    private _tabsContainer;
    protected _cells: ITab[];
    private _beforeScrollSize;
    private _afterScrollSize;
    private _keyManager;
    constructor(container: any, config: ITabbarConfig);
    toVDOM(): any;
    destructor(): void;
    getWidget(): any;
    setActive(id: string): void;
    getActive(): string;
    addTab(config: ITabbarConfig, index: number): void;
    removeTab(id: string): void;
    disableTab(id: string): boolean;
    enableTab(id: string): void;
    isDisabled(id?: string): boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    removeCell(id: string): void;
    protected _initHandlers(): void;
    private _isHorizontalMode;
    private _focusTab;
    private _getEnableTabs;
    private _getIndicatorPosition;
    private _drawTabs;
    private _getSizes;
    private _normalizeSize;
    private _getTabAutoWidth;
    private _getTabAutoHeight;
    private _getTabContainer;
    private _initHotkeys;
}
