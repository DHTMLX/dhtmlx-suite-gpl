import { Chart } from "./Chart";
import { IChartConfig, ILegendConfig, SeriaConfig, TChartType } from "./types";
export declare class ProChart extends Chart implements IChartConfig {
    config: IChartConfig;
    constructor(node: HTMLElement | string, config?: IChartConfig);
    protected _isProOnlyType(_type: TChartType): boolean;
    protected _prepareSeriaConfig(cfg: SeriaConfig, index: number): SeriaConfig;
    protected _prepareLegendConfig(cfg: ILegendConfig): ILegendConfig;
}
