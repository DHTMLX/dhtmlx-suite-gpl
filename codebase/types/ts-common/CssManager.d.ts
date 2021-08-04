interface ICssList {
    [key: string]: string;
}
interface ICssManager {
    update(): void;
    remove(className: string): void;
    add(cssList: ICssList, customId?: string, silent?: boolean): string;
    get(className: string): ICssList;
    destructor(): void;
}
export declare class CssManager implements ICssManager {
    private _classes;
    private _styleCont;
    constructor();
    update(): void;
    remove(className: string): void;
    add(cssList: ICssList, customId?: string, silent?: boolean): string;
    get(className: string): ICssList;
    destructor(): void;
    private _findSameClassId;
    private _addNewClass;
    private _toCssString;
    private _generateCss;
}
export declare const cssManager: CssManager;
export {};
