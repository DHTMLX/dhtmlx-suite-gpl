import { IEventSystem } from "../../ts-common/events";
import { DataEvents } from "../../ts-data";
import { ISidebarConfig, SidebarEvents, ISidebarElement, ISidebar, ISidebarEventHandlersMap } from "./types";
import { Navbar, NavigationBarEvents } from "../../ts-navbar";
import { Id } from "../../ts-common/types";
export declare class Sidebar extends Navbar<ISidebarElement> implements ISidebar {
    events: IEventSystem<NavigationBarEvents | DataEvents | (SidebarEvents & ISidebarEventHandlersMap)>;
    config: ISidebarConfig;
    private _waitRestore;
    constructor(element?: string | HTMLElement, config?: any);
    toggle(): void;
    collapse(): void;
    expand(): void;
    isCollapsed(): boolean;
    protected _getFactory(): any;
    protected _close(e: MouseEvent): void;
    protected _setRoot(id: Id): void;
    protected _customHandlers(): {
        tooltip: (e: MouseEvent) => void;
    };
    protected _draw(): any;
    protected _getMode(): "right" | "bottom";
    protected _customInitEvents(): void;
}
