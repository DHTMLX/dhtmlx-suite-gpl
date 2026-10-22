import { Navbar, IMenuElement, INavbar } from "../../ts-navbar";
import { Id } from "../../ts-common/types";
import { IMenuConfig } from "./types";
export declare class Menu extends Navbar<IMenuElement> implements INavbar {
    protected _hasBarNavigation: boolean;
    constructor(element?: string | HTMLElement, config?: IMenuConfig);
    protected _getFactory(): (item: import("../../ts-navbar").IItem, asMenuItem?: boolean) => any;
    protected _getMode(item: any, root: any): "right" | "bottom";
    protected _close(e: MouseEvent): void;
    protected _setRoot(id: Id): void;
    protected _getAriaAttrs(): {
        role: string;
        "aria-orientation": string;
    };
    private _draw;
}
