import { IAxisCreator, IAxisCreatorConfig, IAxisScale } from "./types";
export declare class AxisCreator implements IAxisCreator {
    private _data;
    config: IAxisCreatorConfig;
    constructor(_data: any, conf?: IAxisCreatorConfig);
    getScale(): IAxisScale;
    private _getStep;
    private _calculateSteps;
    private _logSteps;
    private _addPadding;
}
