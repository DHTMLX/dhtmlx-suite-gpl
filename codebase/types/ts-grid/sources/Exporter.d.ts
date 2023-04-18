import { ICsvExportConfig, IGrid, IXlsxExportConfig } from "./types";
import { IPDFConfig, IPNGConfig, TExportType } from "../../ts-common/types";
export declare class Exporter {
    private _name;
    private _version;
    private _view;
    constructor(_name: string, _version: string, _view: IGrid);
    pdf(config?: IPDFConfig): void;
    png(config?: IPNGConfig): void;
    xlsx(config?: IXlsxExportConfig): {
        name: string;
        columns: any[];
        header: any[][];
        data: string[][];
        styles: {
            cells: any[];
            css: {
                default: {
                    color: string;
                    background: string;
                    fontSize: number;
                };
            };
        };
    };
    csv(config?: ICsvExportConfig): string;
    private _export;
    private getFlatCSV;
    private _getCSV;
    protected _rawExport(config: IPNGConfig | IPDFConfig, mode: TExportType, view: any): void;
}
