import { IItem } from "../types";
/**
 * The answer has to match what the item factory draws, including the items it drops, or the moving
 * tab stop lands on an item that has no element and focus is lost.
 */
export declare function isBarItemFocusable(item: IItem): boolean;
export declare function isMenuItemFocusable(item: IItem): boolean;
/**
 * A field in a bar owns the keys that move its caret, but it must give them back at the edges of
 * the text. A field that never does traps the keyboard and leaves the controls beyond it
 * unreachable, which fails WCAG 2.1.1.
 */
export declare function fieldKeepsKey(element: Element, which: number, step: number): boolean;
