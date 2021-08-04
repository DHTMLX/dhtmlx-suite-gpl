import { IComposeLayer } from "./types";
import { IFitPosition } from "../../ts-common/html";
export declare class ComposeLayer implements IComposeLayer {
    private _data;
    private _sizes;
    add(obj: any): void;
    clear(): void;
    getSizes(): IFitPosition;
    toVDOM(width: number, height: number): any;
}
