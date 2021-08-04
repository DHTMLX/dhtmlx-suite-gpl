export declare const el: any;
export declare const sv: any;
export declare const view: any;
export declare const create: any;
export declare const inject: any;
export declare const KEYED_LIST: any;
export declare function disableHelp(): void;
export declare type VNode = any;
export interface IDomView {
    redraw(): any;
    mount(el: HTMLElement): any;
}
export interface IDomRender {
    render(view: IDomView, data: any): VNode;
}
export interface IViewHash {
    [name: string]: IDomRender;
}
export declare function resizer(handler: any): any;
export declare function resizeHandler(container: any, handler: any): any;
export declare function awaitRedraw(): Promise<any>;
