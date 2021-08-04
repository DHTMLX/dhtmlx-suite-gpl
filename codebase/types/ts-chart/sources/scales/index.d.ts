import { RadialScale } from "./RadialScale";
import { Scale } from "./Scale";
import { TextScale } from "./TextScale";
declare const scaleTypes: {
    radial: typeof RadialScale;
    text: typeof TextScale;
    numeric: typeof Scale;
};
export default scaleTypes;
