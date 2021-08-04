import { Navbar, IMenuElement, INavbar } from "../../ts-navbar";
export declare class Menu extends Navbar<IMenuElement> implements INavbar {
    constructor(element?: string | HTMLElement, config?: any);
    protected _getFactory(): any;
    private _draw;
}
