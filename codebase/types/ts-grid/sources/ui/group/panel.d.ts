import { IProGrid } from "../../types";
export interface IGroupItem {
    id: string;
    label: string;
    closable?: boolean;
    sortable?: boolean;
    sort?: "asc" | "desc";
    mode?: "basic" | "drop";
    notGrouped?: boolean;
}
export declare function getGroupItem({ id, label, sort, mode, sortable, closable, }: IGroupItem): any;
export declare function getGroupPanel(grouped: IGroupItem[], grid: IProGrid): any;
