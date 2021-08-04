import { Ribbon, IRibbon } from "./Ribbon";
import { ScrollView } from "../../ts-common/ScrollView";
export interface IProRibbon extends IRibbon {
    scrollView: ScrollView;
}
export declare class ProRibbon extends Ribbon implements IProRibbon {
    scrollView: ScrollView;
    constructor(element?: string | HTMLElement, config?: any);
    protected _draw(): any;
}
