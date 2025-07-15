import { ISortMode } from "../types";
export declare class Sort {
    sort(array: any[], sorters: ISortMode[]): any[];
    private _createSorter;
    private _checkVal;
    private _sort;
}
