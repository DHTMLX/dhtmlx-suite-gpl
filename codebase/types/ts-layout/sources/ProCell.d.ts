import { ScrollView } from "../../ts-common/ScrollView";
import { Cell } from "./Cell";
import { ILayout, ICellConfig, IProCell } from "./types";
export declare class ProCell extends Cell implements IProCell {
    scrollView: ScrollView;
    constructor(parent: string | HTMLElement | ILayout, config: ICellConfig);
    private _getFirstRootView;
    toVDOM(nodes?: any[]): any;
}
