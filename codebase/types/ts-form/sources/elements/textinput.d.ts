import { Input } from "./input";
import { IText, ITextConfig, ITextProps } from "../types";
export declare class Text extends Input implements IText {
    config: ITextConfig & {
        type: any;
    };
    protected _propsItem: string[];
    protected _props: string[];
    setProperties(propertyConfig: ITextProps): void;
    getProperties(): ITextProps;
    protected _initView(config: ITextConfig): void;
    protected _draw(): any;
}
