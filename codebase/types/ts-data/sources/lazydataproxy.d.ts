import { DataProxy } from "./dataproxy";
import { ILazyConfig, ILazyDataProxy } from "./types";
export declare class LazyDataProxy extends DataProxy implements ILazyDataProxy {
    config: ILazyConfig;
    private _timeout;
    private _cooling;
    constructor(url: string, config?: any);
    load<T = string>(): Promise<T>;
}
