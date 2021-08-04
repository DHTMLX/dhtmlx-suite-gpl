import { IDataProxy } from "./types";
export declare class DataProxy implements IDataProxy {
    url: string;
    config: any;
    protected _url: string;
    constructor(url: string, config?: any);
    updateUrl(url?: string, params?: any): void;
    load<T = string>(): Promise<T>;
    save(data: any, mode: string): Promise<any>;
}
