type Item = {
    [key: string]: any;
};
/**
 * Aggregation functions shared by the group aggregates and the widget summaries.
 * `sum` and `count` return `0` for an empty set, the rest return `null`: there is no
 * meaningful average, minimum or maximum of nothing.
 */
export declare const methods: {
    sum: (items: Item[], field: string) => number;
    avg: (items: Item[], field: string) => number | null;
    count: (items: Item[], field: string) => number;
    min: (items: Item[], field: string) => number | null;
    max: (items: Item[], field: string) => number | null;
};
export {};
