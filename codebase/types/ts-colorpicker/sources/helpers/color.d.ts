export interface IRgb {
    r: number;
    g: number;
    b: number;
}
export interface IHsv {
    h: number;
    s: number;
    v: number;
}
export declare function HSVtoRGB(hsv: IHsv): IRgb;
export declare function RGBToHex(rgb: IRgb): string;
export declare function HexToRGB(hex: string): IRgb;
export declare function RGBToHSV(rgb: IRgb): IHsv;
export declare function HexToHSV(hex: string): IHsv;
export declare function isHex(hex: string): boolean;
