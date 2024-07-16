import { IEventSystem } from "../../ts-common/events";
import { IKeyManager } from "../../ts-common/KeyManager";
import { IAlign } from "../../ts-common/html";
import { Position } from "../../ts-message";
import { IDataCollection, IDragConfig, ICsvDriverConfig, IDataItem, IDragInfo, DataCollection } from "../../ts-data";
import { Exporter } from "./Exporter";
import { Combobox } from "../../ts-combobox";
import { IHandlers, Id } from "../../ts-common/types";
import { ScrollView } from "../../ts-common/ScrollView";
import { ICalendarConfig } from "../../ts-calendar";
import { VNode } from "../../ts-common/dom";
export interface IGridConfig extends IDragConfig {
    columns?: ICol[];
    spans?: ISpan[];
    data?: any[];
    type?: "tree";
    width?: number;
    height?: number | "auto";
    sortable?: boolean;
    rowCss?: (row: IRow) => string;
    leftSplit?: number;
    topSplit?: number;
    rightSplit?: number;
    bottomSplit?: number;
    selection?: ISelectionType;
    multiselection?: boolean;
    dragItem?: IDragType;
    keyNavigation?: boolean;
    hotkeys?: IHandlers;
    css?: string;
    editable?: boolean;
    autoEmptyRow?: boolean;
    resizable?: boolean;
    htmlEnable?: boolean;
    tooltip?: boolean | IGridTooltipConfig;
    headerTooltip?: boolean | IGridTooltipConfig;
    footerTooltip?: boolean | IGridTooltipConfig;
    rowHeight?: number;
    headerRowHeight?: number;
    footerRowHeight?: number;
    autoWidth?: boolean;
    autoHeight?: boolean;
    headerAutoHeight?: boolean;
    footerAutoHeight?: boolean;
    adjust?: IAdjustBy;
    eventHandlers?: {
        [eventName: string]: {
            [className: string]: (event: Event, item: ICellObj) => void;
        };
    };
    exportStyles?: boolean | string[];
    rootParent?: Id;
    $width?: number;
    $height?: number;
    $headerHeight?: number;
    $footerHeight?: number;
    $headerHeightMap?: number[];
    $footerHeightMap?: number[];
    $totalWidth?: number;
    $totalHeight?: number;
    $positions?: IPositions;
    $colspans?: boolean;
    $footer?: boolean;
    $editable?: {
        row: any;
        col: any;
        isSpan: boolean;
        editorType?: EditorType;
        editor?: IEditor;
    };
    $resizing?: string | number;
    $scrollBarWidth?: IScrollBarWidth;
    $data?: any[];
    groupTitleTemplate?: (groupName: string, groupItems: IDataItem[]) => string;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    editing?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    headerSort?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    columnsAutoWidth?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    fitToContainer?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    splitAt?: number;
}
export interface IGridTooltipConfig {
    force?: boolean;
    showDelay?: number;
    hideDelay?: number;
    margin?: number;
    position?: Position;
    css?: string;
}
export interface IScrollBarWidth {
    x: number;
    y: number;
    xState: boolean;
    yState: boolean;
}
interface ICellObj {
    col: ICol;
    row: IRow;
}
export interface IColumnsWidth {
    [col: string]: number;
}
export interface IScrollState {
    left: number;
    top: number;
}
interface IFixedColumns {
    left: ICol[];
    right: ICol[];
}
interface IFixedRows {
    top: IRow[];
    bottom: IRow[];
}
type RenderFrom = "leftFixedCols" | "rightFixedCols" | "topFixedRows" | "bottomFixedRows" | "render";
export interface IRendererConfig extends Required<IGridConfig> {
    scroll?: IScrollState;
    datacollection: any;
    filteredColumns?: ICol[];
    currentColumns?: ICol[];
    currentRows?: IRow[];
    currentSpans?: ISpan[];
    fixedColumns?: IFixedColumns;
    fixedRows?: IFixedRows;
    firstColId?: Id;
    headerHeight?: number;
    footerHeight?: number;
    events?: IEventSystem<GridEvents, IEventHandlersMap>;
    selection: any;
    sortBy?: Id;
    sortDir?: string;
    filterLocation?: string;
    content?: IContentList;
    gridId?: string;
    $renderFrom?: RenderFrom;
    _events?: IEventSystem<GridSystemEvents>;
}
export interface ISortingState {
    dir: Dirs;
    by: Id;
}
export interface IGrid {
    data: IDataCollection;
    export: Exporter;
    config: IGridConfig;
    events: IEventSystem<GridEvents, IEventHandlersMap>;
    selection: ISelection;
    content: IContentList;
    keyManager: IKeyManager;
    paint(): void;
    destructor(): void;
    setColumns(col: ICol[]): void;
    addRowCss(rowId: Id, css: string): void;
    removeRowCss(rowId: Id, css: string): void;
    addCellCss(rowId: Id, colId: Id, css: string): void;
    removeCellCss(rowId: Id, colId: Id, css: string): void;
    getRootView(): any;
    showColumn(colId: Id): void;
    hideColumn(colId: Id): void;
    isColumnHidden(colId: Id): boolean;
    showRow(rowId: Id): void;
    hideRow(rowId: Id): void;
    isRowHidden(rowId: Id): boolean;
    scroll(x?: number, y?: number): void;
    scrollTo(rowId: Id, colId: Id): void;
    getScrollState(): ICoords;
    adjustColumnWidth(colId: Id, adjust?: IAdjustBy): void;
    getCellRect(rowId: Id, colId: Id): ICellRect;
    getColumn(colId: Id): ICol;
    addSpan(spanObj: ISpan): void;
    getSpan(rowId: Id, colId: Id): ISpan;
    removeSpan(rowId: Id, colId: Id): void;
    editCell(rowId: Id, colId: Id, editorType?: EditorType): void;
    editEnd(withoutSave?: boolean): void;
    getSortingState(): ISortingState;
    getHeaderFilter(colId: Id): IHeaderFilter;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    edit(rowId: Id, colId: Id, editorType?: EditorType): void;
}
export interface IProGrid extends IGrid {
    scrollView: ScrollView;
}
export type EditorType = "input" | "select" | "datePicker" | "checkbox" | "combobox" | "multiselect" | "textarea";
export interface IComboEditorConfig {
    newOptions?: boolean;
    readOnly?: boolean;
    selectAllButton?: boolean;
    placeholder?: string;
    itemHeight?: number | string;
    listHeight?: number | string;
    css?: string;
    template?: (item: {
        id: Id;
        value: string;
    }) => string;
}
export interface IInputEditorConfig {
    min?: number;
    max?: number;
}
export interface IBaseHandlersMap {
    [key: string]: (...args: any[]) => any;
}
export declare enum HeaderFilterEvent {
    change = "change"
}
export interface IHeaderFilter {
    column: ICol;
    config: IRendererConfig;
    value: string | string[];
    events: IEventSystem<HeaderFilterEvent>;
    data?: any[];
    id?: Id;
    filterConfig?: IComboFilterConfig;
    getFilter(): VNode | Combobox;
    setValue(value: string | string[], silent?: boolean): void;
    clear(silent?: boolean): void;
    focus(): void;
    blur(): void;
}
export interface ICellRect extends ICoords, ISizes {
}
export type colType = "string" | "number" | "boolean" | "date" | "percent" | any;
export interface IOption {
    id: Id;
    value: string;
}
export type TOption = IOption | string;
export interface ICol {
    id: Id;
    width?: number;
    header?: IHeader[];
    footer?: IFooter[];
    minWidth?: number;
    maxWidth?: number;
    mark?: IMark | MarkFunction;
    type?: colType;
    format?: string;
    editorType?: EditorType;
    editorConfig?: IComboEditorConfig | ICalendarConfig | IInputEditorConfig;
    editable?: boolean;
    resizable?: boolean;
    sortable?: boolean;
    options?: ((col: ICol, row?: IRow) => TOption[]) | TOption[];
    draggable?: boolean;
    htmlEnable?: boolean;
    template?: (cellValue: any, row: IRow, col: ICol) => string;
    hidden?: boolean;
    adjust?: IAdjustBy;
    autoWidth?: boolean;
    align?: IAlign;
    tooltip?: boolean | IGridTooltipConfig;
    tooltipTemplate?: (cellValue: any, row: IRow, col: ICol) => string;
    gravity?: number;
    $cellCss?: {
        [key: string]: string;
    };
    $uniqueData?: any[];
    $activeFilterData?: any[];
    $width?: number;
    $fixedWidth?: boolean;
    $customOptions?: any;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    dateFormat?: string;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    editing?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    headerSort?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    columnsAutoWidth?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    fitToContainer?: boolean;
}
export type fixedRowContent = "inputFilter" | "selectFilter" | "comboFilter";
export type footerMethods = "avg" | "sum" | "max" | "min" | "count";
export interface IContent {
    id?: string;
    text?: string;
    colspan?: number;
    rowspan?: number;
    css?: string;
    align?: IAlign;
    tooltip?: boolean | IGridTooltipConfig;
    htmlEnable?: boolean;
}
export interface IHeader extends IContent {
    content?: fixedRowContent | footerMethods;
    filterConfig?: IComboFilterConfig;
    customFilter?: (item: any, input: string) => boolean;
    headerSort?: boolean;
    sortAs?: SortFunction;
    tooltipTemplate?: (value: string | undefined, header: IHeader, col: ICol) => string | boolean;
}
export interface IFooter extends IContent {
    content?: footerMethods;
    tooltipTemplate?: (value: string | undefined, header: IFooter, col: ICol) => string | boolean;
}
export interface IComboFilterConfig {
    data?: DataCollection<any> | any[];
    readonly?: boolean;
    template?: (item: any) => string;
    filter?: (item: any, input: string) => boolean;
    placeholder?: string;
    virtual?: boolean;
    multiselection?: boolean;
}
export interface ISpan {
    row: Id;
    column: Id;
    rowspan?: number;
    colspan?: number;
    text?: string | number;
    css?: string;
    tooltip?: boolean | IGridTooltipConfig;
    tooltipTemplate?: (spanValue: any, span: ISpan) => string;
    $rowsVisibility?: number[];
    $colsVisibility?: number[];
    $renderFrom?: RenderFrom[];
}
export interface IComboFilterConfig {
    data?: DataCollection<any> | any[];
    readonly?: boolean;
    template?: (item: any) => string;
    filter?: (item: any, input: string) => boolean;
    placeholder?: string;
    virtual?: boolean;
    multiselection?: boolean;
}
export type SortFunction = (cellValue: any) => string | number;
type MarkFunction = (cell: any, columnCells: any[], row: IRow, column: ICol) => string;
export interface IMark {
    min?: string;
    max?: string;
}
export interface IPositions {
    xStart: number;
    xEnd: number;
    yStart: number;
    yEnd: number;
}
export interface ICellCss {
    color?: string;
    background?: string;
    fontSize?: number;
    bold?: boolean;
}
export interface IExportData {
    columns: Array<{
        width: number;
    }>;
    header: string[][];
    data: any[];
    styles: {
        cells: any[];
        css: {
            [key: string]: ICellCss;
        };
    };
}
export declare enum GridEvents {
    scroll = "scroll",
    expand = "expand",
    filterChange = "filterChange",
    beforeFilter = "beforeFilter",
    beforeResizeStart = "beforeResizeStart",
    resize = "resize",
    afterResizeEnd = "afterResizeEnd",
    cellClick = "cellClick",
    cellRightClick = "cellRightClick",
    cellMouseOver = "cellMouseOver",
    cellMouseDown = "cellMouseDown",
    cellDblClick = "cellDblClick",
    headerCellClick = "headerCellClick",
    footerCellClick = "footerCellClick",
    headerCellMouseOver = "headerCellMouseOver",
    footerCellMouseOver = "footerCellMouseOver",
    headerCellMouseDown = "headerCellMouseDown",
    footerCellMouseDown = "footerCellMouseDown",
    headerCellDblClick = "headerCellDblClick",
    footerCellDblClick = "footerCellDblClick",
    headerCellRightClick = "headerCellRightClick",
    footerCellRightClick = "footerCellRightClick",
    beforeEditStart = "beforeEditStart",
    afterEditStart = "afterEditStart",
    beforeEditEnd = "beforeEditEnd",
    afterEditEnd = "afterEditEnd",
    beforeKeyDown = "beforeKeyDown",
    afterKeyDown = "afterKeyDown",
    beforeColumnHide = "beforeColumnHide",
    afterColumnHide = "afterColumnHide",
    beforeColumnShow = "beforeColumnShow",
    afterColumnShow = "afterColumnShow",
    beforeRowHide = "beforeRowHide",
    afterRowHide = "afterRowHide",
    beforeRowShow = "beforeRowShow",
    afterRowShow = "afterRowShow",
    beforeRowDrag = "beforeRowDrag",
    dragRowStart = "dragRowStart",
    dragRowOut = "dragRowOut",
    dragRowIn = "dragRowIn",
    canRowDrop = "canRowDrop",
    cancelRowDrop = "cancelRowDrop",
    beforeRowDrop = "beforeRowDrop",
    afterRowDrop = "afterRowDrop",
    afterRowDrag = "afterRowDrag",
    beforeColumnDrag = "beforeColumnDrag",
    dragColumnStart = "dragColumnStart",
    dragColumnOut = "dragColumnOut",
    dragColumnIn = "dragColumnIn",
    canColumnDrop = "canColumnDrop",
    cancelColumnDrop = "cancelColumnDrop",
    beforeColumnDrop = "beforeColumnDrop",
    afterColumnDrop = "afterColumnDrop",
    afterColumnDrag = "afterColumnDrag",
    beforeRowResize = "beforeRowResize",
    afterRowResize = "afterRowResize",
    beforeSort = "beforeSort",
    afterSort = "afterSort"
}
export interface IEventHandlersMap {
    [key: string]: (...args: any[]) => any;
    [GridEvents.scroll]: (scrollState: ICoords) => void;
    [GridEvents.beforeSort]: (col: ICol, dir: Dirs) => void | boolean;
    [GridEvents.afterSort]: (col: ICol, dir: Dirs) => void;
    [GridEvents.filterChange]: (value: string | string[], colId: Id, filterId: fixedRowContent, silent?: boolean) => void;
    [GridEvents.beforeFilter]: (value: string, colId: Id) => void | boolean;
    [GridEvents.beforeResizeStart]: (col: ICol, e: MouseEvent) => boolean | void;
    [GridEvents.resize]: (col: ICol, e: MouseEvent) => void;
    [GridEvents.afterResizeEnd]: (col: ICol, e: MouseEvent) => void;
    [GridEvents.cellClick]: (row: IRow, col: ICol, e: MouseEvent) => void;
    [GridEvents.cellRightClick]: (row: IRow, col: ICol, e: MouseEvent) => void;
    [GridEvents.cellMouseOver]: (row: IRow, col: ICol, e: MouseEvent) => void;
    [GridEvents.cellMouseDown]: (row: IRow, col: ICol, e: MouseEvent & TouchEvent) => void;
    [GridEvents.cellDblClick]: (row: IRow, col: ICol, e: MouseEvent) => void;
    [GridEvents.headerCellClick]: (col: ICol, e: MouseEvent) => void;
    [GridEvents.footerCellClick]: (col: ICol, e: MouseEvent) => void;
    [GridEvents.headerCellMouseOver]: (col: ICol, e: MouseEvent) => void;
    [GridEvents.footerCellMouseOver]: (col: ICol, e: MouseEvent) => void;
    [GridEvents.headerCellMouseDown]: (col: ICol, e: MouseEvent & TouchEvent) => void;
    [GridEvents.footerCellMouseDown]: (col: ICol, e: MouseEvent & TouchEvent) => void;
    [GridEvents.headerCellDblClick]: (col: ICol, e: MouseEvent) => void;
    [GridEvents.footerCellDblClick]: (col: ICol, e: MouseEvent) => void;
    [GridEvents.headerCellRightClick]: (col: ICol, e: MouseEvent) => void;
    [GridEvents.footerCellRightClick]: (col: ICol, e: MouseEvent) => void;
    [GridEvents.beforeEditStart]: (row: IRow, col: ICol, editorType: EditorType) => boolean | void;
    [GridEvents.afterEditStart]: (row: IRow, col: ICol, editorType: EditorType) => void;
    [GridEvents.beforeEditEnd]: (value: string | number | boolean, row: IRow, col: ICol) => boolean | void;
    [GridEvents.afterEditEnd]: (value: string | number | boolean, row: IRow, col: ICol) => void;
    [GridEvents.beforeKeyDown]: (e: Event) => boolean | void;
    [GridEvents.afterKeyDown]: (e: Event) => void;
    [GridEvents.beforeColumnHide]: (col: ICol) => boolean | void;
    [GridEvents.afterColumnHide]: (col: ICol) => void;
    [GridEvents.beforeColumnShow]: (col: ICol) => boolean | void;
    [GridEvents.afterColumnShow]: (col: ICol) => void;
    [GridEvents.beforeRowHide]: (row: IRow) => boolean | void;
    [GridEvents.afterRowHide]: (row: IRow) => void;
    [GridEvents.beforeRowShow]: (row: IRow) => boolean | void;
    [GridEvents.afterRowShow]: (row: IRow) => void;
    [GridEvents.beforeRowDrag]: (data: IDragInfo, events: MouseEvent) => void | boolean;
    [GridEvents.dragRowStart]: (data: IDragInfo, events: MouseEvent) => void;
    [GridEvents.dragRowOut]: (data: IDragInfo, events: MouseEvent) => void;
    [GridEvents.dragRowIn]: (data: IDragInfo, events: MouseEvent) => void;
    [GridEvents.canRowDrop]: (data: IDragInfo, events: MouseEvent) => void;
    [GridEvents.cancelRowDrop]: (data: IDragInfo, events: MouseEvent) => void;
    [GridEvents.beforeRowDrop]: (data: IDragInfo, events: MouseEvent) => void | boolean;
    [GridEvents.afterRowDrop]: (data: IDragInfo, events: MouseEvent) => void;
    [GridEvents.afterRowDrag]: (data: IDragInfo, events: MouseEvent) => void;
    [GridEvents.beforeColumnDrag]: (data: IDragInfo, events: MouseEvent) => void | boolean;
    [GridEvents.dragColumnStart]: (data: IDragInfo, events: MouseEvent) => void;
    [GridEvents.dragColumnOut]: (data: IDragInfo, events: MouseEvent) => void;
    [GridEvents.dragColumnIn]: (data: IDragInfo, events: MouseEvent) => void;
    [GridEvents.canColumnDrop]: (data: IDragInfo, events: MouseEvent) => void;
    [GridEvents.cancelColumnDrop]: (data: IDragInfo, events: MouseEvent) => void;
    [GridEvents.beforeColumnDrop]: (data: IDragInfo, events: MouseEvent) => void | boolean;
    [GridEvents.afterColumnDrop]: (data: IDragInfo, events: MouseEvent) => void;
    [GridEvents.afterColumnDrag]: (data: IDragInfo, events: MouseEvent) => void;
    [GridEvents.beforeRowResize]: (row: IRow, events: Event, currentHeight: number) => boolean;
    [GridEvents.afterRowResize]: (row: IRow, events: Event, currentHeight: number) => void;
    [GridEvents.expand]: (rowId: Id) => void;
}
export declare enum GridSystemEvents {
    cellTouchMove = "cellTouchMove",
    cellTouchEnd = "cellTouchEnd",
    headerCellTouchMove = "headerCellTouchMove",
    headerCellTouchEnd = "headerCellTouchEnd"
}
export interface ISystemEventHandlersMap {
    [key: string]: (...args: any[]) => any;
    [GridSystemEvents.cellTouchMove]: (row: IRow, col: ICol, e: TouchEvent) => void;
    [GridSystemEvents.cellTouchEnd]: (row: IRow, col: ICol, e: TouchEvent) => void;
    [GridSystemEvents.headerCellTouchMove]: (col: ICol, e: TouchEvent) => void;
    [GridSystemEvents.headerCellTouchEnd]: (col: ICol, e: TouchEvent) => void;
}
export interface ICellContent {
    element?: any;
    toHtml: (column: ICol, config: IRendererConfig) => any;
    match?: (obj: IMatch) => boolean;
    destroy?: () => void;
    calculate?: (col: any[], roots: any[]) => string | number;
    validate?: (colId: Id, data: any[]) => any[];
    value?: any;
}
interface IMatch {
    val: any;
    match: any;
    obj?: any;
    multi?: boolean;
    col?: ICol;
}
export interface IContentList {
    [key: string]: ICellContent;
}
export interface ILayoutState {
    wrapper: ISizes;
    shifts: ICoords;
    sticky: boolean;
    gridBodyHeight: number;
}
export interface IFixedRowsConfig extends ILayoutState {
    name: "header" | "footer";
    position: "top" | "bottom";
}
export interface IXlsxExportConfig {
    url?: string;
    name?: string;
}
export interface ICsvExportConfig extends ICsvDriverConfig {
    name?: string;
    asFile?: boolean;
    flat?: boolean;
    rowDelimiter?: string;
    columnDelimiter?: string;
}
export type Dirs = "asc" | "desc";
export interface ICoords {
    x: number;
    y: number;
}
export interface ISizes {
    width: number;
    height: number;
}
export interface ICell {
    row: IRow;
    column: ICol;
}
export interface IRow {
    id?: Id;
    height?: number;
    hidden?: boolean;
    $height?: number;
    [key: string]: any;
}
export interface IEditor {
    toHTML(text?: string): any;
    endEdit(withoutSave?: boolean): void;
}
export type ISelectionType = "cell" | "row" | "complex";
export type IDirection = "horizontal" | "vertical";
export type IDragType = "row" | "column" | "both";
export type AdjustTargetType = "data" | "header" | "footer";
export type IAdjustBy = AdjustTargetType | boolean;
export interface IAdjustColumns {
    rows: IRow[];
    cols: ICol[];
    totalCols?: ICol[];
    adjust?: IAdjustBy;
}
export interface ISelectionConfig {
    disabled?: boolean;
}
export interface ISelection {
    config?: ISelectionConfig;
    setCell(rowId?: IRow | Id, colId?: ICol | Id, ctrlUp?: boolean, shiftUp?: boolean): void;
    getCell(): ICell | void;
    getCells(): ICell[];
    removeCell(rowId?: Id, colId?: Id): void;
    disable(): void;
    enable(): void;
    toHTML(): VNode | VNode[];
}
export declare enum GridSelectionEvents {
    beforeUnSelect = "beforeUnSelect",
    afterUnSelect = "afterUnSelect",
    beforeSelect = "beforeSelect",
    afterSelect = "afterSelect"
}
export interface IGridSelectionEventsHandlersMap {
    [key: string]: (...args: any[]) => any;
    [GridSelectionEvents.afterSelect]: (row: IRow, col: ICol) => void;
    [GridSelectionEvents.afterUnSelect]: (row: IRow, col: ICol) => void;
    [GridSelectionEvents.beforeSelect]: (row: IRow, col: ICol) => boolean | void;
    [GridSelectionEvents.beforeUnSelect]: (row: IRow, col: ICol) => boolean | void;
}
export type TRowStatus = "firstFilledRow" | "firstEmptyRow";
export declare enum Split {
    left = "leftSplit",
    right = "rightSplit",
    top = "topSplit",
    bottom = "bottomSplit"
}
export interface INormalizeColumnsParams {
    config: IGridConfig;
    columns: ICol[];
    configChanged?: boolean;
}
export {};
