export declare class PrefixSums {
    private _prefix;
    private _length;
    constructor();
    ensureCapacity(maxCount: number): Float64Array;
    setLength(length: number): void;
    totalSize(): number;
    rangeSize(from: number, to: number): number;
    itemSize(visibleIndex: number): number;
    findIndex(target: number): number;
    get length(): number;
    reset(): void;
}
