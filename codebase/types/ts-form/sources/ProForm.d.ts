import { Form } from "./Form";
import { IFormConfig, IItemConfig } from "./types";
export declare class ProForm extends Form {
    constructor(container: HTMLElement | string, config: IFormConfig);
    protected _initItemHandlers(item: IItemConfig, name: string): void;
    protected _initUI(container: HTMLElement | string): void;
}
