export interface IFocusManager {
    getFocusId(): string;
    setFocusId(id: string): void;
}
declare class FocusManager implements IFocusManager {
    private _activeWidgetId;
    private _initHandler;
    private _removeFocusClass;
    private _addFocusClass;
    constructor();
    getFocusId(): string;
    setFocusId(id: string): void;
}
export declare const focusManager: FocusManager;
export {};
