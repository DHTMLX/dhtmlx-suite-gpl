import { VNode } from "../../ts-common/dom";
import { ScrollView } from "../../ts-common/ScrollView";
import { List } from "./List";
import { IListConfig, IProList } from "./types";
export declare class ProList extends List implements IProList {
    scrollView: ScrollView;
    constructor(container: HTMLElement | string, config?: IListConfig);
    destructor(): void;
    showItem(id: string): void;
    protected _renderList(): VNode;
}
