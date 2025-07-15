import { IHistoryConfig } from "../modules/History";
import { IDragPanelConfig, IGroup, ISubRowConfig } from "../types";
export declare const getGroupDefaultConfig: (config?: IGroup | boolean) => IGroup;
export declare const defaultSubRowConfig: Omit<ISubRowConfig, "view">;
export declare const defaultDragPanelConfig: IDragPanelConfig;
export declare const defaultHistoryConfig: IHistoryConfig;
