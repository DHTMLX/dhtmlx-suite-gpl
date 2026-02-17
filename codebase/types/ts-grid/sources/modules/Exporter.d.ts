import { IExportGridCell, IGrid, IProGrid, IProGridConfig, TExportConfigFunction } from "../types";
import { ICsvDriverConfig } from "../../../ts-data";
import { IPDFConfig, IPNGConfig, TExportType } from "../../../ts-common/types";
export type ExportType = "pdf" | "png" | "csv" | "xlsx";
export interface IXlsxExportConfig {
    url?: string;
    name?: string;
    tableName?: string;
    dateFormatMask?: string;
    mapToExcelFormulas?: {
        [key: string]: string;
    };
}
export interface ICsvExportConfig extends ICsvDriverConfig {
    name?: string;
    asFile?: boolean;
    flat?: boolean;
    rowDelimiter?: string;
    columnDelimiter?: string;
}
export interface IExportData {
    data: {
        name: string;
        cells: (IExportGridCell | undefined)[][];
        cols: {
            width: number;
        }[];
        rows: {
            height: number;
        }[];
        merged: {
            from: {
                row: number;
                column: number;
            };
            to: {
                row: number;
                column: number;
            };
        }[];
    }[];
    styles: {
        [key: string]: string;
    }[];
}
export interface IExporter {
    pdf: (config?: IPDFConfig) => Promise<void>;
    png: (config?: IPNGConfig) => Promise<void>;
    xlsx: (config?: IXlsxExportConfig) => Promise<IExportData>;
    csv: (config?: ICsvExportConfig) => Promise<string>;
}
export interface IExportConfig extends IProGridConfig {
    typeConfig?: IXlsxExportConfig | ICsvExportConfig | IPDFConfig | IPNGConfig;
}
export declare class Exporter implements IExporter {
    private _xlsxWorker;
    private _name;
    private _version;
    private _grid;
    private _exportConfigCallback;
    constructor(config: {
        name: string;
        version: string;
        view: IProGrid | IGrid;
        export: TExportConfigFunction | null;
    });
    pdf(typeConfig?: IPDFConfig): Promise<void>;
    png(typeConfig?: IPNGConfig): Promise<void>;
    xlsx(typeConfig?: IXlsxExportConfig): Promise<IExportData>;
    csv(typeConfig?: ICsvExportConfig): Promise<string>;
    private _getExportData;
    private _xlsxExport;
    private getFlatCSV;
    private _getCSV;
    protected _rawExport(typeConfig: IPNGConfig | IPDFConfig, mode: TExportType): Promise<void>;
    private _getExportWidget;
    private _getExportConfig;
    private _getCallbackData;
    private _getXlsxWorker;
}
