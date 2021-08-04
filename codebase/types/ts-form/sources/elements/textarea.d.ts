import { Input } from "./input";
import { ITextAreaConfig, ITextArea, ItemEvent, ITextAreaProps, ITextAreaEventHandlersMap } from "../types";
import { IEventSystem } from "../../../ts-common/events";
export declare class Textarea extends Input implements ITextArea {
    config: ITextAreaConfig & {
        type: any;
        validation: any;
    };
    events: IEventSystem<ItemEvent, ITextAreaEventHandlersMap>;
    protected _propsItem: string[];
    protected _props: string[];
    setValue(value: string): void;
    getValue(): string;
    focus(): void;
    blur(): void;
    setProperties(propertyConfig: ITextAreaProps): void;
    getProperties(): ITextAreaProps;
    protected _initView(config: ITextAreaConfig): void;
    protected _draw(): any;
}
