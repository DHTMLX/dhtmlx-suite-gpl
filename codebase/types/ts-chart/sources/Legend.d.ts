import { IEventSystem } from "../../ts-common/events";
import { DataCollection, DataEvents } from "../../ts-data";
import { ChartEvents, ILegendConfig, ILegendDrawData, SvgElement } from "./types";
import { IFitPosition } from "../../ts-common/html";
export declare class Legend {
    private _data;
    private _events;
    private config;
    private _handlers;
    constructor(_data: DataCollection<any>, config: ILegendConfig, _events: IEventSystem<DataEvents | ChartEvents>);
    scaleReady(sizes: IFitPosition): void;
    paint(width: number, height: number): SvgElement;
    protected _getData(): ILegendDrawData[];
}
