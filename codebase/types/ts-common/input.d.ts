export interface INumberMask {
    prefix?: string;
    suffix?: string;
    groupSeparator?: string;
    decSeparator?: string;
    allowNegative?: boolean;
    maxIntLength?: number;
    maxDecLength?: number;
    minDecLength?: number;
}
export interface INumberMaskConfig extends INumberMask {
    onlyView?: boolean;
    lastCall?: boolean;
}
export declare function numberMask(value: string | number, options: INumberMaskConfig, input?: HTMLInputElement): string | number;
export declare function removeNumberMask(value: string, options: INumberMaskConfig): string;
export interface IPatternMask {
    pattern: ((value: string | number) => string) | string;
    charFormat?: {
        [char: string]: RegExp;
    };
}
export declare function patternMask(value: string | number, options: IPatternMask | string, input?: HTMLInputElement): string;
export declare function removePatternMask(value: string, options: IPatternMask | string): string;
