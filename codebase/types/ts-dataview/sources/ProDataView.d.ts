import { ScrollView } from "../../ts-common/ScrollView";
import { IProDataView, IDataViewConfig } from "./types";
import { DataView } from "./DataView";
import { VNode } from "../../ts-common/dom";
export declare class ProDataView extends DataView implements IProDataView {
    scrollView: ScrollView;
    constructor(node: HTMLElement | string, config?: IDataViewConfig);
    destructor(): void;
    showItem(id: string): void;
    protected _renderList(): VNode;
}
