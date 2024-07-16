export declare class KeyListener {
    private _isActive;
    private _sequence;
    private _currentAction;
    private _clearTimeout;
    private _handler;
    constructor();
    startNewListen(action: (seq: string) => any): void;
    endListen(): void;
    reset(): void;
    destructor(): void;
    private _change;
    private _addClearTimeout;
}
