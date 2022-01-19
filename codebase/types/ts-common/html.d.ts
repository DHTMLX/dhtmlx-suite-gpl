import { anyFunction } from "./types";
export declare function toNode(node: string | HTMLElement): HTMLElement;
declare type eventPrepare = (ev: Event) => any;
interface IHandlerHash {
    [name: string]: (...args: any[]) => boolean | void;
}
export declare function eventHandler(prepare: eventPrepare, hash: IHandlerHash, afterCall?: anyFunction): (ev: Event) => boolean;
export declare function locateNode(target: Event | Element, attr?: string, dir?: string): Element;
export declare function locate(target: Event | Element, attr?: string): string;
export declare function locateNodeByClassName(target: Event | Element, className?: string): Element;
export declare function getBox(elem: any): {
    top: any;
    left: any;
    right: number;
    bottom: number;
    width: number;
    height: number;
};
export declare function getScrollbarWidth(): number;
export declare function getScrollbarHeight(): number;
export interface IFitTarget {
    top: number;
    left: number;
    width: number;
    height: number;
}
export interface IFitPosition {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
export interface IFitPositionConfig {
    mode?: Position;
    auto?: boolean;
    centering?: boolean;
    width: number;
    height: number;
}
export declare type IAlign = "left" | "center" | "right";
export declare type Position = "left" | "right" | "bottom" | "top";
export declare type FlexDirection = "start" | "center" | "end" | "between" | "around" | "evenly";
export declare function isIE(): boolean;
export declare function isSafari(): any;
export declare function isFirefox(): any;
export declare function getRealPosition(node: HTMLElement): IFitPosition;
export declare function calculatePosition(pos: IFitPosition, config: IFitPositionConfig): {
    left: string;
    top: string;
    minWidth: string;
    position: string;
};
export declare function fitPosition(node: HTMLElement, config: IFitPositionConfig): {
    left: string;
    top: string;
    minWidth: string;
    position: string;
};
export declare function getPageCss(): string;
export declare function getLabelStyle(config: any): false | {
    style: {
        width: any;
        "max-width": string;
    };
    label: any;
};
export {};
