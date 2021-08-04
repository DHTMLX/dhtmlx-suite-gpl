import { DataCollection } from "../../ts-data";
import { IFileWrapper } from "./types";
export declare class ReadStackPreview {
    private _data;
    private _readerStack;
    private _isActive;
    constructor(data: DataCollection<IFileWrapper>);
    add(fileWrapper: IFileWrapper, wait?: boolean): void;
    read(): void;
    stop(): void;
}
