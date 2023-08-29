import { VNode } from "../../../ts-common/dom";
import { IHandlers } from "../../../ts-common/types";
import { IEventSystem } from "../../../ts-common/events";
import { Label } from "./helper/label";
import { ItemEvent, ValidationStatus, IBaseHandlersMap, IBaseItem, IBaseState, IBaseLayoutItem, ILabel, IMessage } from "../types";
import { FileStatus, IParams } from "./simplevault";
import { IFieldset } from "./fieldset";
export interface IUploadValue {
    id?: string;
    file?: File;
    src?: string;
    path?: string;
    status?: FileStatus;
    progress?: number;
    request?: XMLHttpRequest;
}
export interface IAvatarProps extends IBaseLayoutItem, ILabel, IMessage {
    validation?: (value: IUploadValue) => boolean;
    readOnly?: boolean;
    removeIcon?: boolean;
    size?: "small" | "medium" | "large" | number;
    circle?: boolean;
    alt?: string;
    icon?: string;
    placeholder?: string;
    preview?: string;
    accept?: string;
    target?: string;
    fieldName?: string;
    autosend?: boolean;
    params?: IParams;
    headerParams?: IParams;
    updateFromResponse?: boolean;
}
export interface IAvatarConfig extends IBaseItem, IBaseState, IAvatarProps {
    type: "avatar";
    value?: IUploadValue;
    $validationStatus?: ValidationStatus;
}
export interface IAvatar {
    parent?: IFieldset;
    config: IAvatarConfig;
    events: IEventSystem<ItemEvent, IAvatarEventHandlersMap>;
    send(params?: IParams): void;
    selectFile(): void;
    setValue(value: IUploadValue): void;
    getValue(): IUploadValue;
    clear(): void;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    validate(silent?: boolean, validateValue?: IUploadValue): boolean;
    clearValidate(): void;
    setProperties(propertyConfig: IAvatarProps): void;
    getProperties(): IAvatarProps;
    focus(): void;
    blur(): void;
    destructor(): void;
}
export interface IAvatarEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeChange]: (value: IUploadValue) => boolean | void;
    [ItemEvent.change]: (value: IUploadValue) => void;
    [ItemEvent.beforeHide]: (value: IUploadValue, init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: IUploadValue) => boolean | void;
    [ItemEvent.afterHide]: (value: IUploadValue, init: boolean) => void;
    [ItemEvent.afterShow]: (value: IUploadValue) => void;
    [ItemEvent.beforeValidate]: (value: IUploadValue) => boolean | void;
    [ItemEvent.afterValidate]: (value: IUploadValue, isValidate: boolean) => void;
    [ItemEvent.beforeUploadFile]: (value: IUploadValue) => boolean | void;
    [ItemEvent.uploadBegin]: (value: IUploadValue) => void;
    [ItemEvent.uploadProgress]: (progress: number, value: IUploadValue) => void;
    [ItemEvent.uploadComplete]: (value: IUploadValue) => void;
    [ItemEvent.uploadFail]: (value: IUploadValue) => void;
    [ItemEvent.uploadFile]: (value: IUploadValue, extra?: {
        [key: string]: string;
    }) => void;
    [ItemEvent.beforeChangeProperties]: (properties: IAvatarProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: IAvatarProps) => void;
}
export declare class Avatar extends Label implements IAvatar {
    parent: IFieldset;
    config: IAvatarConfig;
    events: IEventSystem<ItemEvent, IAvatarEventHandlersMap>;
    protected _handlers: IHandlers;
    protected _propsItem: string[];
    protected _props: string[];
    private _isValid;
    private _isUpload;
    private _dragover;
    private _dragoverTimeout;
    constructor(container: null | string | HTMLElement, config: IAvatarConfig);
    send(params?: IParams): void;
    selectFile(): void;
    setValue(value: IUploadValue): void;
    getValue(): IUploadValue;
    clear(): void;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    validate(silent?: boolean, validateValue?: IUploadValue): boolean;
    clearValidate(): void;
    setProperties(propertyConfig: IAvatarProps): void;
    getProperties(): IAvatarProps;
    focus(): void;
    blur(): void;
    destructor(): void;
    protected _initView(config: IAvatarConfig): void;
    protected _initHandlers(): void;
    protected _draw(): VNode;
    private _drawImage;
    private _drawPreview;
    private _drawCover;
    private _createFormData;
}
