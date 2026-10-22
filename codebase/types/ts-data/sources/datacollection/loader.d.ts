import { IDataChangeStack, IDataDriver, IDataProxy, IDataCollection, DataDriver } from "../types";
export declare class Loader {
    private _parent;
    private _saving;
    private _changes;
    constructor(parent: IDataCollection, changes: any);
    load(url: IDataProxy, driver?: IDataDriver | DataDriver): Promise<any>;
    /**
     * Converts the raw input with a driver and hands it over to the collection.
     * A partial response of a lazy-loading source is handled differently: into an empty collection
     * it is expanded to the full length reported by the source, with the items outside the received
     * range put in as `$empty` placeholders; into a collection that already holds those placeholders
     * it is merged over them, and the collection is not refilled at all.
     * @param data - Items or a serialized string.
     * @param driver - Data driver used to parse the input. Defaults to the JSON driver.
     * @param resetRules - Whether the collection should drop its sorting and non-permanent
     * filtering rules before taking the data. Set when the whole dataset is replaced. Defaults to `false`.
     * @returns The parsed items.
     * @internal
     */
    parse(data: any | any[], driver?: IDataDriver | DataDriver, resetRules?: boolean): any;
    save(url: IDataProxy): void;
    updateChanges(changes: IDataChangeStack): void;
    private _setPromise;
    private _addToChain;
    private _findPrevState;
    private _removeFromOrder;
    private _getUniqueOrder;
}
