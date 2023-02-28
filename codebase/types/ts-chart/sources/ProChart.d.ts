import { Chart } from "./Chart";
import { IChartConfig } from "./types";
export declare class ProChart extends Chart implements IChartConfig {
    config: IChartConfig;
    constructor(node: HTMLElement | string, config?: IChartConfig);
    setConfig(config: IChartConfig): void;
}
