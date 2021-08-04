import { IGrid, IRendererConfig, IRow, IProGrid } from "../types";
export declare function getRenderConfig(obj: any, data: IRow[], wrapperSizes: any): IRendererConfig;
export declare function render(vm: any, obj: IGrid, htmlEvents: any, selection: any, uid: string): any;
export declare function proRender(vm: any, obj: IProGrid, htmlEvents: any, selection: any, uid: string): any;
