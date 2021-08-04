import { ISortMode } from "../types";
export declare class Sort {
    sort(array: any[], by: ISortMode, perm?: ISortMode): void;
    private _createSorter;
    private _checkVal;
    private _sort;
}
