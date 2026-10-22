import { TreeCollection } from "../../ts-data";
import { NavigationType } from "../../ts-navbar";
export interface IContextMenuConfig extends Omit<IMenuConfig, "menuCss"> {
    /** The accessible name of the context menu. */
    ariaLabel?: string;
}
export interface IMenuConfig {
    css?: string;
    navigationType?: NavigationType;
    data?: any[] | TreeCollection<any>;
    menuCss?: string;
    /** The accessible name of the menu bar. */
    ariaLabel?: string;
}
