export declare const unknownColorKey = "aria_colorUnknown";
export declare const colorNameKeys: string[];
/**
 * Returns the flat locale key of the name of the nearest reference color, or `aria_colorUnknown`
 * when the value cannot be read. Pure: it does not read the locale, so a caller that needs the
 * translated name uses `getColorName` instead.
 *
 * Accepts `#RGB`, `#RRGGBB`, `#RRGGBBAA`, `rgb()` and `rgba()`.
 */
export declare function getColorNameKey(color: string): string;
/**
 * Returns the translated name of the nearest reference color, so that a color value can be
 * reported as a word instead of as a color. The locale is read at call time, which is what makes
 * `dhx.i18n.setLocale("colorpicker", ...)` take effect.
 */
export declare function getColorName(color: string): string;
