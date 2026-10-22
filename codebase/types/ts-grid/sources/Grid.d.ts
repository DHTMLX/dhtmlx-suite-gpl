import { IEventSystem } from "../../ts-common/events";
import { IKeyManager } from "../../ts-common/KeyManager";
import { Id, ITouchParam } from "../../ts-common/types";
import { View } from "../../ts-common/view";
import { DataEvents, DragEvents, IDataCollection, IDataEventsHandlersMap, IDataItem, IDragEventsHandlersMap, TSortDir } from "../../ts-data";
import { Exporter } from "./modules/Exporter";
import { PrefixSums } from "./helpers/PrefixSums";
import { ISelection } from "./modules/Selection";
import { EditorType, GridEvents, IAdjustBy, ICellRect, ICol, ICoords, IEventHandlersMap, IGrid, IGridConfig, IRow, IScrollState, ISpan, GridSystemEvents, ISystemEventHandlersMap, IColumnsWidth, SortFunction, IAdjustColumns, IDirection, IFooter, IHeader, INormalizeColumnsParams, ISummaryList, ISortingStates, IFixedRowLevel, TFixedRowsName } from "./types";
import { IContentList, IHeaderFilter } from "./ui/content";
import { IActiveCell } from "./modules/ActiveCell";
import { IProContentList } from "./ui/proContent";
export declare class Grid extends View implements IGrid {
    version: string;
    name: "grid";
    data: IDataCollection;
    config: IGridConfig;
    events: IEventSystem<DataEvents | GridEvents | DragEvents, IEventHandlersMap & IDataEventsHandlersMap & IDragEventsHandlersMap>;
    export: Exporter;
    content: IContentList | IProContentList;
    selection: ISelection;
    keyManager: IKeyManager;
    $activeCell: IActiveCell;
    protected _touch: ITouchParam;
    protected _destructed: boolean;
    protected _scroll: IScrollState;
    protected _events: IEventSystem<GridSystemEvents, ISystemEventHandlersMap>;
    protected _htmlEvents: any;
    protected _tooltipFocusHandler: (e: Event) => void;
    protected _sortingStates: ISortingStates;
    protected _activeFilters: object;
    protected _dropManager: any;
    protected _cachedSizes: {
        width: number;
        height: number;
    } | null;
    protected _resizeObserver: ResizeObserver | null;
    protected _rowHeights: PrefixSums;
    protected _colWidths: PrefixSums;
    protected _rowHeightsRebuild: boolean;
    private _observedEl;
    private _liveRegion;
    private _filterData;
    private _hiddenFilters;
    private _commonSummary;
    private _colSummary;
    constructor(container: HTMLElement | string | null, config?: IGridConfig);
    destructor(): void;
    setColumns(columns: ICol[]): void;
    protected _rebuildRowHeights(data?: IRow[]): void;
    protected _rebuildColWidths(): void;
    addRowCss(rowId: Id, css: string): void;
    removeRowCss(rowId: Id, css: string): void;
    addCellCss(rowId: Id, colId: Id, css: string): void;
    removeCellCss(rowId: Id, colId: Id, css: string): void;
    showColumn(colId: Id): void;
    hideColumn(colId: Id): void;
    isColumnHidden(colId: Id): boolean;
    showRow(rowId: Id): void;
    hideRow(rowId: Id): void;
    isRowHidden(rowId: Id): boolean;
    getScrollState(): ICoords;
    scroll(x: number, y: number): void;
    scrollTo(rowId: Id, colId: Id): void;
    adjustColumnWidth(colId: Id, adjust?: IAdjustBy): void;
    getCellRect(rowId: Id, colId?: Id): ICellRect;
    getColumn(colId: Id): ICol;
    addSpan(spanObj: ISpan): void;
    getSpan(rowId: Id, colId: Id): ISpan;
    removeSpan(rowId: Id, colId: Id): void;
    editCell(rowId: Id, colId: Id, editorType?: EditorType): void;
    editEnd(withoutSave?: boolean): void;
    getHeaderFilter(colId: Id): IHeaderFilter;
    getSummary(colId?: Id): ISummaryList;
    /**
     * Sends a message to the grid's polite live region, so a screen reader
     * announces a status change that happened without moving focus.
     */
    announce(message: string): void;
    /**
     * The live region is kept as a sibling of the widget root, outside the
     * `role="grid"` element: a `role="status"` node is not an allowed child of
     * a grid, and the node must survive redraws, so it is not part of the vdom.
     */
    protected _getLiveRegion(): HTMLElement | null;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/suite/migration/ */
    getSortingState(): {
        dir?: TSortDir;
        by?: Id;
    };
    protected _createView(): any;
    protected _dragInit(): void;
    protected _parseColumns(configChanged?: boolean): void;
    protected normalizeColumns({ config, columns, configChanged }: INormalizeColumnsParams): void;
    protected _buildFixedRowsHeightMap(config: IGridConfig, columns: ICol[], name: TFixedRowsName): void;
    protected _resolveFixedRowLevel(name: TFixedRowsName, index: number, config: IGridConfig): IFixedRowLevel;
    protected getNormalizeContentHeight(row: IFooter | IHeader, col: ICol, config: IGridConfig): number;
    protected _parseData(): void;
    protected _createCollection(): void;
    protected _setHTMLEventHandlers(): void;
    protected _setEventHandlers(): void;
    protected _afterEditEndProcess(value: any, editableRow: any, editableColumn: any): void;
    protected _addEmptyRow(): void;
    protected _sort(by: Id, sortAs?: SortFunction, smartSorting?: boolean): void;
    protected _setSort(): void;
    protected _clearTouchTimer(): void;
    protected _checkFilters(reset?: boolean): void;
    protected _setUniqueData(sync?: boolean): void;
    protected _checkSelectFilterValue(): void;
    protected _resetFilterUI(): void;
    protected _clearFilterValue(allCols?: boolean): void;
    protected _adjustColumns(): void;
    protected _prepareData(data: IDataItem[] | IDataCollection): any[] | IDataItem[];
    protected _adjustColumnsWidth({ rows, cols, adjust, }: IAdjustColumns): IColumnsWidth;
    protected _prepareColumnData(data: any, type: "header" | "footer"): IRow[];
    protected _dragStart(event: any): void;
    protected _dragProcess(event: MouseEvent | TouchEvent, row: IRow, column?: ICol): void;
    protected _getRowGhost(ids: Id[]): HTMLDivElement;
    protected _initHooks(): {
        didMount: () => void;
    };
    protected _normalizeDataType(): void;
    protected _applyLocalFilter(beforePrepareData?: boolean): void;
    protected _normalizeSpans(): void;
    /**
     * Retargets the caches that store a row id by value to the new id.
     * The row objects themselves are shared with the data collection, so everything that
     * keeps a reference to them (the selected cells, the rendered rows) is already up to date.
     * @internal
     */
    protected _remapRowId(oldId: Id, newId: Id): void;
    protected _hideColumn(column: ICol): void;
    protected _showColumn(column: ICol): void;
    protected _setSummary(): void;
    protected _init(): void;
    protected _observeResize(element: HTMLElement): void;
    private _applyMethod;
    private _canDataParse;
    private _attachDataCollection;
    private _setMarks;
    private _checkMarks;
    private _removeMarks;
    private _detectColsTypes;
    private _destroyContent;
    private _render;
    private _initHotKey;
    private _normalizeConfig;
    protected _autoScroll(mode: IDirection): void;
    private _applyAutoWidth;
    private _handleRow;
}
