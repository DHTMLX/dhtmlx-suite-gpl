import { TreeCollection } from "../../ts-data";
import { NavigationType } from "../../ts-navbar";
export type IContextMenuConfig = Omit<IMenuConfig, "menuCss">;
export interface IMenuConfig {
    css?: string;
    navigationType?: NavigationType;
    data?: any[] | TreeCollection<any>;
    menuCss?: string;
}
