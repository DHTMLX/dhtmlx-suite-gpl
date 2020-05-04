var menuStruct = [
    {
        id: "edit", value: "Edit", items: [
            {id: "undo", value: "Undo", icon: "mdi mdi-undo"},
            {id: "redo", value: "Redo", icon: "mdi mdi-redo"},
            {type: "separator"},
            {id: "lock", value: "Lock cell", icon: "mdi mdi-key"},
            {type: "separator"},
            {
                id: "clear", value: "Clear", icon: "mdi mdi-eraser", items: [
                    {
                        id: "clear-value",
                        value: "Clear value"
                    },
                    {
                        id: "clear-styles",
                        value: "Clear styles"
                    },
                    {
                        id: "clear-all",
                        value: "Clear all"
                    }
                ]
            }
        ]

    },
    {
        id: "insert", value: "Insert", items: [
            {
                id: "columns", value: "Columns", icon: "mdi mdi-table-column", items: [
                    {
                        id: "add-col",
                        value: "Add column",
                        icon: "mdi mdi-table-column-plus-before"
                    },
                    {
                        id: "remove-col",
                        value: "Remove column",
                        icon: "mdi mdi-table-column-remove"
                    }
                ]
            },
            {
                id: "rows", value: "Rows", icon: "mdi mdi-table-row", items: [
                    {
                        id: "add-row",
                        value: "Add row",
                        icon: "mdi mdi-table-row-plus-after"
                    },
                    {
                        id: "remove-row",
                        value: "Remove row",
                        icon: "mdi mdi-table-row-remove"
                    }
                ]
            }
        ]
    },
    {
        id: "configuration", value: "Format", items: [
            {
                id: "font-weight-bold",
                value: "Bold",
                icon: "mdi mdi-format-bold"
            },
            {
                id: "font-style-italic",
                value: "Italic",
                icon: "mdi mdi-format-italic"
            },
            {
                id: "text-decoration-underline",
                value: "Underline",
                icon: "mdi mdi-format-underline"
            },
            {type: "separator"},
            {
                id: "align", value: "Align", "icon": "dxi dxi-empty", items: [
                    {
                        id: "align-left",
                        value: "Left",
                        icon: "mdi mdi-format-align-left"
                    },
                    {
                        id: "align-center",
                        value: "Center",
                        icon: "mdi mdi-format-align-center"
                    },
                    {
                        id: "align-right",
                        value: "Right",
                        icon: "mdi mdi-format-align-right"
                    }
                ]
            }
        ]
    },
    {
        value: "Help", items: [
            {
                id: "about",
                value: "About",
                icon: "mdi mdi-information-variant"
            },
            {
                id: "help",
                value: "Help",
                icon: "mdi mdi-help"
            },
            {
                id: "bug",
                value: "Bug reporting",
                icon: "mdi mdi-bug"
            }
        ]
    }
];


var contextMenuStruct = [
    {type: "menuItem", id: "add", value: "Add", icon: "mdi mdi-plus"},
    {type: "menuItem", id: "rename", value: "Rename", icon: "mdi mdi-pencil"},
    {type: "menuItem", id: "delete", value: "Delete", icon: "mdi mdi-delete", hotkey: "Del"},
    {type: "separator"},
    {type: "menuItem", id: "info", value: "Info", icon: "mdi mdi-information"}
];