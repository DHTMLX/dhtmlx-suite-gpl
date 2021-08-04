import { Id } from "../../ts-common/types";
import { TreeCollection } from "../../ts-data";
import { IState, Navbar, INavbar, IButton, IImageButton, ISelectButton, IInput, ISeparator, ISpacer, ITitle, ICustomHTML, INavItem, IMenuItem, IDatePicker } from "../../ts-navbar";
export interface IToolbarConfig {
    css?: string;
    menuCss?: string;
    data?: any[] | TreeCollection<IToolbarElement>;
}
export interface IToolbar extends INavbar {
    data: TreeCollection<IToolbarElement>;
    config: IToolbarConfig;
    getState(id?: Id): IState;
    setState(state: IState): void;
}
export declare type IToolbarElement = IButton | IImageButton | ISelectButton | IInput | ISeparator | ISpacer | ITitle | ICustomHTML | INavItem | IMenuItem | IDatePicker;
export declare class Toolbar extends Navbar<IToolbarElement> implements IToolbar {
    data: TreeCollection<IToolbarElement>;
    config: IToolbarConfig;
    constructor(element?: string | HTMLElement, config?: any);
    getState(id?: Id): IState;
    setState(state: IState): void;
    protected _customHandlers(): {
        input: (e: Event) => void;
        tooltip: (e: MouseEvent) => void;
    };
    protected _getFactory(): any;
    protected _draw(element: any): any;
    protected _getMode(item: any, root: any): "right" | "bottom";
    protected _close(e: MouseEvent): void;
    protected _setRoot(id: Id): void;
}
