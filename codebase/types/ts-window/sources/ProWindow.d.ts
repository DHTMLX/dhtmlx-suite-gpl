import { Window } from "./Window";
import { ProLayout } from "../../ts-layout";
import { IWindowConfig, ISize, IPosition } from "./types";
import { ScrollView } from "../../ts-common/ScrollView";
export declare class ProWindow extends Window {
    protected _layout: ProLayout;
    scrollView: ScrollView;
    constructor(config: IWindowConfig);
    protected _onResizeMove(_size: ISize & IPosition): void;
    protected _initUI(): void;
}
