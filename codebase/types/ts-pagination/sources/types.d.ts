import { DataCollection, DataEvents, IDataEventsHandlersMap } from "../../ts-data";
import { IEventSystem } from "../../ts-common/events";
export interface IPagination {
    data: DataCollection;
    config: IPaginationConfig;
    events: IEventSystem<DataEvents | PaginationEvents, IDataEventsHandlersMap & IPaginationEventHandlersMap>;
    destructor(): void;
    setPage(page: number): void;
    getPage(): number;
    setPageSize(size: number): void;
    getPageSize(): number;
    getPagesCount(): number;
}
export interface IPaginationConfig {
    data: DataCollection;
    css?: string;
    page?: number;
    pageSize?: number;
    inputWidth?: number;
}
export declare enum PaginationEvents {
    change = "change"
}
export interface IPaginationEventHandlersMap {
    [key: string]: (...args: any[]) => any;
    [PaginationEvents.change]: (index: number, previousIndex: number) => void;
}
