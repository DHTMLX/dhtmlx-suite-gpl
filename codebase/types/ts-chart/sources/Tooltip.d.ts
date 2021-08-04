export declare class Tooltip {
    private _chart;
    private _prevLine;
    private _mouseOverBar;
    private _tooltip;
    constructor(chart: any);
    destructor(): void;
    _showLineTooltip(lineTooltipItems: any): void;
    _showTooltip(text: any, e: MouseEvent): void;
    _showTooltipOnClosest(closest: any): void;
    _createTooltip(): void;
    private _initEvents;
}
