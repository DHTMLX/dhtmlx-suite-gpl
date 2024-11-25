import { IGrid, IGridConfig, IProGrid, IRendererConfig, IRow } from "../types";
export declare function getRenderConfig(obj: any, data: IRow[], wrapperSizes: any): IRendererConfig;
export declare function getElementSizes(element: HTMLElement | any): {
    width: number;
    height: number;
};
export declare function applyAutoWidth(config: IGridConfig, wrapperSizes: any, scrollViewConfig?: boolean): void;
export declare function render(vm: any, obj: IGrid, htmlEvents: any, selection: any, uid: string): any;
export declare function proRender(vm: any, obj: IProGrid, htmlEvents: any, selection: any, uid: string): any;
