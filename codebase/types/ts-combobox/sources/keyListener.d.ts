export declare class KeyListener {
    private _isActive;
    private _sequence;
    private _currentAction;
    private _clearTimeout;
    constructor();
    startNewListen(action: (seq: string) => any): void;
    endListen(): void;
    reset(): void;
    private _change;
    private _addClearTimeout;
}
