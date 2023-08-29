import { IFixedRowsConfig, ILayoutState, IRendererConfig, Split } from "../types";
export declare function getRows(config: IRendererConfig, rowsConfig: IFixedRowsConfig): any[];
export declare function getFixedSpans(config: IRendererConfig, rowsConfig: IFixedRowsConfig, mode?: Split): any[];
export declare function getFixedRows(config: IRendererConfig, rowsConfig: IFixedRowsConfig, mode?: Split): any;
export declare function getFixedDataRows(config: IRendererConfig, layout: ILayoutState, mode: Split.top | Split.bottom): any[];
