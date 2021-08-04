import { Combobox } from "./Combobox";
import { IComboboxConfig } from "./types";
export declare class ProCombobox extends Combobox {
    constructor(element: HTMLElement | string, config: IComboboxConfig);
    protected _createLayout(): void;
}
