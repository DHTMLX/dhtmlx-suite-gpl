declare type fn<T extends any[], K> = (...args: T) => K;
declare type anyFunction = fn<any[], any>;
export declare function uid(): string;
export declare function extend(target: any, source: any, deep?: boolean): any;
interface IOBj {
    [key: string]: any;
}
export declare function copy(source: IOBj, withoutInner?: boolean): IOBj;
export declare function naturalSort(arr: any): any[];
export declare function findIndex<T = any>(arr: T[], predicate: (obj: T) => boolean): number;
export declare function isEqualString(from: string, to: string): boolean;
export declare function singleOuterClick(fn: (e: MouseEvent) => boolean): void;
export declare function detectWidgetClick(widgetId: string, cb: (inner: boolean) => void): () => void;
export declare function unwrapBox<T>(box: T | T[]): T;
export declare function wrapBox<T>(unboxed: T | T[]): T[];
export declare function isDefined<T>(some: T): boolean;
export declare function range(from: number, to: number): number[];
export declare function isNumeric(val: any): boolean;
export declare function downloadFile(data: string, filename: string, mimeType?: string): void;
export declare function debounce(func: anyFunction, wait: number, immediate?: boolean): (...args: any[]) => void;
export declare function compare(obj1: any, obj2: any): boolean;
export declare const isType: (value: any) => string;
export declare const isEmptyObj: (obj: any) => boolean;
export declare const getMaxArrayNymber: (array: number[]) => number;
export declare const getMinArrayNymber: (array: number[]) => number;
export interface IContainerConfig {
    lineHeight?: number;
    font?: string;
}
export declare const getStringWidth: (value: string, config?: IContainerConfig) => number;
export declare const rgbToHex: (color: string) => string;
export {};
