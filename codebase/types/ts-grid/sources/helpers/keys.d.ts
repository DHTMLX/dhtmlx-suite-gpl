/**
 * Creates keyboard event handlers for grid navigation, editing, and zone transitions.
 * Initializes focus sentinels and returns a map of key handlers used by KeyManager.
 * Each handler routes to zone-specific logic (header/footer) or body cell navigation
 * depending on the current focus position.
 * @param grid - the grid instance (IProGrid or IExtendedGrid)
 * @returns an object mapping key names to their handler functions
 */
export declare function getKeysHandlers(grid: any): {
    enter: (e: any) => void;
    f2: () => void;
    space: (e: any) => void;
    escape: (e: any) => void;
    tab: (e: any) => void;
    delete: () => void;
    "shift+tab": (e: any) => void;
    arrowUp: (e: any) => void;
    "shift+enter": (e: any) => void;
    "ctrl+z": () => void;
    "ctrl+shift+z": () => void;
    "ctrl+enter": () => void;
    "ctrl+arrowUp": (e: any) => void;
    "shift+arrowUp": (e: any) => void;
    "ctrl+shift+arrowUp": (e: any) => void;
    arrowDown: (e: any) => void;
    "ctrl+arrowDown": (e: any) => void;
    "shift+arrowDown": (e: any) => void;
    "ctrl+shift+arrowDown": (e: any) => void;
    arrowRight: (e: any) => void;
    "ctrl+arrowRight": (e: any) => void;
    "shift+arrowRight": (e: any) => void;
    "ctrl+shift+arrowRight": (e: any) => void;
    arrowLeft: (e: any) => void;
    "ctrl+arrowLeft": (e: any) => void;
    "shift+arrowLeft": (e: any) => void;
    "ctrl+shift+arrowLeft": (e: any) => void;
    pageDown: (e: any) => void;
    pageUp: (e: any) => void;
    "shift+pageDown": (e: any) => void;
    "shift+pageUp": (e: any) => void;
    home: (e: any) => void;
    end: (e: any) => void;
    "shift+home": (e: any) => void;
    "shift+end": (e: any) => void;
    "ctrl+home": (e: any) => void;
    "ctrl+end": (e: any) => void;
    "ctrl+shift+home": (e: any) => void;
    "ctrl+shift+end": (e: any) => void;
};
