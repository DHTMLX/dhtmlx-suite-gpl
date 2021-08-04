import { IEventSystem } from "../../ts-common/events";
import { DataEvents, DataCollection, IDataItem, Statuses } from "../../ts-data";
export declare enum FileStatus {
    queue = "queue",
    uploaded = "uploaded",
    failed = "failed",
    inprogress = "inprogress"
}
export declare enum UploaderEvents {
    uploadBegin = "uploadbegin",
    beforeUploadFile = "beforeuploadfile",
    uploadFile = "uploadfile",
    uploadFail = "uploadfail",
    uploadComplete = "uploadcomplete",
    uploadProgress = "uploadprogress"
}
export declare enum ProgressBarEvents {
    cancel = "cancel"
}
export declare type FileHandler = (file?: object, extra?: object) => boolean | void;
export interface IParams {
    [key: string]: any;
}
export declare enum VaultMode {
    grid = "grid",
    list = "list"
}
export interface IVaultConfig {
    mode?: VaultMode;
    customScroll?: boolean;
    toolbar?: boolean;
    scaleFactor?: number;
    uploader?: IUploaderConfig;
    downloadURL?: string;
    progressBar?: IProgressBarConfig<IVaultProgressData>;
    data?: DataCollection<IFileWrapper>;
}
export interface IVault {
    data: DataCollection<IFileWrapper>;
    events: IEventSystem<DataEvents | UploaderEvents>;
    uploader: IUploader;
    paint(): void;
}
export interface IVaultProgressData {
    total: number;
    current: number;
}
export interface IProgressBarConfig<T> {
    template?: (percent: number, extra: T) => string;
}
export interface IUploader {
    config: IUploaderConfig;
    data: DataCollection<IFileWrapper>;
    events: IEventSystem<DataEvents | UploaderEvents>;
    isActive: boolean;
    selectFile(): void;
    abort(id?: string): void;
    linkDropArea(el: HTMLElement | string): void;
    unlinkDropArea(el?: HTMLElement | string): void;
    send(params?: IParams): void;
    parseFiles(dataTransfer: DataTransfer): any;
}
export interface IUploaderConfig {
    autosend?: boolean;
    target?: string;
    params?: IParams;
    singleRequest?: boolean;
    fieldName?: string;
    updateFromResponse?: boolean;
}
export interface IFileWrapper extends IDataItem {
    file: File;
    status: FileStatus;
    progress: number;
    link?: string;
    image?: HTMLImageElement;
    request?: XMLHttpRequest;
    path?: string;
    name?: string;
    size?: number;
    preview?: string;
    $toRemove?: boolean;
}
declare type BeforeReturnType = false | void;
interface IObjectWithAnyFields {
    [key: string]: string;
}
export interface IEventHandlersMap {
    [UploaderEvents.uploadBegin]: (files?: IFileWrapper[]) => void;
    [UploaderEvents.beforeUploadFile]: (file: IFileWrapper) => BeforeReturnType;
    [UploaderEvents.uploadFile]: (file: IFileWrapper, extra?: IObjectWithAnyFields) => void;
    [UploaderEvents.uploadFail]: (file: IFileWrapper) => void;
    [UploaderEvents.uploadComplete]: (files?: IFileWrapper[]) => void;
    [UploaderEvents.uploadProgress]: (progress: number, current?: number, total?: number) => void;
    [ProgressBarEvents.cancel]: () => void;
    [DataEvents.beforeAdd]: (file: IFileWrapper) => BeforeReturnType;
    [DataEvents.beforeRemove]: (file: IFileWrapper) => BeforeReturnType;
    [DataEvents.afterAdd]: (file: IFileWrapper) => void;
    [DataEvents.afterRemove]: (file: IFileWrapper) => void;
    [DataEvents.removeAll]: () => void;
    [DataEvents.change]: (id?: string, status?: Statuses, file?: IFileWrapper) => void;
    [DataEvents.load]: () => void;
}
export declare type IVaultEventSystem = IEventSystem<DataEvents | UploaderEvents | ProgressBarEvents>;
export {};
