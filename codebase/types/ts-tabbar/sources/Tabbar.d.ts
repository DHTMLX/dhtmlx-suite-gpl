import { VNode } from "../../ts-common/dom";
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
    private _tabFontSize;
    private _templatesSettled;
    constructor(container: any, config: ITabbarConfig);
    toVDOM(): VNode;
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
    private _getMeasureWidth;
    /**
     * Resolves the markup of every tab through the `tabTemplate` callback and measures it.
     * The callback is invoked at most once per tab per repaint: while its arguments stay the same
     * (the active tab and the `tab` value), the previously resolved state is reused as is.
     */
    private _prepareTemplates;
    /**
     * Measures the templates on a hidden copy of the tab markup placed inside the widget root,
     * so that the theme and the tab styles are applied to it as to a real tab. The copy carries the
     * mode class on its own container, the class of the root belongs to the previous render until
     * domvm patches it.
     * All the writes are done before the first size is read, which keeps the whole batch at one reflow.
     */
    private _measureTemplates;
    private _getSizes;
    private _getTabOffsets;
    private _getScrollPosition;
    private _normalizeSize;
    private _getTabAutoWidth;
    private _getTabAutoHeight;
    private _getTabContainer;
    private _initHotkeys;
}
