import { IAxisCreator, IAxisCreatorConfig, IAxisScale } from "./types";
export declare class AxisCreator implements IAxisCreator {
    private _data;
    config: IAxisCreatorConfig;
    private _hasFixedMin;
    private _hasFixedMax;
    constructor(_data: any, conf?: IAxisCreatorConfig);
    getScale(): IAxisScale;
    private _getStep;
    private _calculateSteps;
    private _exactSteps;
    /**
     * The `count` round ticks that cover the range, or null when no allowed step fits it.
     * A bound set in the config is never crossed: a step has to land on such a bound exactly,
     * and the range is only extended past a bound that the axis picked on its own.
     */
    private _roundExactSteps;
    private _buildSteps;
    private _logSteps;
    private _addPadding;
}
