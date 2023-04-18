import { View } from "../../ts-common/view";
import { IPDFConfig, IPNGConfig } from "../../ts-common/types";
export declare class Exporter {
    private _name;
    private _view;
    private _version;
    constructor(_name: string, _view: View);
    pdf(config?: IPDFConfig): void;
    png(config?: IPNGConfig): void;
    private _rawExport;
}
