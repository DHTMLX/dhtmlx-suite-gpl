import { Id } from "../../ts-common/types";
import { DataCollection } from "../../ts-data";
import { IFileWrapper, IParams, IUploader, IUploaderConfig, IVaultEventSystem } from "./types";
export declare class Uploader implements IUploader {
    config: IUploaderConfig;
    data: DataCollection<IFileWrapper>;
    events: IVaultEventSystem;
    isActive: boolean;
    private _fileInput;
    private _dropAreas;
    private _uploadInfo;
    constructor(config?: IUploaderConfig, data?: DataCollection<IFileWrapper>, events?: IVaultEventSystem);
    selectFile(): void;
    linkDropArea(element: HTMLElement | string): void;
    unlinkDropArea(element?: HTMLElement | string): void;
    parseFiles(dataTransfer: DataTransfer): void;
    send(params?: IParams): void;
    abort(id?: Id): void;
    private _unlinkDropArea;
    private _initEvents;
    private _xhrSend;
    private _parseAsWebkitEntry;
    private _createFormData;
    private _addFile;
    private _traverseFileTree;
}
