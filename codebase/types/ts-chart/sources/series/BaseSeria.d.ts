import { IEventSystem } from "../../../ts-common/events";
import { ChartEvents, DrawPoint, IScale, ISeria, ISeriaConfig, PointData, PointType, ScaleType, SvgElement, TooltipType } from "../types";
import { DataCollection } from "../../../ts-data";
export default abstract class BaseSeria implements ISeria {
    protected _data: DataCollection<any>;
    id: string;
    config: ISeriaConfig;
    protected _events: IEventSystem<ChartEvents>;
    protected _handlers: {
        onclick: (id: string, value: string) => boolean;
        onmousemove: (id: string, value: string, e: any) => boolean;
        onmouseleave: (id: string, value: string) => boolean;
    };
    protected _points: PointData[];
    protected _drawPointType: DrawPoint;
    constructor(_data: DataCollection<any>, config: ISeriaConfig, other: IEventSystem<ChartEvents>);
    toggle(): void;
    getClosest(x: number, y: number): [number, number, number, string];
    getClosestVertical(x: number): [number, number, number, string, number];
    getTooltipType(_id: string): TooltipType;
    getTooltipText(id: string): any;
    dataReady(prev?: PointData[]): PointData[];
    paint(width: number, height: number): SvgElement;
    getPoints(): PointData[];
    addScale(type: ScaleType, scale: IScale): void;
    protected _getClosestDist(x: number, y: number, px: number, py: number): number;
    protected _calckFinalPoints(_width: number, _height: number): void;
    protected _setDefaults(config: any): void;
    protected _defaultLocator(_: any): any[];
    protected _getPointType(form: PointType, color: string): DrawPoint;
}
