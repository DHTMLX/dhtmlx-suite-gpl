import { Navbar, IMenuElement, INavbar } from "../../ts-navbar";
import { Id } from "../../ts-common/types";
export declare class Menu extends Navbar<IMenuElement> implements INavbar {
    constructor(element?: string | HTMLElement, config?: any);
    protected _getFactory(): (item: import("../../ts-navbar").IItem, asMenuItem?: boolean) => any;
    protected _getMode(item: any, root: any): "right" | "bottom";
    protected _close(e: MouseEvent): void;
    protected _setRoot(id: Id): void;
    private _draw;
}
