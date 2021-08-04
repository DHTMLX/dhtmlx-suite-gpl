import { anyFunction } from "./types";
interface IScrollViewConfig {
    enable: boolean;
    autoHide: boolean;
    timeout: number;
    scrollHandler: anyFunction;
}
export declare const scrollViewConfig: IScrollViewConfig;
export interface IScrollView {
    config: IScrollViewConfig;
    enable(): void;
    disable(): void;
    render(nods?: any[]): any;
    update(): void;
}
export declare class ScrollView implements IScrollView {
    config: IScrollViewConfig;
    private _getRootView;
    private _scrollYTop;
    private _scrollXLeft;
    private _runnerYTop;
    private _runnerXLeft;
    private _runnerHeight;
    private _runnerWidth;
    private _visibleYArea;
    private _visibleXArea;
    private _scrollWidth;
    private _scrollHeight;
    private _wheelName;
    private _handlers;
    private _autoHideFunc;
    private _uid;
    constructor(getRootView: any, config?: {});
    enable(): void;
    disable(): void;
    render(element: any, uid?: string): any;
    update(): void;
    private _getRefs;
}
export {};
