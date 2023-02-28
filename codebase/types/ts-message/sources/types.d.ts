import { IAlign } from "../../ts-common/html";
export interface IBaseProps {
    text: string;
    header?: string;
    css?: string;
    buttonsAlignment?: IAlign;
    blockerCss?: string;
    htmlEnable?: boolean;
}
export interface IAlertProps extends IBaseProps {
    buttons?: [string];
}
export interface IConfirmProps extends IBaseProps {
    buttons?: [string, string?];
}
export declare enum RealPosition {
    left = "left",
    right = "right",
    top = "top",
    bottom = "bottom",
    center = "center"
}
export interface ITooltipConfig extends IScreenPosition {
    force?: boolean;
    showDelay?: number;
    hideDelay?: number;
    htmlEnable?: boolean;
    margin?: number;
}
export interface IPosition {
    left: number;
    top: number;
    pos: RealPosition;
}
export interface IScreenPosition {
    node: HTMLElement | string;
    position?: Position;
    css?: string;
}
export declare enum Position {
    right = "right",
    bottom = "bottom",
    center = "center",
    left = "left",
    top = "top"
}
export declare enum MessageContainerPosition {
    topLeft = "top-left",
    topRight = "top-right",
    bottomLeft = "bottom-left",
    bottomRight = "bottom-right"
}
export interface IMessageProps {
    text?: string;
    html?: string;
    css?: string;
    expire?: number;
    node?: HTMLElement;
    icon?: string;
    position?: MessageContainerPosition;
}
export interface IMessageContainerInfo {
    [MessageContainerPosition.bottomLeft]?: {
        stack: HTMLElement[];
        container: HTMLElement;
    };
    [MessageContainerPosition.bottomRight]?: {
        stack: HTMLElement[];
        container: HTMLElement;
    };
    [MessageContainerPosition.topLeft]?: {
        stack: HTMLElement[];
        container: HTMLElement;
    };
    [MessageContainerPosition.topRight]?: {
        stack: HTMLElement[];
        container: HTMLElement;
    };
}
