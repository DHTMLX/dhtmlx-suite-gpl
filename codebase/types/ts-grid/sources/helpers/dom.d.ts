import { Id } from "../../../ts-common/types";
import { ISpan } from "../types";
export declare function getRowNode(id: Id, root: HTMLElement, split?: "left" | "right"): HTMLElement;
/** Returns a data cell, or the span that covers it, from any part of the grid, frozen columns included. */
export declare function getCellNode(root: HTMLElement, rowId: Id, colId: Id, span?: ISpan): HTMLElement;
export declare function getVisibleRowNode(row: HTMLElement, width: number, offset: number): HTMLElement;
