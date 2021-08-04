import { IFileWrapper } from "./types";
export declare function getBasis(size?: number, current?: number): any;
export declare function truncateWord(word: string, len?: number): string;
export declare function calculateCover(image: any): {
    sx: any;
    sy: any;
    sWidth: any;
    sHeight: any;
    dx: number;
    dy: number;
};
export declare enum FileType {
    image = "image",
    video = "video",
    archive = "archive",
    table = "table",
    document = "document",
    presentation = "presentation",
    application = "application",
    web = "web",
    apple = "apple",
    pdf = "pdf",
    psd = "psd",
    audio = "audio",
    other = "other",
    text = "text"
}
export declare function getFileType(extension: any, mime: any): FileType;
export declare function getFileClassName(fileWrapper: IFileWrapper): string;
export declare function isImage(fileWrapper: any): boolean;
