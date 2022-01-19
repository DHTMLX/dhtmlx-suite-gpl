import { ICellConfig } from "./types";
export declare function getBlockRange(block1: ClientRect, block2: ClientRect, isXLayout?: boolean): {
    min: number;
    max: number;
};
export declare function getMarginSize(config: ICellConfig, xLayout: boolean): 0 | 10;
