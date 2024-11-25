import { Id } from "../../ts-common/types";
export declare class CollectionStore {
    private _store;
    setItem(id: Id, target: any): void;
    getItem(id: Id): any;
}
export declare const collectionStore: any;
