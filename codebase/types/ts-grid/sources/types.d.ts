import { IEventSystem } from "../../ts-common/events";
import { IKeyManager } from "../../ts-common/KeyManager";
import { IAlign } from "../../ts-common/html";
import { Position } from "../../ts-message";
import { IDataCollection, IDragConfig, ICsvDriverConfig, IDataItem, IDragInfo, DataCollection, ISortMode, TSortDir } from "../../ts-data";
import { Combobox } from "../../ts-combobox";
import { IHandlers, Id } from "../../ts-common/types";
import { ScrollView } from "../../ts-common/ScrollView";
import { ICalendarConfig } from "../../ts-calendar";
import { VNode } from "../../ts-common/dom";
import { INumberMask, IPatternMask } from "../../ts-common/input";
import { IGroupOrder, TDisplayMode } from "../../ts-data/sources/datacollection/group";
import { IGroupItem } from "./ui/components/groupPanel";
import { ITreeGrid, ITreeGridConfig } from "../../ts-treegrid";
import { ISelection } from "./modules/Selection";
import { IProCell, IViewConstructor } from "../../ts-layout";
import { IRange, IRangeConfig } from "./modules/Range";
import { IBlockSelection, IBlockSelectionConfig } from "./modules/BlockSelection";
import { IClipboard, IClipboardConfig } from "./modules/Clipboard";
import { IHistory, IHistoryConfig } from "./modules/History";
export interface IGrid {
    data: IDataCollection;
    name: "grid" | string;
    config: IGridConfig;
    events: IEventSystem<GridEvents, IEventHandlersMap>;
    selection: ISelection;
    content: IContentList;
    keyManager: IKeyManager;
    export: any;
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
    getHeaderFilter(colId: Id): IHeaderFilter;
    getRootNode(): HTMLElement;
    getSummary(colId?: Id): ISummaryList;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/suite/migration/suite/migration/ */
    getSortingState(): {
        dir?: TSortDir;
        by?: Id;
    };
}
export interface IExtendedGrid extends IGrid {
    name: "progrid" | string;
    scrollView: ScrollView;
    config: IExtendedGridConfig;
    range: IRange;
    block: IBlockSelection;
    clipboard: IClipboard;
    history: IHistory;
    getSubRow(id: Id): ISubViewCell | null;
    expand(rowId: Id): void;
    collapse(rowId: Id): void;
    expandAll(): void;
    collapseAll(): void;
}
export interface IProGrid extends ITreeGrid {
    config: IProGridConfig;
}
export interface IGridConfig extends IDragConfig {
    columns?: ICol[];
    spans?: ISpan[];
    data?: IRow[];
    width?: number;
    height?: number | "auto";
    autoWidth?: boolean;
    rowHeight?: number;
    headerRowHeight?: number;
    footerRowHeight?: number;
    leftSplit?: number;
    topSplit?: number;
    rightSplit?: number;
    bottomSplit?: number;
    sortable?: boolean;
    multiSort?: boolean;
    editable?: boolean;
    resizable?: boolean;
    groupable?: boolean;
    closable?: boolean;
    css?: string;
    rowCss?: (row: IRow) => string;
    exportStyles?: boolean | string[];
    selection?: ISelectionType;
    multiselection?: boolean;
    rangeSelection?: boolean | IRangeConfig;
    blockSelection?: boolean | IBlockSelectionConfig;
    clipboard?: boolean | IClipboardConfig;
    history?: boolean | IHistoryConfig;
    dragItem?: IDragType;
    dragPanel?: boolean | IDragPanelConfig;
    tooltip?: boolean | IGridTooltipConfig;
    headerTooltip?: boolean | IGridTooltipConfig;
    footerTooltip?: boolean | IGridTooltipConfig;
    keyNavigation?: boolean;
    autoEmptyRow?: boolean;
    htmlEnable?: boolean;
    adjust?: IAdjustBy;
    eventHandlers?: {
        [eventName: string]: {
            [className: string]: (event: Event, item: ICellObj) => void;
        };
    };
    summary?: ISummary;
    hotkeys?: IHandlers;
    rootParent?: Id;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/suite/migration/ */
    groupTitleTemplate?: (groupName: string, groupItems: IDataItem[]) => string;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/suite/migration/ */
    editing?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/suite/migration/ */
    headerSort?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/suite/migration/ */
    columnsAutoWidth?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/suite/migration/ */
    fitToContainer?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/suite/migration/ */
    splitAt?: number;
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
    $grouped?: IGroupItem[];
    $subRowCells?: Map<Id, ISubRowCell>;
}
export type IProGridConfig = IExtendedGridConfig & ITreeGridConfig;
export interface IExtendedGridConfig extends IGridConfig {
    subRowConfig?: ((row: IRow) => ISubRowConfig) | ISubRowConfig;
    subRow?: (row: IRow) => string | IViewConstructor;
    height?: number | "auto";
    autoHeight?: boolean;
    headerAutoHeight?: boolean;
    footerAutoHeight?: boolean;
    group?: boolean | IGroup;
    dragItem?: IDragType;
    dragPanel?: boolean | IDragPanelConfig;
    multiSort?: boolean;
    rangeSelection?: boolean | IRangeConfig;
    blockSelection?: boolean | IBlockSelectionConfig;
    clipboard?: boolean | IClipboardConfig;
    history?: boolean | IHistoryConfig;
}
export interface IRendererConfig extends Required<IProGridConfig> {
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
    dropManager: any;
    blockSelection: any;
    sort: ISortingStates;
    filterLocation?: string;
    content?: IContentList;
    gridId?: string;
    commonSummary: ISummaryList;
    colSummary: {
        [colId: string]: ISummaryList;
    };
    $renderFrom?: RenderFrom;
    _events?: IEventSystem<GridSystemEvents>;
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
    beforeCollapse = "beforeCollapse",
    afterCollapse = "afterCollapse",
    beforeExpand = "beforeExpand",
    afterExpand = "afterExpand",
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
    afterSort = "afterSort",
    groupPanelItemClick = "groupPanelItemClick",
    groupPanelItemMouseDown = "groupPanelItemMouseDown",
    dragPanelItemClick = "dragPanelItemClick",
    dragPanelItemMouseDown = "dragPanelItemMouseDown"
}
export interface IEventHandlersMap {
    [key: string]: (...args: any[]) => any;
    [GridEvents.scroll]: (scrollState: ICoords) => void;
    [GridEvents.beforeSort]: (column: ICol, dir: TSortDir) => void | boolean;
    [GridEvents.afterSort]: (column: ICol, dir: TSortDir) => void;
    [GridEvents.filterChange]: (value: string | string[], colId: Id, filterId: TContentFilter, silent?: boolean) => void;
    [GridEvents.beforeFilter]: (value: string, colId: Id) => void | boolean;
    [GridEvents.beforeResizeStart]: (column: ICol, event: MouseEvent) => boolean | void;
    [GridEvents.resize]: (column: ICol, event: MouseEvent) => void;
    [GridEvents.afterResizeEnd]: (column: ICol, event: MouseEvent) => void;
    [GridEvents.cellClick]: (row: IRow, column: ICol, event: MouseEvent) => void;
    [GridEvents.cellRightClick]: (row: IRow, column: ICol, event: MouseEvent) => void;
    [GridEvents.cellMouseOver]: (row: IRow, column: ICol, event: MouseEvent) => void;
    [GridEvents.cellMouseDown]: (row: IRow, column: ICol, event: MouseEvent & TouchEvent) => void;
    [GridEvents.cellDblClick]: (row: IRow, column: ICol, event: MouseEvent) => void;
    [GridEvents.headerCellClick]: (cell: IHeader, column: ICol, event: MouseEvent) => void;
    [GridEvents.footerCellClick]: (cell: IFooter, column: ICol, event: MouseEvent) => void;
    [GridEvents.headerCellMouseOver]: (cell: IHeader, column: ICol, event: MouseEvent) => void;
    [GridEvents.footerCellMouseOver]: (cell: IFooter, column: ICol, event: MouseEvent) => void;
    [GridEvents.headerCellMouseDown]: (cell: IHeader, column: ICol, event: MouseEvent & TouchEvent) => void;
    [GridEvents.footerCellMouseDown]: (cell: IFooter, column: ICol, event: MouseEvent & TouchEvent) => void;
    [GridEvents.headerCellDblClick]: (cell: IHeader, column: ICol, event: MouseEvent) => void;
    [GridEvents.footerCellDblClick]: (cell: IFooter, column: ICol, event: MouseEvent) => void;
    [GridEvents.headerCellRightClick]: (cell: IHeader, column: ICol, event: MouseEvent) => void;
    [GridEvents.footerCellRightClick]: (cell: IFooter, column: ICol, event: MouseEvent) => void;
    [GridEvents.beforeEditStart]: (row: IRow, col: ICol, editorType: EditorType) => boolean | void;
    [GridEvents.afterEditStart]: (row: IRow, col: ICol, editorType: EditorType) => void;
    [GridEvents.beforeEditEnd]: (value: string | number | boolean | Date, row: IRow, column: ICol) => boolean | void;
    [GridEvents.afterEditEnd]: (value: string | number | boolean | Date, row: IRow, column: ICol) => void;
    [GridEvents.beforeKeyDown]: (event: Event) => boolean | void;
    [GridEvents.afterKeyDown]: (event: Event) => void;
    [GridEvents.beforeColumnHide]: (column: ICol) => boolean | void;
    [GridEvents.afterColumnHide]: (column: ICol) => void;
    [GridEvents.beforeColumnShow]: (column: ICol) => boolean | void;
    [GridEvents.afterColumnShow]: (column: ICol) => void;
    [GridEvents.beforeRowHide]: (row: IRow) => boolean | void;
    [GridEvents.afterRowHide]: (row: IRow) => void;
    [GridEvents.beforeRowShow]: (row: IRow) => boolean | void;
    [GridEvents.afterRowShow]: (row: IRow) => void;
    [GridEvents.beforeCollapse]: (rowId: Id) => boolean | void;
    [GridEvents.afterCollapse]: (rowId: Id) => void;
    [GridEvents.beforeExpand]: (rowId: Id) => boolean | void;
    [GridEvents.afterExpand]: (rowId: Id) => void;
    [GridEvents.beforeRowDrag]: (data: IDragInfo, event: MouseEvent) => void | boolean;
    [GridEvents.dragRowStart]: (data: IDragInfo, event: MouseEvent) => void;
    [GridEvents.dragRowOut]: (data: IDragInfo, event: MouseEvent) => void;
    [GridEvents.dragRowIn]: (data: IDragInfo, event: MouseEvent) => void;
    [GridEvents.canRowDrop]: (data: IDragInfo, event: MouseEvent) => void;
    [GridEvents.cancelRowDrop]: (data: IDragInfo, event: MouseEvent) => void;
    [GridEvents.beforeRowDrop]: (data: IDragInfo, event: MouseEvent) => void | boolean;
    [GridEvents.afterRowDrop]: (data: IDragInfo, event: MouseEvent) => void;
    [GridEvents.afterRowDrag]: (data: IDragInfo, event: MouseEvent) => void;
    [GridEvents.beforeColumnDrag]: (data: IDragInfo, event: MouseEvent) => void | boolean;
    [GridEvents.dragColumnStart]: (data: IDragInfo, event: MouseEvent) => void;
    [GridEvents.dragColumnOut]: (data: IDragInfo, event: MouseEvent) => void;
    [GridEvents.dragColumnIn]: (data: IDragInfo, event: MouseEvent) => void;
    [GridEvents.canColumnDrop]: (data: IDragInfo, event: MouseEvent) => void;
    [GridEvents.cancelColumnDrop]: (data: IDragInfo, event: MouseEvent) => void;
    [GridEvents.beforeColumnDrop]: (data: IDragInfo, event: MouseEvent) => void | boolean;
    [GridEvents.afterColumnDrop]: (data: IDragInfo, event: MouseEvent) => void;
    [GridEvents.afterColumnDrag]: (data: IDragInfo, event: MouseEvent) => void;
    [GridEvents.beforeRowResize]: (row: IRow, event: Event, currentHeight: number) => boolean;
    [GridEvents.afterRowResize]: (row: IRow, event: Event, currentHeight: number) => void;
    [GridEvents.groupPanelItemClick]: (id: string, event: MouseEvent | TouchEvent) => void;
    [GridEvents.groupPanelItemMouseDown]: (id: string, event: MouseEvent | TouchEvent) => void;
    [GridEvents.dragPanelItemClick]: (id: string, event: MouseEvent | TouchEvent) => void;
    [GridEvents.dragPanelItemMouseDown]: (id: string, event: MouseEvent | TouchEvent) => void;
    [GridEvents.expand]: (rowId: Id) => void;
}
export declare enum GridSystemEvents {
    cellTouchMove = "cellTouchMove",
    cellTouchEnd = "cellTouchEnd",
    headerCellTouchMove = "headerCellTouchMove",
    headerCellTouchEnd = "headerCellTouchEnd",
    groupPanelItemTouchMove = "groupPanelItemTouchMove",
    groupPanelItemItemTouchEnd = "groupPanelItemItemTouchEnd"
}
export interface ISystemEventHandlersMap {
    [key: string]: (...args: any[]) => any;
    [GridSystemEvents.cellTouchMove]: (row: IRow, col: ICol, event: TouchEvent) => void;
    [GridSystemEvents.cellTouchEnd]: (row: IRow, col: ICol, event: TouchEvent) => void;
    [GridSystemEvents.headerCellTouchMove]: (cell: IHeader, col: ICol, event: TouchEvent) => void;
    [GridSystemEvents.headerCellTouchEnd]: (cell: IHeader, col: ICol, event: TouchEvent) => void;
    [GridSystemEvents.groupPanelItemTouchMove]: (id: string, event: TouchEvent) => void;
    [GridSystemEvents.groupPanelItemItemTouchEnd]: (id: string, event: TouchEvent) => void;
}
export interface ICol {
    id: Id;
    type?: colType;
    header?: IHeader[];
    footer?: IFooter[];
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    autoWidth?: boolean;
    adjust?: IAdjustBy;
    align?: IAlign;
    mark?: IMark | MarkFunction;
    numberMask?: INumberMask | boolean;
    patternMask?: IPatternMask | string;
    template?: (cellValue: any, row: IRow, col: ICol) => string;
    editorType?: EditorType;
    editorConfig?: IComboEditorConfig | IDatePickerConfig | IInputEditorConfig;
    options?: ((col: ICol, row?: IRow) => TOption[]) | TOption[];
    editable?: boolean;
    resizable?: boolean;
    sortable?: boolean;
    draggable?: boolean;
    groupable?: boolean;
    closable?: boolean;
    htmlEnable?: boolean;
    hidden?: boolean;
    tooltip?: boolean | IGridTooltipConfig;
    tooltipTemplate?: (cellValue: any, row: IRow, col: ICol) => string;
    dateFormat?: string;
    summary?: TSummary;
    gravity?: number;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/suite/migration/ */
    format?: string;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/suite/migration/ */
    editing?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/suite/migration/ */
    headerSort?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/suite/migration/ */
    columnsAutoWidth?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/suite/migration/ */
    fitToContainer?: boolean;
    $cellCss?: {
        [key: string]: string;
    };
    $uniqueData?: any[];
    $activeFilterData?: any[];
    $width?: number;
    $fixedWidth?: boolean;
    $customOptions?: any;
}
export interface IRow {
    id?: Id;
    height?: number;
    hidden?: boolean;
    [key: string]: any;
    $index?: number;
    $height?: number;
    $opened?: boolean;
    $subRowHeight?: number;
    $draggable?: boolean;
}
export interface ISpan {
    row: Id;
    column: Id;
    rowspan?: number;
    colspan?: number;
    text?: string | ((args: ISummaryList) => string);
    css?: string;
    tooltip?: boolean | IGridTooltipConfig;
    tooltipTemplate?: (content: {
        value: string;
    } & ISummaryList, span: ISpan) => string | boolean;
    $rowsVisibility?: number[];
    $colsVisibility?: number[];
    $renderFrom?: RenderFrom[];
}
export interface IContent {
    id?: string;
    text?: string | ((args: ISummaryList) => string);
    colspan?: number;
    rowspan?: number;
    css?: string;
    align?: IAlign;
    tooltip?: boolean | IGridTooltipConfig;
    htmlEnable?: boolean;
}
export interface IHeader extends IContent {
    content?: TContentFilter;
    filterConfig?: IComboFilterConfig;
    customFilter?: (item: any, input: string) => boolean;
    headerSort?: boolean;
    sortAs?: SortFunction;
    tooltipTemplate?: (content: {
        value: string;
    } & ISummaryList, header: IHeader, column: ICol) => string | boolean;
}
export interface IFooter extends IContent {
    tooltipTemplate?: (content: {
        value: string;
    } & ISummaryList, header: IFooter, column: ICol) => string | boolean;
}
export interface ISubViewCell extends ISubRowConfig {
    view: string | any;
    element: HTMLElement | null;
}
export interface ISubRowCell extends ISubRowConfig {
    cell?: IProCell;
}
export interface ISubRowConfig {
    expanded?: boolean;
    preserve?: boolean;
    toggleIcon?: boolean;
    height?: number;
    padding?: number | string;
    fullWidth?: boolean;
    css?: string;
}
export interface ISummaryList {
    [key: string]: string | number | null;
}
export type TSummaryMethod = (row: IRow[]) => string | number;
export interface ISummary {
    [key: string]: string | [string, string] | TSummaryMethod;
}
export type TSummary = ISummary | string;
export type TGroupType = TDisplayMode;
export type IGroupOrderItem = string | IGroupOrder | ((row: IRow) => string);
export interface IGroup {
    type?: TGroupType;
    panel?: boolean;
    panelHeight: number;
    hideableColumns?: boolean;
    showMissed?: boolean | string;
    fields?: {
        [colId: string]: Omit<IGroupOrder, "by">;
    };
    order?: IGroupOrderItem[];
    column?: string | ICol;
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
export interface IDragPanelConfig {
    css?: string;
    icon?: string;
    width?: number;
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
export interface IVisibleRange {
    xStart: number;
    xEnd: number;
    yStart: number;
    yEnd: number;
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
export type EditorType = "input" | "select" | "datePicker" | "checkbox" | "combobox" | "multiselect" | "textarea";
export interface ISort extends Omit<ISortMode, "as" | "rule"> {
    permanent?: boolean;
}
export type ISortingStates = ISort[];
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
export interface IDatePickerConfig extends ICalendarConfig {
    asDateObject?: boolean;
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
export type colType = "string" | "number" | "boolean" | "date";
export interface IOption {
    id: Id;
    value: string;
}
export type TOption = IOption | string;
export type TContentFilter = "inputFilter" | "selectFilter" | "comboFilter";
export interface IComboFilterConfig {
    data?: DataCollection<any> | any[];
    readonly?: boolean;
    template?: (item: any) => string;
    filter?: (item: any, input: string) => boolean;
    placeholder?: string;
    virtual?: boolean;
    multiselection?: boolean;
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
    tableName?: string;
    dateFormatMask?: string;
    mapToExcelFormulas?: {
        [key: string]: string;
    };
}
export interface ICsvExportConfig extends ICsvDriverConfig {
    name?: string;
    asFile?: boolean;
    flat?: boolean;
    rowDelimiter?: string;
    columnDelimiter?: string;
}
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
export interface IEditor {
    toHTML(text?: string): any;
    endEdit(withoutSave?: boolean): void;
}
export type ISelectionType = "cell" | "row" | "complex";
export type IDirection = "horizontal" | "vertical" | "auto";
export type IDragType = "row" | "column" | "both";
export type AdjustTargetType = "data" | "header" | "footer";
export type IAdjustBy = AdjustTargetType | boolean;
export interface IAdjustColumns {
    rows: IRow[];
    cols: ICol[];
    totalCols?: ICol[];
    adjust?: IAdjustBy;
}
export type TRowStatus = "firstFilledRow" | "firstEmptyRow";
export declare enum Split {
    left = "leftSplit",
    right = "rightSplit",
    top = "topSplit",
    bottom = "bottomSplit"
}
export interface INormalizeColumnsParams {
    config: IGridConfig & IProGridConfig;
    columns: ICol[];
    configChanged?: boolean;
}
export interface IExportGridCell {
    v: string | number;
    s: number;
}
export {};
