import { IProGrid } from "../../types";
export interface IGroupItem {
    id: string;
    label: string;
    closable?: boolean;
    sortable?: boolean;
    sortDir?: "asc" | "desc" | null;
    sortOrder?: number | null;
    mode?: "basic" | "drop";
    notGrouped?: boolean;
}
export declare function getGroupItem({ id, label, sortDir, sortOrder, mode, sortable, closable, }: IGroupItem): any;
export declare function getGroupPanel(grouped: IGroupItem[], grid: IProGrid): any;
