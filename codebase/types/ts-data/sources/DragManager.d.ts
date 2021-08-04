import { Id } from "../../ts-common/types";
export interface IDragManager {
    setItem(id: Id, item: any): void;
    onMouseDown(e: MouseEvent | TouchEvent, source?: Id[], itemsForGhost?: NodeList | HTMLDivElement[] | Element[]): void;
    isDrag(): boolean;
    cancelCanDrop(event: MouseEvent | TouchEvent): void;
}
export declare const dragManager: IDragManager;
