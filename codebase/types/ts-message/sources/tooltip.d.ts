import { IPosition, ITooltipConfig, Position } from "./types";
export declare function findPosition(targetRect: ClientRect, position: Position, width: number, height: number, margin?: number, recursion?: number): IPosition;
export declare function getZIndex(node: Element | HTMLElement): 10000000 | 9999999;
export declare function tooltip(text: string, config: ITooltipConfig): void;
export declare function enableTooltip(): void;
export declare function disableTooltip(): void;
