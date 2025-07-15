import { VNode } from "../../../ts-common/dom";
export declare class DropManager {
    private _isTreeMode;
    private _grid;
    private _dragState;
    private _dragType;
    constructor({ view }: {
        view: any;
    });
    toHTML(state?: any): VNode;
    private _getDropLineNode;
    private _getVerticalDropLine;
    private _getHorizontalDropLine;
    private _init;
    private _getNextRow;
    private _isColumnFixed;
    private _getTopPosition;
    private _getBottomPosition;
    private _toggleRowDraggable;
    private _isSameComponent;
}
