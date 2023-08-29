import { IEventSystem } from "./events";
export interface IHandlers {
    [key: string]: anyFunction | IHandlers;
}
export declare type TTheme = "light" | "dark" | "contrast-light" | "contrast-dark" | string;
export declare type Id = string | number;
export declare type fn<T extends any[], K> = (...args: T) => K;
export declare type anyFunction = fn<any[], any>;
export interface IAnyObj {
    [key: string]: any;
}
export interface ISelectionConfig {
    disabled?: boolean;
}
export interface ISelection {
    events: IEventSystem<SelectionEvents>;
    config: ISelectionConfig;
    getId(): Id;
    getItem(): any;
    add(id: Id): void;
    remove(id?: Id): boolean;
    enable(): void;
    disable(): void;
}
export declare enum SelectionEvents {
    beforeUnSelect = "beforeunselect",
    afterUnSelect = "afterunselect",
    beforeSelect = "beforeselect",
    afterSelect = "afterselect"
}
export interface ISelectionEventsHandlersMap {
    [key: string]: (...args: any[]) => any;
    [SelectionEvents.afterSelect]: (id: Id) => void;
    [SelectionEvents.afterUnSelect]: (id: Id) => void;
    [SelectionEvents.beforeSelect]: (id: Id) => void | boolean;
    [SelectionEvents.beforeUnSelect]: (id: Id) => void | boolean;
}
export interface ITouchParam {
    duration?: number;
    timer?: any;
    start?: boolean;
    timeStamp?: number;
    dblDuration?: number;
}
export declare type TExportType = "pdf" | "png";
export declare type TPaperFormat = "Letter" | "Legal" | "Tabloid" | "Ledger" | "A0" | "A1" | "A2" | "A3" | "A4" | "A5" | "A6";
export interface IExportFileConfig {
    url?: string;
    name?: string;
    header?: string;
    footer?: string;
    exportStyles?: boolean | string[];
    theme?: string;
}
export interface IPDFConfig extends IExportFileConfig {
    pdf?: {
        scale?: number;
        landscape?: boolean;
        format?: TPaperFormat;
        margin?: {
            top?: string | number;
            right?: string | number;
            bottom?: string | number;
            left?: string | number;
        };
        width?: string;
        height?: string;
        pageRanges?: string;
        displayHeaderFooter?: boolean;
        footerTemplate?: string;
        headerTemplate?: string;
        printBackground?: boolean;
    };
}
export declare type IPNGConfig = IExportFileConfig;
export declare type TLabelAlignment = "left" | "right" | "center";
