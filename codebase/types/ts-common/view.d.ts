export interface IView {
    getRootView(): any;
    paint(): void;
    mount(container: any, vnode?: any): void;
}
export interface IViewLike {
    mount?(container: any, vnode?: any): void;
    getRootView(): any;
}
export declare class View {
    config: any;
    protected _container: any;
    protected _uid: any;
    protected _doNotRepaint: boolean;
    private _view;
    constructor(_container: any, config: any);
    mount(container: any, vnode?: any): void;
    unmount(): void;
    getRootView(): any;
    getRootNode(): HTMLElement;
    paint(): void;
}
export declare function toViewLike(view: any): {
    getRootView: () => any;
    paint: () => any;
    mount: (container: any) => any;
};
