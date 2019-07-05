var menuStruct = [
    {
    id: "edit", value: "edit", items: [
            { id: "undo", value: "undo", icon: "mdi mdi-undo" },
            { id: "redo", value: "redo", icon: "mdi mdi-redo" },
            { type: "separator" },
            { id: "lock", value: "lockCell", icon: "mdi mdi-key" },
            { type: "separator" },
            {
                id: "clear", value: "clear", icon: "mdi mdi-eraser", items: [
                    {
                        id: "clear-value",
                        value: "clearValue"
                    },
                    {
                        id: "clear-styles",
                        value: "clearStyles"
                    },
                    {
                        id: "clear-all",
                        value: "clearAll"
                    }
                ]
            }
        ]

    },
    {
        id: "insert", value: "insert", items: [
            {
                id: "columns", value: "columns", icon: "mdi mdi-table-column", items: [
                    {
                        id: "add-col",
                        value: "addColumn",
                        icon: "mdi mdi-table-column-plus-before"
                    },
                    {
                        id: "remove-col",
                        value: "removeColumn",
                        icon: "mdi mdi-table-column-remove"
                    }
                ]
            },
            {
                id: "rows", value: "rows", icon: "mdi mdi-table-row", items: [
                    {
                        id: "add-row",
                        value: "addRow",
                        icon: "mdi mdi-table-row-plus-after"
                    },
                    {
                        id: "remove-row",
                        value: "removeRow",
                        icon: "mdi mdi-table-row-remove"
                    }
                ]
            }
        ]
    },
    {
        id: "configuration", value: "format", items: [
            {
                id: "font-weight-bold",
                value: "bold",
                icon: "mdi mdi-format-bold"
            },
            {
                id: "font-style-italic",
                value: "italic",
                icon: "mdi mdi-format-italic"
            },
            {
                id: "text-decoration-underline",
                value: "underline",
                icon: "mdi mdi-format-underline"
            },
            { type: "separator" },
            {
                id: "align", value: "align", items: [
                    {
                        id: "align-left",
                        value: "left",
                        icon: "mdi mdi-format-align-left"
                    },
                    {
                        id: "align-center",
                        value: "center",
                        icon: "mdi mdi-format-align-center"
                    },
                    {
                        id: "align-right",
                        value: "right",
                        icon: "mdi mdi-format-align-right"
                    }
                ]
            }
        ]
    },
    {
        value: "help", items: [
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
                value: "Bug Reporting",
                icon: "mdi mdi-bug"
            }
        ]
    }
];


var contextMenuStruct = [
    { type: "menuItem", id: "add", value: "Add", icon: "mdi mdi-plus" },
    { type: "menuItem", id: "rename", value: "Rename", icon: "mdi mdi-pencil" },
    { type: "menuItem", id: "delete", value: "Delete", icon: "mdi mdi-delete", hotkey: "Del" },
    { type: "separator" },
    { type: "menuItem", id: "info", value: "Info", icon: "mdi mdi-information" }
];