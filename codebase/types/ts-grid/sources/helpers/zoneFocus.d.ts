import { ICol } from "../types";
export type FocusZone = "header" | "body" | "footer" | "groupPanel";
/**
 * Detects which focus zone the event target belongs to.
 * Walks up the DOM tree to determine if the target is in the header, footer, body, or group panel.
 * Span cells require special disambiguation since they exist across multiple zones.
 * @param event - the DOM event whose target will be inspected
 * @returns the zone containing the event target
 */
export declare function detectFocusZone(event: Event): FocusZone;
/**
 * Returns all visible (non-hidden) columns in their configured order.
 * @param grid - the grid instance
 * @returns an array of visible column configs
 */
export declare function getVisibleColumns(grid: any): ICol[];
/**
 * Determines which split section a column belongs to based on its index
 * relative to leftSplit and rightSplit boundaries.
 * @param grid - the grid instance
 * @param colId - the column ID to look up
 * @returns "left" for left-fixed, "right" for right-fixed, or "center" for scrollable columns
 */
export declare function getColumnSplitSection(grid: any, colId: string): "left" | "center" | "right";
/**
 * Returns the number of rows in a header or footer zone.
 * Uses the internal $headerHeightMap / $footerHeightMap arrays.
 * @param grid - the grid instance
 * @param zone - the focus zone to query
 * @returns the row count for the zone, or 0 if zone is not header/footer
 */
export declare function getZoneRowCount(grid: any, zone: FocusZone): number;
/**
 * Finds a zone cell element in the DOM by column ID and row index.
 * Checks span cells first since they overlay regular cells, then falls back
 * to regular header/footer cells. Searches section-specific containers first
 * for performance, falling back to the entire grid root.
 * @param grid - the grid instance
 * @param zone - the focus zone to search in
 * @param colId - the column ID attribute to match
 * @param rowIndex - the row index attribute to match
 * @returns the matching DOM element, or null if not found
 */
export declare function findZoneCell(grid: any, zone: FocusZone, colId: string, rowIndex: number): HTMLElement | null;
/**
 * Scrolls the grid horizontally to ensure a column is visible in the viewport.
 * Skips fixed (left/right split) columns since they are always visible.
 * Calculates the column position relative to the scrollable area and adjusts
 * the scroll offset if the column is outside the visible range.
 * @param grid - the grid instance
 * @param colId - the column ID to make visible
 * @returns true if the grid was scrolled
 */
export declare function ensureZoneCellVisible(grid: any, colId: string): boolean;
/**
 * Resolves the actual owning cell for a position that may be covered by a colspan or rowspan.
 * Scans all rows (0..rowIndex) and columns (0..colIndex) to find any cell whose
 * colspan+rowspan coverage includes the target position. Handles colspan-only,
 * rowspan-only, and combined span cases uniformly.
 * @param zone - the focus zone (determines whether to use "header" or "footer" config)
 * @param colId - the target column ID
 * @param rowIndex - the target row index
 * @param columns - the visible columns array
 * @returns the owning cell's colId and rowIndex (unchanged if no span covers the position)
 */
export declare function resolveSpanTarget(zone: FocusZone, colId: string, rowIndex: number, columns: ICol[]): {
    colId: string;
    rowIndex: number;
};
/**
 * Moves focus horizontally within a header/footer zone (ArrowLeft/ArrowRight).
 * Preserves the logical navigation row (navRowIndex) across rowspan cells so that
 * horizontal movement stays on the same logical level. Handles colspan skip when
 * moving right past a multi-column cell.
 * @param grid - the grid instance
 * @param event - the keyboard event (will be preventDefault'd)
 * @param zone - the current focus zone
 * @param direction - horizontal direction to move
 */
export declare function moveZoneFocus(grid: any, event: KeyboardEvent, zone: FocusZone, direction: "left" | "right"): void;
/**
 * Moves focus vertically within a header/footer zone (ArrowUp/ArrowDown).
 * When moving down past a rowspan cell, starts from the span's last row.
 * Returns false when reaching the zone boundary, signaling the caller
 * to handle the transition to body or adjacent zone.
 * @param grid - the grid instance
 * @param event - the keyboard event (will be preventDefault'd)
 * @param zone - the current focus zone
 * @param direction - vertical direction to move
 * @returns true if focus moved within the zone, false if at the boundary
 */
export declare function moveZoneFocusVertical(grid: any, event: KeyboardEvent, zone: FocusZone, direction: "up" | "down"): boolean;
/**
 * Moves focus via Tab/Shift+Tab within a header/footer zone.
 * Advances column-by-column with row wrapping: when reaching the last column,
 * moves to the first column of the next row (and vice versa for backward).
 * Skips cells that resolve back to the current cell (due to spans) and cells that are
 * not in the DOM although their column is in view. A cell scrolled into view is focused
 * after the redraw, not skipped (see setZoneCellFocus).
 * Does NOT call preventDefault for exit cases — the caller decides.
 * @param grid - the grid instance
 * @param event - the keyboard event (preventDefault'd only on successful move)
 * @param zone - the current focus zone
 * @param direction - tab direction: "forward" for Tab, "backward" for Shift+Tab
 * @returns "moved" on success, "exit-end" if past the last cell, "exit-start" if before the first
 */
export declare function moveZoneFocusTab(grid: any, event: KeyboardEvent, zone: FocusZone, direction: "forward" | "backward"): "moved" | "exit-start" | "exit-end";
/**
 * Checks if the active body cell is in the first visible column.
 * Works with both cell selection and block (range) selection modes.
 * @param grid - the grid instance
 * @returns true if the selection is on the first column or no selection exists
 */
export declare function isAtFirstColumn(grid: any): boolean;
/**
 * Checks if a header/footer cell is a content cell (contains a filter widget).
 * Content cells have the dhx_grid-custom-content-cell class.
 * @param target - the DOM element to check
 * @returns true if the element is a content cell
 */
export declare function isContentCell(target: HTMLElement): boolean;
/**
 * Activates the inner widget of a content cell (Enter on a filter cell).
 * Sets tabindex="0" on the inner input/select and focuses it.
 * Attaches an Escape keydown listener directly on the inner element to handle
 * widgets that call stopPropagation (e.g., ComboFilter closing its popup).
 * @param target - the content cell DOM element
 */
export declare function activateContentCell(target: HTMLElement): void;
/**
 * Deactivates the inner widget of a content cell (Escape from an active filter).
 * Restores tabindex="-1" on the inner element, removes the Escape listener,
 * and returns focus to the outer cell.
 * @param cell - the content cell DOM element to deactivate
 */
export declare function deactivateContentCell(cell: HTMLElement): void;
/**
 * Triggers column sorting on a header cell via keyboard (Enter/Space/Shift+Enter).
 * Matches the click-based sort logic from ExtendedGrid.
 * Skips content cells (filters) and colspan cells.
 * After the sort triggers a re-render, restores focus to the same cell.
 * @param grid - the grid instance
 * @param event - the keyboard event
 * @param isModifierKey - if true, toggles multi-sort behavior (Shift+Enter)
 */
export declare function triggerHeaderSort(grid: any, event: KeyboardEvent, isModifierKey?: boolean): void;
/**
 * Sets focus on a zone cell using the roving tabindex pattern.
 * Scrolls the column into view first (the cell may not exist in the DOM due to
 * virtualized rendering), then sets tabindex="0" and focuses the target cell.
 * Updates the sentinel state to track the last active position and logical navigation row.
 * @param grid - the grid instance
 * @param zone - the focus zone containing the cell
 * @param colId - the column ID of the cell to focus
 * @param rowIndex - the row index of the cell to focus
 * @param prevCell - the previously focused cell (will get tabindex="-1")
 * @param navRowIndex - the logical navigation row to store (defaults to rowIndex)
 * @returns true if focus was set, or will be set after the redraw; false if the cell was not found
 */
export declare function setZoneCellFocus(grid: any, zone: FocusZone, colId: string, rowIndex: number, prevCell?: HTMLElement, navRowIndex?: number): boolean;
/**
 * Checks if focus is still in the body data area, or was dropped to the page.
 * Focus is dropped to the page when the focused editor is removed. Focus that has moved on,
 * out of the widget or into the header or the footer, is not in the body.
 * Used after an edit ends, so that focus is returned to the active cell only when nothing moved it away.
 * @param grid - the grid instance
 * @returns true if focus is in the body or on the page body element
 */
export declare function isFocusInBody(grid: any): boolean;
/**
 * Transitions focus from a header/footer zone to the body data area.
 * Selects the first or last row in the specified column, using either
 * cell selection or block (range) selection depending on the grid config.
 * Falls back to manual focus if restoreFocus() doesn't reach the cell
 * (e.g., fixed columns outside .dhx_grid_data).
 * @param grid - the grid instance
 * @param colId - the column to focus in the body
 * @param position - "first" to select the first row, "last" to select the last row
 */
export declare function transitionToBody(grid: any, colId: string, position: "first" | "last"): void;
/**
 * Transitions focus from the body data area to a header/footer zone.
 * Resolves span targets and sets focus on the appropriate zone cell.
 * @param grid - the grid instance
 * @param zone - the target zone to transition to
 * @param colId - the column to focus in the zone
 * @param rowIndex - the row index in the zone (defaults to the last row)
 */
export declare function transitionFromBodyToZone(grid: any, zone: FocusZone, colId: string, rowIndex?: number): void;
/**
 * Checks if the active body cell is on the first data row.
 * Works with both cell selection and block (range) selection modes.
 * @param grid - the grid instance
 * @returns true if the selection is on the first row or no selection exists
 */
export declare function isAtFirstRow(grid: any): boolean;
/**
 * Checks if the active body cell is on the last data row.
 * For tree grids, considers the deepest last child as the last row.
 * Works with both cell selection and block (range) selection modes.
 * @param grid - the grid instance
 * @returns true if the selection is on the last row or no selection exists
 */
export declare function isAtLastRow(grid: any): boolean;
/**
 * Checks if the grid has a footer zone with at least one row.
 * @param grid - the grid instance
 * @returns true if footer row count is greater than 0
 */
export declare function hasFooter(grid: any): boolean;
/**
 * Returns the column ID of the currently active body cell.
 * Reads from range selection (xStart) or cell selection depending on config.
 * @param grid - the grid instance
 * @returns the active column ID, or null if no cell is selected
 */
export declare function getActiveColumnId(grid: any): string | null;
/**
 * Extracts the column ID from a DOM element's data-dhx-id attribute.
 * @param target - the DOM element to read from
 * @returns the column ID string, or null if the attribute is missing
 */
export declare function getColIdFromTarget(target: HTMLElement): string | null;
/**
 * Resets all zone cells and their inner elements to tabindex="-1".
 * Called when leaving a zone to ensure the sentinel remains the sole Tab entry point.
 * Also resets inner filter inputs/selects (including ComboFilter inputs
 * that don't get tabindex via VDOM).
 * @param grid - the grid instance
 * @param zone - the zone whose cells should be reset
 */
export declare function restoreZoneTabindex(grid: any, zone: FocusZone): void;
/**
 * Hands focus to the sentinel on one side of the widget so that the browser's own Tab handling
 * continues from the edge of the widget instead of from the boundary cell.
 * The sentinels are the first and the last child of the widget root and are already the widget's
 * entry points, so their own focus listeners are suppressed for this one focus.
 * @param grid - the grid instance
 * @param direction - "forward" for Tab, "backward" for Shift+Tab
 * @returns true if the sentinel was found and focused
 */
export declare function exitThroughSentinel(grid: any, direction: "forward" | "backward"): boolean;
/**
 * Initializes the start focus sentinel for the grid.
 * Attaches a focus listener on the .dhx_grid-focus-sentinel element that redirects
 * focus to the stored header cell position (or the first cell on initial entry).
 * Validates the stored column and row index before focusing.
 * Only runs once per grid instance (tracked via sentinelStateMap).
 * @param grid - the grid instance
 */
export declare function initFocusSentinel(grid: any): void;
/**
 * Initializes the end focus sentinel for backward Tab entry.
 * When Shift+Tab from outside the grid lands on the end sentinel,
 * redirects focus to the footer's last cell, or to the header's first cell
 * if the grid has no footer.
 * Only runs once per sentinel element (tracked via data-dhx-initialized attribute).
 * @param grid - the grid instance
 */
export declare function initEndSentinel(grid: any): void;
