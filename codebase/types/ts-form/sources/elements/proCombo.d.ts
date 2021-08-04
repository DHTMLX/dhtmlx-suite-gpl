import { Combo } from "./combo";
import { IComboConfig } from "../types";
export declare class ProCombo extends Combo {
    constructor(container: any, config: IComboConfig);
    protected _initView(config: IComboConfig): void;
}
