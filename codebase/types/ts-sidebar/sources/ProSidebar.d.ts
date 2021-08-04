import { ScrollView } from "../../ts-common/ScrollView";
import { Sidebar } from "./Sidebar";
import { IProSidebar } from "./types";
export declare class ProSidebar extends Sidebar implements IProSidebar {
    scrollView: ScrollView;
    constructor(element?: string | HTMLElement, config?: any);
    protected _draw(): any;
}
