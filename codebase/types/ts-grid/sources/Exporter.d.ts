import { ICsvExportConfig, IGrid, IXlsxExportConfig, ICellCss } from "./types";
import { IPDFConfig, IPNGConfig, TExportType } from "../../ts-common/types";
export interface IExportData {
    name: string;
    columns: Array<{
        width: number;
    }>;
    header: string[][];
    data: any[];
    styles: {
        cells: any[];
        css: {
            [key: string]: ICellCss;
        };
    };
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
    constructor(_name: string, _version: string, _view: IGrid);
    pdf(config?: IPDFConfig): void;
    png(config?: IPNGConfig): void;
    xlsx(config?: IXlsxExportConfig): IExportData;
    csv(config?: ICsvExportConfig): string;
    private _export;
    private getFlatCSV;
    private _getCSV;
    protected _rawExport(config: IPNGConfig | IPDFConfig, mode: TExportType, view: any): void;
    private _getHash;
}
