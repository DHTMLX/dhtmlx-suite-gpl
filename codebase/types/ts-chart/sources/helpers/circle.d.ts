import { VNode } from "../../../ts-common/dom";
import { IRadarScaleDrawData } from "../types";
export declare function getCoordinates(percent: number, radiusX: number, radiusY: number, stroke?: number): [number, number];
export declare function shiftCoordinates(item: [number, number], dx: number, dy: number): [number, number];
export declare const pieLikeHandlers: {
    onmouseover(shiftX: number, shiftY: number, _: any, node: any): void;
    onmouseout(_: any, node: any): void;
};
export declare function radarScale(data: IRadarScaleDrawData, width: number, height: number): VNode;
