import { IEventSystem } from "../../../ts-common/events";
import { ItemEvent, IItem, TFormDataCallback, IBaseHandlersMap, IBaseItem, IBaseState, IBlock, IBaseLayoutItem } from "../types";
import { ICell } from "../../../ts-layout";
import { FlexDirection } from "../../../ts-common/html";
import { TLabelAlignment } from "../../../ts-common/types";
export interface IFieldsetProps extends IBaseLayoutItem {
    label?: string;
    labelAlignment?: TLabelAlignment;
    rows?: IBlock;
    cols?: IBlock;
    align?: FlexDirection;
}
export interface IFieldsetConfig extends IBaseItem, IFieldsetProps, IBaseState {
    type: "fieldset";
}
export interface IFieldset {
    parent?: IFieldset;
    config: IFieldsetConfig;
    events: IEventSystem<ItemEvent, IFieldsetHandlersMap>;
    forEach(callback: TFormDataCallback, tree?: boolean): void;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    setProperties(config: IFieldsetProps): void;
    getProperties(): IFieldsetProps;
    destructor(): void;
    setCell(cell: ICell): any;
    getCell(): ICell;
    setAttachments(attachments: IItem[]): void;
    getAttachments(): IItem[];
    getTreeAttachments(attachments: IItem[]): IItem[];
}
export interface IFieldsetHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeChangeProperties]: (config: IFieldsetProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (config: IFieldsetProps) => void;
}
export declare class Fieldset implements IFieldset {
    parent: IFieldset;
    config: IFieldsetConfig;
    events: IEventSystem<ItemEvent, IFieldsetHandlersMap>;
    private attachments;
    private cell;
    private propsItem;
    private props;
    constructor(config: IFieldsetConfig);
    forEach(callback: TFormDataCallback, tree?: boolean): void;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    setProperties(config: IFieldsetProps): void;
    getProperties(): IFieldsetProps;
    destructor(): void;
    setCell(cell: ICell): void;
    getCell(): ICell;
    setAttachments(attachments: IItem[]): void;
    getAttachments(): IItem[];
    getTreeAttachments(attachments: IItem[]): IItem[];
}
