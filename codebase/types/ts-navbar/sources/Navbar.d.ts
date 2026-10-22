import { Id, IHandlers } from "../../ts-common/types";
import { VNode } from "../../ts-common/dom";
import { IEventSystem } from "../../ts-common/events";
import { View } from "../../ts-common/view";
import { TreeCollection, IDataEventsHandlersMap } from "../../ts-data";
import { DataEvents, IItem, IGroups, NavigationBarEvents, INavbarEventHandlersMap, INavbarConfig } from "./types";
export declare abstract class Navbar<T extends IItem = IItem> extends View {
    data: TreeCollection<T>;
    events: IEventSystem<DataEvents | NavigationBarEvents, IDataEventsHandlersMap & INavbarEventHandlersMap>;
    config: INavbarConfig;
    protected _vpopups: VNode;
    protected _activeMenu: Id;
    protected _activePosition: {
        left: number;
        right: number;
        top: number;
        bottom: number;
        zIndex?: number;
    };
    protected _handlers: IHandlers;
    protected _currentRoot: Id;
    protected _factory: (item: T, asMenuItem?: boolean) => any;
    protected _groups: IGroups;
    protected _popupActive: boolean;
    protected _hasBarNavigation: boolean;
    protected _barOrientation: "horizontal" | "vertical";
    protected _menuFocusId: Id;
    protected _barFocusId: Id;
    protected _resolvedBarFocusId: Id;
    private _focusMenuOnDraw;
    private _menuOpenerId;
    private _menuReturnNode;
    private _isActive;
    private _currentTimeout;
    private _documentClick;
    private _documentHaveListener;
    private _rootItem;
    private _activeParents;
    private _keyManager;
    constructor(element?: string | HTMLElement, config?: any);
    paint(): void;
    disable(ids: Id | Id[]): void;
    enable(ids: Id | Id[]): void;
    isDisabled(id: Id): boolean;
    show(ids: Id | Id[]): void;
    hide(ids: Id | Id[]): void;
    destructor(): void;
    select(id: Id, unselect?: boolean): void;
    unselect(id?: Id): void;
    isSelected(id: Id): boolean;
    getSelected(): Id[];
    /**
     * An open popup and the widget's own bar each carry a moving tab stop: one control of each is
     * reachable with Tab, and the arrow keys move that stop between the others.
     * @internal
     */
    $getTabindex(item: IItem, asMenuItem?: boolean): number;
    protected abstract _getFactory(): (item: T, asMenuItem?: boolean) => any;
    protected _customHandlers(): {};
    /** The name of the root popup of a context menu, which has no control to take a name from. */
    protected _getRootMenuLabel(): string | undefined;
    /** The bar controls, in the order they are drawn. A widget that nests them overrides this. */
    protected _getBarItemIds(): Id[];
    protected _resolveBarFocus(): void;
    protected _focusBarItem(id: Id): void;
    protected _raiseFocusTooltip(): void;
    protected _bindBarHandlers(node: HTMLElement): void;
    private _onBarFocusIn;
    private _onBarKeyDown;
    /** Shared by the click handler and the key handler, so that both open a menu the same way. */
    protected _openMenu(id: Id, element: HTMLElement, e: Event): void;
    protected _close(e: MouseEvent | TouchEvent | KeyboardEvent): void;
    protected _init(): void;
    protected _initHandlers(): void;
    protected _initEvents(): void;
    protected _getMode(item: T, root: Id, _active?: boolean): "bottom" | "right";
    protected _drawMenuItems(id: Id, asMenuItem?: boolean): any[];
    protected _setRoot(_id: Id): void;
    protected _getParents(id: any, root: any): Id[];
    protected _listenOuterClick(): void;
    protected _customInitEvents(): void;
    private _drawPopups;
    private _getMenuItemIds;
    private _enterMenu;
    private _focusMenuItem;
    private _isFocusInPopup;
    private _enterContextMenu;
    private _focusMenuOpener;
    private _onMenuKeyDown;
    private _getOpenKey;
    private _openMenuFromControl;
    private _focusSubmenu;
    private _moveMenuFocus;
    private _closeMenuLevel;
    private _onMenuItemClick;
    private _activeItemChange;
    private _resetHotkeys;
    private _setProp;
}
