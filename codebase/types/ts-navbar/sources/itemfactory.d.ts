import { Navbar } from "./Navbar";
import { IItem, ItemType } from "./types";
interface IFactoryConfig<T extends Navbar> {
    defaultType: ItemType;
    allowedTypes: ItemType[];
    widgetName: string;
    widget: T;
}
export declare function createFactory<T extends Navbar>({ defaultType, allowedTypes, widgetName, widget, }: IFactoryConfig<T>): (item: IItem, asMenuItem?: boolean) => any;
export {};
