import { IEventSystem } from "../../ts-common/events";
import { View } from "../../ts-common/view";
import { ColorpickerEvents, IColorpicker, IColorpickerConfig, ViewsMode, IEventHandlersMap } from "./types";
export declare class Colorpicker extends View implements IColorpicker {
    config: IColorpickerConfig;
    events: IEventSystem<ColorpickerEvents, IEventHandlersMap>;
    private _keyManager;
    private _selected;
    private _handlers;
    private _pickerState;
    private _inputTimeout;
    constructor(container: string | HTMLElement, config?: IColorpickerConfig);
    destructor(): void;
    clear(): void;
    setValue(value: string): void;
    setFocus(value: string): void;
    getValue(): string;
    getCustomColors(): string[];
    setCustomColors(customColors: string[]): void;
    setCurrentMode(mode: ViewsMode): void;
    getCurrentMode(): ViewsMode;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    getView(): ViewsMode;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    setView(mode: ViewsMode): void;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    focusValue(value: string): void;
    private _setHandlers;
    private _pickerMove;
    private _focusColor;
    private _setPaletteGrip;
    private _setRangeGrip;
    private _onColorClick;
    private _removeCustomColor;
    private _getCells;
    private _getGrayShades;
    private _getPalette;
    private _getContent;
    private _initHotKey;
}
