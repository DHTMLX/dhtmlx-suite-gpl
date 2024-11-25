type Item = {
    [key: string]: any;
};
export declare const methods: {
    sum: (items: Item[], field: string) => number;
    avg: (items: Item[], field: string) => number;
    count: (items: Item[], field: string) => number;
    min: (items: Item[], field: string) => number;
    max: (items: Item[], field: string) => number;
};
export {};
