import { Navbar, IMenuElement, ContextMode, INavbar } from "../../ts-navbar";
export declare class ContextMenu extends Navbar<IMenuElement> implements INavbar {
    protected _isContextMenu: boolean;
    private _mode;
    constructor(element?: string | HTMLElement, config?: any);
    showAt(elem: HTMLElement | MouseEvent | TouchEvent | string, showAt?: ContextMode): void;
    protected _getFactory(): any;
    protected _close(e: MouseEvent | TouchEvent): void;
    protected _getMode(_item: any, _root: any, active: boolean): ContextMode;
    private _changeActivePosition;
}
