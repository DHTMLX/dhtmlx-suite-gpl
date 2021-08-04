export declare type Callback = (...args: any[]) => any;
export interface IEventSystem<E, T extends IEventHandlersMap = IEventHandlersMap> {
    context: any;
    events: IEvents;
    on<K extends keyof T>(name: K, callback: T[K], context?: any): any;
    detach(name: E, context?: any): any;
    clear(): void;
    fire<K extends keyof T>(name: K, args?: ArgumentTypes<T[K]>): boolean;
}
interface IEvent {
    callback: Callback;
    context: any;
}
interface IEvents {
    [key: string]: IEvent[];
}
interface IEventHandlersMap {
    [key: string]: Callback;
}
declare type ArgumentTypes<F extends (...args: any[]) => any> = F extends (...args: infer A) => any ? A : never;
export declare class EventSystem<E extends string, T extends IEventHandlersMap = IEventHandlersMap> implements IEventSystem<E, T> {
    events: IEvents;
    context: any;
    constructor(context?: any);
    on<K extends keyof T>(name: K, callback: T[K], context?: any): void;
    detach(name: E, context?: any): void;
    fire<K extends keyof T>(name: K, args: ArgumentTypes<T[K]>): boolean;
    clear(): void;
}
export declare function EventsMixin(obj: any): void;
export interface IEventFacade {
    attachEvent: any;
    callEvent: any;
}
export {};
