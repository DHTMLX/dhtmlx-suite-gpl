import { View } from "../../ts-common/view";
import { IProgressBarConfig, IVaultEventSystem } from "./types";
export declare class ProgressBar<T> extends View {
    config: IProgressBarConfig<T>;
    events: IVaultEventSystem;
    private _progress;
    private _progressText;
    private _abortUpload;
    constructor(events: IVaultEventSystem, config: IProgressBarConfig<T>);
    setState(progress: number, extra: T): void;
    private _draw;
}
