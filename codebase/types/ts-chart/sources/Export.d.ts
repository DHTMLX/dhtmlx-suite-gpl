import { View } from "../../ts-common/view";
import { IPDFConfig, IPNGConfig, TExportType } from "../../ts-common/types";
export declare class Exporter {
    private _name;
    private _view;
    private _version;
    constructor(_name: string, _view: View);
    pdf(config?: IPDFConfig): Promise<void>;
    png(config?: IPNGConfig): Promise<void>;
    protected _rawExport(config: IPDFConfig | IPNGConfig, mode: TExportType, view: View): Promise<void>;
    private _normalizeLink;
}
