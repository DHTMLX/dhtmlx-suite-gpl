export interface ILocaleParams {
    [key: string]: string | number;
}
/**
 * Returns a localized string by its key, substituting `{name}` placeholders.
 *
 * The locale object is read on every call, so `dhx.i18n.setLocale("grid", ...)`
 * is picked up without rebuilding anything.
 */
export declare function getLocaleString(key: string, params?: ILocaleParams): string;
