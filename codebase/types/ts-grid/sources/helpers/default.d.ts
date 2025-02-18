import { IGroup, ISubRowConfig } from "../types";
export declare const getGroupDefaultConfig: (config?: IGroup | boolean) => IGroup;
export declare const defaultSubRowConfig: Omit<ISubRowConfig, "view">;
