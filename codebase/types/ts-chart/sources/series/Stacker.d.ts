import { IStacker, PointData } from "../types";
export default class Stacker implements IStacker {
    private _series;
    private _toPaint;
    add(seria: any): void;
    dataReady(prev?: PointData[]): PointData[];
    getPoints(): PointData[];
    paint(width: number, height: number, prev?: PointData[]): any;
}
