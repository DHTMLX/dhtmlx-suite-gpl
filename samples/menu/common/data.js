const dataset = [
	{
		id: "edit",
		value: "Edit",
		hotKey: "ctrl-z",
		count: 25,
		countColor: "success",
		items: [
			{
				id: "undo",
				value: "Undo",
				icon: "dxi dxi-undo",
				hotKey: "Ctrl-z",
				count: 25,
				countColor: "danger",
				items: [
					{
						id: "redo1",
						value: "Redo",
						icon: "dxi dxi-redo",
						disabled: "true",
					},
					{
						type: "separator",
					},
					{
						id: "lock1",
						value: "Lock cell",
						icon: "dxi dxi-key",
					},
				],
			},
			{
				id: "redo",
				value: "Redo",
				icon: "dxi dxi-redo",
			},
			{
				type: "separator",
			},
			{
				id: "lock",
				value: "Lock cell",
				icon: "dxi dxi-key",
			},
			{
				id: "clear",
				value: "Clear",
				icon: "dxi dxi-eraser",
				items: [
					{
						id: "clear-value",
						value: "Clear value",
					},
					{
						id: "clear-styles",
						value: "Clear styles",
					},
					{
						id: "clear-all",
						value: "Clear all",
					},
				],
			},
		],
	},
	{
		type: "separator",
	},
	{
		id: "insert",
		value: "Insert",
		disabled: true,
		items: [
			{
				id: "columns",
				value: "Columns",
				icon: "dxi dxi-table-column",
				items: [
					{
						id: "add-col",
						value: "Add column",
						icon: "dxi dxi-table-column-plus-before",
					},
					{
						id: "remove-col",
						value: "Remove column",
						icon: "dxi dxi-table-column-remove",
					},
				],
			},
			{
				id: "rows",
				value: "Rows",
				icon: "dxi dxi-table-row",
				items: [
					{
						id: "add-row",
						value: "Add row",
						icon: "dxi dxi-table-row-plus-after",
					},
					{
						id: "remove-row",
						value: "Remove row",
						icon: "dxi dxi-table-row-remove",
					},
				],
			},
		],
	},
	{
		id: "configuration",
		value: "Format",
		items: [
			{
				id: "font-weight-bold",
				value: "Bold",
				icon: "dxi dxi-format-bold",
			},
			{
				id: "font-style-italic",
				value: "Italic",
				icon: "dxi dxi-format-italic",
			},
			{
				id: "text-decoration-underline",
				value: "Underline",
				icon: "dxi dxi-format-underline",
			},
			{
				type: "separator",
			},
			{
				id: "align",
				value: "Align",
				icon: "dxi dxi-empty",
				items: [
					{
						id: "align-left",
						value: "Left",
						icon: "dxi dxi-format-align-left",
					},
					{
						id: "align-center",
						value: "Center",
						icon: "dxi dxi-format-align-center",
					},
					{
						id: "align-right",
						value: "Right",
						icon: "dxi dxi-format-align-right",
					},
				],
			},
		],
	},
	{
		type: "spacer",
	},
	{
		value: "Help",
		items: [
			{
				id: "about",
				value: "About",
				icon: "mdi mdi-information-variant",
			},
			{
				id: "help",
				value: "Help",
				icon: "mdi mdi-help",
			},
			{
				id: "bug",
				value: "Bug reporting",
				icon: "mdi mdi-bug",
			},
		],
	},
];
const datasetContextMenu = [{
	"type": "menuItem",
	"id": "add",
	"value": "Add",
	"icon": "mdi mdi-plus",
	"items": [
		{
			"id": "redo1",
			"value": "redo",
			"icon": "mdi mdi-redo",
			"disabled": "true"
		}, {
			"type": "separator"
		}, {
			"id": "lock1",
			"value": "lockCell",
			"icon": "mdi mdi-key"
		}
	]
}, {
	"type": "menuItem",
	"id": "rename",
	"value": "Rename",
	"icon": "mdi mdi-pencil"
}, {
	"type": "menuItem",
	"id": "delete",
	"value": "Delete",
	"icon": "mdi mdi-delete",
	"hotkey": "Del"
}, {
	"type": "separator"
}, {
	"type": "menuItem",
	"id": "info",
	"value": "Info",
	"icon": "mdi mdi-information"
}]
