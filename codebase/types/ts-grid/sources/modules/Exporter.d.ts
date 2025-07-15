import { ICsvExportConfig, IExportGridCell, IGrid, IXlsxExportConfig } from "../types";
import { IPDFConfig, IPNGConfig, TExportType } from "../../../ts-common/types";
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
    pdf: (config?: IPDFConfig) => void;
    png: (config?: IPNGConfig) => void;
    xlsx: (config?: IXlsxExportConfig) => IExportData;
    csv: (config?: ICsvExportConfig) => string;
}
export declare class Exporter implements IExporter {
    private _name;
    private _version;
    private _view;
    private _xlsxWorker;
    constructor(_name: string, _version: string, _view: IGrid);
    pdf(config?: IPDFConfig): void;
    png(config?: IPNGConfig): void;
    xlsx(c?: IXlsxExportConfig): IExportData;
    csv(config?: ICsvExportConfig): string;
    private _export;
    private getFlatCSV;
    private _getCSV;
    protected _rawExport(config: IPNGConfig | IPDFConfig, mode: TExportType, view: any): void;
    private _getHash;
    private _getXlsxWorker;
}
