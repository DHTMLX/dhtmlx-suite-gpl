import { IEventSystem } from "../../ts-common/events";
import { DataCallback, DataDriver, DataEvents, IDataItem, TreeCollection } from "../../ts-data";
import { Id } from "../../ts-common/types";
import { GridEvents } from "../../ts-grid";
export declare class TreeGridCollection extends TreeCollection {
    constructor(config?: any, events?: IEventSystem<DataEvents | GridEvents>);
    eachChild(id: Id, cb: any, direct?: boolean, checkItem?: (item: IDataItem) => boolean): void;
    getMaxLevel(): number;
    getLevel(id: Id): number;
    serialize(driver?: DataDriver): any[];
    getPlainIndex(id: Id): number;
    map(cb: DataCallback<IDataItem>, parent?: Id, direct?: boolean): IDataItem[];
    mapVisible(cb: DataCallback<IDataItem>, parent?: Id, direct?: boolean): IDataItem[];
    protected _parse_data(data: any, parent?: Id): void;
    protected _copy(id: Id, index: number, target?: TreeGridCollection, targetId?: Id, key?: number): Id;
    protected _addToOrder(_order: any, obj: any, index: number): void;
    protected _removeCore(id: Id): void;
    protected _setParent(item: IDataItem, parent: Id): void;
    private _checkItems;
    protected _moveItem(id: any, targetId: any, index: any): void;
}
