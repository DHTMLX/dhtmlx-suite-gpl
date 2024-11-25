import { Id } from "../../ts-common/types";
export type TDragItem = "row" | "group" | "column";
interface IDragConfig {
    event: MouseEvent | TouchEvent;
    type: TDragItem;
    source?: Id[];
    itemsForGhost?: NodeList | HTMLDivElement[] | Element[];
    ghost?: HTMLElement;
    groupable?: boolean;
    groupOnly?: boolean;
}
export interface IDragManager {
    setItem(id: Id, item: any): void;
    onMouseDown(config: IDragConfig): void;
    isDrag(): boolean;
    cancelCanDrop(event: MouseEvent | TouchEvent): void;
}
export declare const dragManager: IDragManager;
export {};
