import { View } from "../../ts-common/view";
export declare class Exporter {
    private _name;
    private _view;
    private _version;
    constructor(_name: string, _view: View);
    pdf(config: any): void;
    png(config: any): void;
    protected _rawExport(config: any, mode: string, view: View): void;
}
