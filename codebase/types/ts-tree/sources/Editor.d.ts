import { VNode } from "../../ts-common/dom";
import { IEventSystem } from "../../ts-common/events";
export declare enum EditorMode {
    editText = "text",
    selectItem = "select"
}
export declare enum EditorEvents {
    begin = "begin",
    end = "end"
}
export interface IEditorConfig {
    item?: any;
    mode: EditorMode;
    options?: string[];
}
export interface IEditor {
    config: IEditorConfig;
    events: IEventSystem<EditorEvents>;
    edit(targetId: string, config: IEditorConfig): VNode;
    isEditable(): boolean;
}
export declare class Editor implements IEditor {
    config: IEditorConfig;
    events: IEventSystem<EditorEvents>;
    private _item;
    private _handlers;
    private _currentValue;
    private _active;
    private _targetId;
    private _documentClick;
    private _keyManager;
    constructor();
    edit(targetId: string, config: IEditorConfig): any;
    isEditable(): boolean;
    private _draw;
    private _addHotkeys;
    private _removeHotkeys;
    private _finishEdit;
    private _clear;
    private _initOuterClick;
    private _removeClickListener;
}
