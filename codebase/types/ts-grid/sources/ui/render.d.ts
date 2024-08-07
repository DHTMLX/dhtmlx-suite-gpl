import { IGrid, IGridConfig, IProGrid, IRendererConfig, IRow, Split, IScrollBarWidth, ICol } from "../types";
export declare const BORDERS = 2;
export declare function calcScrollBarWidth(config: IGridConfig | IRendererConfig, customScroll?: boolean, sizes?: {
    width: number;
    height: number;
}): IScrollBarWidth;
export declare function getCurrFixedCols(config: IGridConfig, split: Split.left | Split.right): ICol[];
export declare function getRenderConfig(obj: any, data: IRow[], wrapperSizes: any): IRendererConfig;
export declare function getElementSizes(element: HTMLElement | any): {
    width: number;
    height: number;
};
export declare function applyAutoWidth(config: IGridConfig, wrapperSizes: any, scrollViewConfig?: boolean): void;
export declare function render(vm: any, obj: IGrid, htmlEvents: any, selection: any, uid: string): any;
export declare function proRender(vm: any, obj: IProGrid, htmlEvents: any, selection: any, uid: string): any;
