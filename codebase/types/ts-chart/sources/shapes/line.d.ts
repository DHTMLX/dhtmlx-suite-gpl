import { PointType } from "../types";
export declare function getHelper(type: PointType): any;
export declare function getHTMLHelper(type: PointType): any;
declare type drawFn = (x: number, y: number, id: string) => any;
export declare function getShadeHelper(type: PointType, color: string): drawFn;
export declare function getShadeHTMLHelper(type: PointType, color: string): drawFn;
export {};
