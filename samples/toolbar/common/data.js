var data = [
    {
        id: "other",
        icon: "mdi mdi-menu",
        type: "button",
        view: "link",
        circle: true,
        color: "secondary",
    },
    {
        id: "add",
        icon: "mdi mdi-plus",
        value: "Add"
    },
    {
        type: "separator"
    },
    {
        id: "language",
        value: "Language",
        items: [
            {
                id: "eng",
                value: "English"
            },
            {
                id: "spa",
                value: "Spanish"
            },
            {
                id: "rus",
                value: "Russian"
            },
            {
                id: "de",
                value: "Deutsch"
            }
        ]
    },
    {
        id: "skin",
        value: "Skin",
        items: [
            {
                id: "material",
                value: "Material"
            },
            {
                id: "skyblue",
                value: "Skyblue"
            },
            {
                id: "web",
                value: "Web"
            },
            {
                id: "terrace",
                value: "Terrace"
            },
        ]
    },
    {
        type: "separator"
    },
    {
        id: "edit",
        value: "Edit"
    },
    {
        id: "search",
        type: "input",
        placeholder: "Search",
        icon: "mdi mdi-magnify"
    },
    {
        type: "spacer"
    },
    {
        id: "notifications",
        icon: "mdi mdi-bell",
        tooltip: "Notifications",
        count: 7,
        "type": "button",
        "view": "link",
        "color": "secondary",
        "circle": true,
    },
    {
        id: "avatar",
        type: "imageButton",
        src: "../common/ava.png",
        count: 15
    }
];