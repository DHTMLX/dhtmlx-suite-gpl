import { Form } from "./Form";
import { IFormConfig, IItemConfig } from "./types";
import { ICellConfig } from "../../ts-layout";
export declare class ProForm extends Form {
    constructor(container: HTMLElement | string, config: IFormConfig);
    protected _addLayoutItem(item: IItemConfig): ICellConfig;
    protected _initUI(container: HTMLElement | string): void;
}
