import { View } from "../../../../ts-common/view";
import { Popup } from "../../../../ts-popup";
import { ILabel } from "../../types";
export declare class Label extends View {
    config: ILabel & {
        type?: string;
        id?: string;
    };
    protected _handlers: any;
    protected _helper: Popup;
    constructor(container: null | string | HTMLElement, config?: {});
    protected _destructor(): void;
    protected _getHandlers(): {};
    protected _init(): void;
    protected _draw(): any;
    protected _drawLabel(): any;
}
