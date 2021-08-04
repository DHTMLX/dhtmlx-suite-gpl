import { Toolbar, IToolbar } from "./Toolbar";
import { ScrollView } from "../../ts-common/ScrollView";
export interface IProToolbar extends IToolbar {
    scrollView: ScrollView;
}
export declare class ProToolbar extends Toolbar implements IProToolbar {
    scrollView: ScrollView;
    constructor(element?: string | HTMLElement, config?: any);
    protected _draw(element: any): any;
}
