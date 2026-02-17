import { VNode } from "../../../../ts-common/dom";
import { ILayoutState, IProGrid, IRendererConfig } from "../../types";
export interface IDragPanelState {
    lessHeight: boolean;
    footerAtBottom: boolean;
}
export declare function getDragPanelNode(grid: IProGrid, config: IRendererConfig, scroll: ILayoutState, lessByHeight?: boolean): VNode;
