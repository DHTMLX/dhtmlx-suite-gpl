export declare const locale: {
    monthsShort: string[];
    months: string[];
    daysShort: string[];
    days: string[];
    cancel: string;
};
export declare function getFormattedDate(format: string, date: Date): string;
export declare function stringToDate(str: string, format: string, validate?: boolean): any;
export declare class DateHelper {
    static nullTimestampDate: Date;
    static copy(d: Date): Date;
    static fromYear(year: number): Date;
    static fromYearAndMonth(year: number, month: number): Date;
    static weekStart(d: Date, firstWeekday: 1 | 0): Date;
    static monthStart(d: Date): Date;
    static yearStart(d: Date): Date;
    static dayStart(d: Date): Date;
    static addDay(d: Date, count?: number): Date;
    static addMonth(d: Date, count?: number): Date;
    static addYear(d: Date, count?: number): Date;
    static withHoursAndMinutes(d: Date, hours: number, minutes: number, dateFormat: boolean): Date;
    static setMonth(d: Date, month: number): void;
    static setYear(d: Date, year: number): void;
    static mergeHoursAndMinutes(source: Date, target: Date): Date;
    static isWeekEnd(d: Date): boolean;
    static getTwelweYears(d: Date): number[];
    static getWeekNumber(d: Date): number;
    static isSameDay(d1: Date, d2: Date): boolean;
    static toDateObject(date: Date | string, dateFormat: string): Date;
}
