import { anyFunction } from "./types";
export interface IKeyManager {
    destructor(): void;
    addHotKey(key: string, handler: any): void;
    removeHotKey(key?: string, context?: any): void;
    exist(key: string): boolean;
}
export declare class KeyManager implements IKeyManager {
    private _keysStorage;
    private _beforeCall;
    private _initHandler;
    constructor(beforeCall?: (e: Event, focus: any) => boolean);
    destructor(): void;
    addHotKey(key: string, handler: any): void;
    removeHotKey(key?: string, handler?: anyFunction): void;
    exist(key: string): boolean;
}
