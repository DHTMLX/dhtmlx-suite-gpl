import { IGrid, IGridConfig, IProGrid, IRendererConfig, IRow, Split, IScrollBarWidth } from "../types";
export declare const BORDERS = 2;
export declare function calcScrollBarWidth(config: IGridConfig | IRendererConfig): IScrollBarWidth;
export declare function getRenderConfig(obj: any, data: IRow[], wrapperSizes: any): IRendererConfig;
export declare function getEvents(config: IRendererConfig, mode?: Split): {};
export declare function render(vm: any, obj: IGrid, htmlEvents: any, selection: any, uid: string): any;
export declare function proRender(vm: any, obj: IProGrid, htmlEvents: any, selection: any, uid: string): any;
