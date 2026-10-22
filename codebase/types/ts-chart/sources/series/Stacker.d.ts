import { IFitPosition } from "../../../ts-common/html";
import { IStacker, PointData } from "../types";
export default class Stacker implements IStacker {
    private _series;
    private _toPaint;
    private _totalLabels;
    private _measuredStacks;
    add(seria: any): void;
    seriesShift(shift?: number): number;
    measureTotalsOf(stacks: IStacker[]): void;
    getTotalsPadding(): IFitPosition | null;
    dataReady(prev?: PointData[]): PointData[];
    scaleReady(sizes: IFitPosition): void;
    getPoints(): PointData[];
    paint(width: number, height: number, prev?: PointData[]): any;
    private _getTotalsSeria;
    private _getTotalLabels;
}
