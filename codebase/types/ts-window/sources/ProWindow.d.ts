import { Window } from "./Window";
import { ProLayout } from "../../ts-layout";
import { IWindowConfig, IDirectionConfig } from "./types";
import { ScrollView } from "../../ts-common/ScrollView";
export declare class ProWindow extends Window {
    protected _layout: ProLayout;
    scrollView: ScrollView;
    constructor(config: IWindowConfig);
    protected _startResize(resizeConfig: IDirectionConfig): void;
    protected _initUI(): void;
}
