import { Id } from "../../../ts-common/types";
import { ICell, ICellSource, ICol, IGrid, IProGrid, IRow } from "../types";
export interface IActiveCell extends ICellSource {
    destructor(): void;
}
/**
 * Keeps the position the keyboard moves over the data when no selection module is initialized.
 */
export declare class ActiveCell implements IActiveCell {
    private _grid;
    private _gridId;
    private _cell;
    constructor(grid: IGrid | IProGrid, gridId?: Id);
    /**
     * Moves the active cell. The `ctrlUp` and `shiftUp` modifiers of the selection module are
     * accepted by the shared signature and ignored here: there is no selection to extend.
     * @param row - the row, or the row id, to move to
     * @param col - the column, or the column id, to move to; the first visible column by default
     */
    setCell(row?: IRow | Id, col?: ICol | Id): void;
    getCell(): ICell | void;
    restoreFocus(): void;
    destructor(): void;
    private _init;
    private _setBrowserFocus;
}
