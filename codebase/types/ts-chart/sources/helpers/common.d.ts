export declare function getDefaultColor(index?: number): string;
declare type Locator = (data: any) => number | string;
export declare function locator(value: string | Locator): Locator;
export declare function log10(x: number): number;
export declare const getTextWidth: (...args: string[]) => number;
export declare function getColorShade(color: string, light: number): string;
export declare const getFontStyle: (arg: string) => string;
interface IStop {
    offset: number;
    color: string;
    opacity?: number;
}
interface IGradient {
    stops: IStop[];
}
export declare function linearGradient(grad: IGradient, id: string): any;
export declare function getRadialGradient(opts: any, stops: IStop[], id: string): any;
export declare function euclideanDistance(x1: number, y1: number, x2: number, y2: number): number;
export declare function verticalCenteredText(text: string): any;
export declare function verticalTopText(text: string): any;
export declare function verticalBottomText(text: string): any;
export declare function calcPointRef(pointId: string, serieId: string): string;
export declare function getClassesForRotateScale(position: any, angle: any): string;
export declare function getScales(config: any): any[];
export {};
