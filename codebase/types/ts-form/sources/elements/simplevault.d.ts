import { Id } from "../../../ts-common/types";
import { IEventSystem } from "../../../ts-common/events";
import { View } from "../../../ts-common/view";
import { DataCollection, IDataItem } from "../../../ts-data";
import { UploaderEvents } from "../../../ts-vault";
import { Popup } from "../../../ts-popup";
import { ValidationStatus, ItemEvent, IBaseLayoutItem, IMessage, ILabel, IBaseItem, IBaseState, IBaseHandlersMap } from "../types";
import { IFieldset } from "./fieldset";
export interface IParams {
    [key: string]: any;
}
export declare enum FileStatus {
    queue = "queue",
    uploaded = "uploaded",
    failed = "failed",
    inprogress = "inprogress"
}
export interface IFileWrapper extends IDataItem {
    file: File;
    status: FileStatus;
    progress: number;
    request?: XMLHttpRequest;
    path?: string;
    name?: string;
    [key: string]: any;
}
export interface ISimpleVaultValue extends IFileWrapper {
    id: Id;
}
export interface ISimpleVaultProps extends IBaseLayoutItem, ILabel, IMessage {
    params?: IParams;
    headerParams?: IParams;
    target?: string;
    fieldName?: string;
    singleRequest?: boolean;
    updateFromResponse?: boolean;
    autosend?: boolean;
    accept?: string;
    validation?: (value: ISimpleVaultValue[]) => boolean;
}
export interface ISimpleVaultConfig extends IBaseItem, IBaseState, ISimpleVaultProps {
    type: "simplevault";
    value?: ISimpleVaultValue[];
    $vaultHeight?: number | string;
    $validationStatus?: ValidationStatus;
}
export interface ISimpleVault {
    parent?: IFieldset;
    config: ISimpleVaultConfig;
    data: DataCollection<IFileWrapper>;
    events: IEventSystem<ItemEvent | ISimpleVaultEventHandlersMap>;
    send(params?: IParams): void;
    selectFile(): void;
    setValue(value: ISimpleVaultValue[]): void;
    getValue(): ISimpleVaultValue[];
    clear(): void;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    validate(silent?: boolean, validateValue?: ISimpleVaultValue[]): boolean;
    clearValidate(): void;
    setProperties(propertyConfig: ISimpleVaultProps): void;
    getProperties(): ISimpleVaultProps;
    focus(): void;
    blur(): void;
    destructor(): void;
}
export interface ISimpleVaultEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeChange]: (value: ISimpleVaultValue[], file?: ISimpleVaultValue) => boolean | void;
    [ItemEvent.change]: (value: ISimpleVaultValue[]) => void;
    [ItemEvent.beforeHide]: (value: ISimpleVaultValue[], init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: ISimpleVaultValue[]) => boolean | void;
    [ItemEvent.afterHide]: (value: ISimpleVaultValue[], init: boolean) => void;
    [ItemEvent.afterShow]: (value: ISimpleVaultValue[]) => void;
    [ItemEvent.beforeValidate]: (value: ISimpleVaultValue[]) => boolean | void;
    [ItemEvent.afterValidate]: (value: ISimpleVaultValue[], isValidate: boolean) => void;
    [ItemEvent.beforeUploadFile]: (file: ISimpleVaultValue, value: ISimpleVaultValue[]) => boolean | void;
    [ItemEvent.uploadBegin]: (files: ISimpleVaultValue[], value: ISimpleVaultValue[]) => void;
    [ItemEvent.uploadComplete]: (files: ISimpleVaultValue[], value: ISimpleVaultValue[]) => void;
    [ItemEvent.uploadFail]: (file: ISimpleVaultValue, value: ISimpleVaultValue[]) => void;
    [ItemEvent.uploadFile]: (file: ISimpleVaultValue, value: ISimpleVaultValue[], extra?: {
        [key: string]: string;
    }) => void;
    [ItemEvent.uploadProgress]: (progress: number, value: ISimpleVaultValue[]) => void;
    [ItemEvent.beforeChangeProperties]: (properties: ISimpleVaultProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: ISimpleVaultProps) => void;
}
export declare class SimpleVault extends View implements ISimpleVault {
    parent: IFieldset;
    events: IEventSystem<UploaderEvents | ItemEvent | ISimpleVaultEventHandlersMap>;
    data: DataCollection<ISimpleVaultValue>;
    protected _helper: Popup;
    private _uploader;
    private _handlers;
    private _dragover;
    private _dragoverTimeout;
    private _isValid;
    private _propsItem;
    private _propsSimpleVault;
    private _props;
    constructor(container: HTMLElement | string, config: ISimpleVaultConfig);
    send(params?: IParams): void;
    selectFile(): void;
    setValue(value: ISimpleVaultValue[]): void;
    getValue(): ISimpleVaultValue[];
    clear(): void;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    validate(silent?: boolean, validateValue?: ISimpleVaultValue[]): boolean;
    clearValidate(): void;
    setProperties(propertyConfig: ISimpleVaultProps): void;
    getProperties(): ISimpleVaultProps;
    focus(): void;
    blur(): void;
    destructor(): void;
    protected _initView(config: ISimpleVaultConfig): void;
    protected _initHandlers(): void;
    private _draw;
}
