import { IEventSystem } from "../../ts-common/events";
import { View } from "../../ts-common/view";
import { Layout } from "../../ts-layout";
import { TimepickerEvents, ITimepickerConfig, ITimepicker, ITimeObject, ITimepickerHandlersMap } from "./types";
export declare class Timepicker extends View implements ITimepicker {
    config: ITimepickerConfig;
    events: IEventSystem<TimepickerEvents, ITimepickerHandlersMap>;
    layout: Layout;
    private _hoursSlider;
    private _minutesSlider;
    private _inputsView;
    private _time;
    private _handlers;
    private _outerHandlers;
    constructor(container: HTMLElement | string, config?: ITimepickerConfig);
    getValue<T extends boolean = false>(asOBject?: T): T extends true ? ITimeObject : string;
    setValue(value: Date | number | string | any[] | ITimeObject): void;
    clear(): void;
    destructor(): void;
    getRootView(): any;
    private _setValue;
    private _initUI;
    private _initHandlers;
    private _initEvents;
    private _draw;
}
