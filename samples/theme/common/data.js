const sidebarData = [
	{
		id: "toggle",
		css: "toggle-button",
		icon: "mdi mdi-backburger",
	},
	{
		type: "customHTML",
		id: "userInfo",
		css: "user-info_item",
		html:
			"<div class='user-info_container'>" +
			"<img class='user-info_avatar' src='https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_63.jpg'/>" +
			"<div class='user-info_title'>" +
			"Gloria McKinney" +
			"</div>" +
			"<div class='user-info_contact'>" +
			"@gmckinney" +
			"</div>" +
			"</div>",
	},
	{
		type: "separator",
	},
	{
		id: "today",
		value: "Today",
		icon: "mdi mdi-calendar-star",
	},
	{
		id: "overdue",
		value: "Overdue",
		icon: "mdi mdi-calendar-start",
	},
	{
		id: "unscheduled",
		value: "Unscheduled",
		icon: "mdi mdi-calendar-blank",
	},
	{
		type: "separator",
	},
	{
		id: "projects",
		value: "Projects",
		icon: "mdi mdi-folder-star-outline",
		items: [
			{
				id: "project1",
				value: "Project 1",
				icon: "mdi mdi-plus",
			},
			{
				id: "project2",
				value: "Project 2",
				icon: "mdi mdi-plus",
			},
			{
				id: "project3",
				value: "Project 3",
				icon: "mdi mdi-plus",
			},
		],
	},
	{
		type: "separator",
	},
	{
		id: "assigned",
		value: "Assigned",
		icon: "mdi mdi-account-search-outline",
		items: [
			{
				id: "person1",
				value: "Person 1",
				icon: "mdi mdi-plus",
			},
			{
				id: "person2",
				value: "Person 2",
				icon: "mdi mdi-plus",
			},
			{
				id: "Person3",
				value: "person 3",
				icon: "mdi mdi-plus",
			},
		],
	},
	{
		type: "separator",
	},
	{
		type: "spacer",
	},
	{
		type: "separator",
	},
	{
		id: "notification",
		value: "Notification",
		count: 18,
		icon: "mdi mdi-bell-outline",
		countColor: "#D60000",
	},
	{
		id: "configuration",
		value: "Configuration",
		icon: "mdi mdi-tune",
		items: [
			{
				id: "myAccount",
				value: "My Account",
				icon: "mdi mdi-account-settings",
			},
			{
				id: "general",
				value: "General Configuration",
				icon: "mdi mdi-tune",
			},
		],
	},
];

const topmenuData = [
	{
		id: "topMenuButton",
		type: "button",
		value: "Toolbar button",
		view: "flat",
		icon: "dxi dxi-plus",
		size: "small",
		circle: true,
		color: "secondary",
	},

	{
		type: "spacer",
	},
	{
		id: "topmenuLinks",
		icon: "mdi mdi-earth",
		tooltip: "Links",
		type: "button",
		view: "link",
		color: "secondary",
		circle: true,
	},
	{
		id: "setting",
		icon: "mdi mdi-cog",
		tooltip: "Setting",
		type: "button",
		view: "link",
		color: "secondary",
		circle: true,
	},
	{
		id: "topmenuInfo",
		icon: "mdi mdi-alert-circle-outline",
		tooltip: "Info",
		type: "button",
		view: "link",
		color: "secondary",
		circle: true,
	},
	{
		id: "avatar",
		type: "imageButton",
		src: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_63.jpg",
		count: 15,
	},
];
const topNavigatorData = [
	{
		type: "spacer",
	},
	{
		id: "dashboard",
		value: "DASHBOARD",
		// add-remove active class to restyle button
		css: "top-nav_item dhx_button--color_primary active",
	},
	{
		id: "reports",
		value: "REPORTS",
		css: "top-nav_item dhx_button--color_primary",
	},
	{
		id: "tickets",
		value: "TICKETS",
		css: "top-nav_item dhx_button--color_primary",
	},
	{
		id: "users",
		value: "USERS",
		css: "top-nav_item dhx_button--color_primary",
	},
	{
		id: "applications",
		value: "APPLICATIONS",
		css: "top-nav_item dhx_button--color_primary",
	},
	{
		type: "spacer",
	},
];

// Data for grid
const gridDataset = [
	{
		time: new Date("Jan 28, 2021"),
		nights: 7,
		price: 68,
		contactPerson: "Yoshio Slater",
		contactEmail: "phasellus.fermentum@yahoo.net",
	},
	{
		time: new Date("Apr 13, 2021"),
		nights: 6,
		price: 66,
		contactPerson: "Christopher Kirk",
		contactEmail: "posuere.vulputate.lacus@outlook.org",
	},
	{
		time: new Date("Jan 31, 2021"),
		nights: 15,
		price: 64,
		contactPerson: "Jana Meyers",
		contactEmail: "mollis@aol.edu",
	},
	{
		time: new Date("Feb 22, 2021"),
		nights: 11,
		price: 57,
		contactPerson: "Sawyer Smith",
		contactEmail: "lorem.ipsum.sodales@icloud.org",
	},
	{
		time: new Date("Feb 3, 2021"),
		nights: 10,
		price: 68,
		contactPerson: "Gabriel Gates",
		contactEmail: "sollicitudin.a@icloud.com",
	},
	{
		time: new Date("Apr 6, 2021"),
		nights: 7,
		price: 67,
		contactPerson: "Emily Reynolds",
		contactEmail: "suspendisse.aliquet@outlook.edu",
	},
	{
		time: new Date("May 22, 2021"),
		nights: 11,
		price: 70,
		contactPerson: "Xavier Middleton",
		contactEmail: "eu@icloud.net",
	},
	{
		time: new Date("Jul 9, 2021"),
		nights: 11,
		price: 61,
		contactPerson: "Tamara Raymond",
		contactEmail: "vivamus@yahoo.ca",
	},
	{
		time: new Date("Jun 15, 2021"),
		nights: 15,
		price: 61,
		contactPerson: "Jolene Lamb",
		contactEmail: "vulputate.posuere@outlook.org",
	},
	{
		time: new Date("Jan 31, 2021"),
		nights: 15,
		price: 70,
		contactPerson: "David Wilkins",
		contactEmail: "ipsum@icloud.org",
	},
	{
		time: new Date("Aug 16, 2021"),
		nights: 8,
		price: 65,
		contactPerson: "Nita Padilla",
		contactEmail: "quis.pede@google.net",
	},
	{
		time: new Date("Apr 4, 2021"),
		nights: 13,
		price: 73,
		contactPerson: "Martha Fischer",
		contactEmail: "elit.pharetra@hotmail.org",
	},
	{
		time: new Date("Jun 7, 2021"),
		nights: 14,
		price: 69,
		contactPerson: "Rudyard Powell",
		contactEmail: "ridiculus.mus@aol.com",
	},
	{
		time: new Date("Sep 14, 2021"),
		nights: 11,
		price: 68,
		contactPerson: "Clementine Mercer",
		contactEmail: "nec@aol.couk",
	},
	{
		time: new Date("Aug 3, 2021"),
		nights: 14,
		price: 74,
		contactPerson: "Hu Pace",
		contactEmail: "phasellus.dolor.elit@hotmail.net",
	},
	{
		time: new Date("Sep 12, 2021"),
		nights: 13,
		price: 73,
		contactPerson: "Petra James",
		contactEmail: "luctus.et@yahoo.net",
	},
	{
		time: new Date("Aug 4, 2021"),
		nights: 14,
		price: 60,
		contactPerson: "Chaney Henson",
		contactEmail: "in.condimentum@protonmail.net",
	},
	{
		time: new Date("Jul 15, 2021"),
		nights: 13,
		price: 59,
		contactPerson: "Cole Wallace",
		contactEmail: "in.aliquet@outlook.org",
	},
	{
		time: new Date("Jan 15, 2021"),
		nights: 13,
		price: 57,
		contactPerson: "Emmanuel Miller",
		contactEmail: "pharetra.quisque.ac@aol.edu",
	},
	{
		time: new Date("Sep 18, 2021"),
		nights: 9,
		price: 69,
		contactPerson: "Uriah Ayers",
		contactEmail: "nunc.sed.pede@google.net",
	},
	{
		time: new Date("May 24, 2021"),
		nights: 13,
		price: 73,
		contactPerson: "Illiana Floyd",
		contactEmail: "rhoncus.nullam@hotmail.ca",
	},
	{
		time: new Date("Jul 4, 2021"),
		nights: 3,
		price: 61,
		contactPerson: "Cara Merritt",
		contactEmail: "sagittis@yahoo.ca",
	},
	{
		time: new Date("Jan 27, 2021"),
		nights: 4,
		price: 70,
		contactPerson: "Yetta O'Neill",
		contactEmail: "nullam@aol.net",
	},
	{
		time: new Date("Aug 16, 2021"),
		nights: 9,
		price: 63,
		contactPerson: "Chadwick Holland",
		contactEmail: "congue.turpis@aol.net",
	},
	{
		time: new Date("Mar 22, 2021"),
		nights: 3,
		price: 59,
		contactPerson: "Nell Copeland",
		contactEmail: "nulla.vulputate@google.edu",
	},
	{
		time: new Date("Feb 26, 2021"),
		nights: 14,
		price: 74,
		contactPerson: "Vivian Fletcher",
		contactEmail: "bibendum.ullamcorper@icloud.net",
	},
	{
		time: new Date("Jun 26, 2021"),
		nights: 11,
		price: 58,
		contactPerson: "Tatiana Mckay",
		contactEmail: "ac.arcu@hotmail.ca",
	},
	{
		time: new Date("Jul 30, 2021"),
		nights: 9,
		price: 61,
		contactPerson: "Jamalia Mitchell",
		contactEmail: "sed.id.risus@aol.edu",
	},
	{
		time: new Date("Jun 15, 2021"),
		nights: 13,
		price: 66,
		contactPerson: "Hedy Kirby",
		contactEmail: "praesent.luctus@hotmail.com",
	},
	{
		time: new Date("Aug 16, 2021"),
		nights: 9,
		price: 67,
		contactPerson: "Solomon Ortiz",
		contactEmail: "sem.vitae@yahoo.com",
	},
	{
		time: new Date("Jul 15, 2021"),
		nights: 3,
		price: 67,
		contactPerson: "Adrienne O'Neill",
		contactEmail: "dapibus.gravida@protonmail.ca",
	},
	{
		time: new Date("Jul 1, 2021"),
		nights: 7,
		price: 72,
		contactPerson: "Alma Rollins",
		contactEmail: "orci@protonmail.ca",
	},
	{
		time: new Date("Jul 22, 2021"),
		nights: 11,
		price: 74,
		contactPerson: "Gregory Boyd",
		contactEmail: "curabitur.consequat.lectus@yahoo.net",
	},
	{
		time: new Date("Apr 24, 2021"),
		nights: 8,
		price: 74,
		contactPerson: "Damon Curry",
		contactEmail: "aliquam.fringilla@hotmail.org",
	},
	{
		time: new Date("Mar 8, 2021"),
		nights: 5,
		price: 63,
		contactPerson: "Imelda Tyson",
		contactEmail: "nunc.interdum@icloud.edu",
	},
	{
		time: new Date("Apr 13, 2021"),
		nights: 8,
		price: 57,
		contactPerson: "Yen Cannon",
		contactEmail: "nunc@outlook.couk",
	},
	{
		time: new Date("Feb 27, 2021"),
		nights: 5,
		price: 73,
		contactPerson: "Olivia Patterson",
		contactEmail: "posuere@google.org",
	},
	{
		time: new Date("Apr 21, 2021"),
		nights: 13,
		price: 59,
		contactPerson: "Ramona Logan",
		contactEmail: "est@hotmail.ca",
	},
	{
		time: new Date("Jul 8, 2021"),
		nights: 4,
		price: 67,
		contactPerson: "Risa Butler",
		contactEmail: "suscipit.est.ac@yahoo.net",
	},
	{
		time: new Date("Feb 19, 2021"),
		nights: 3,
		price: 71,
		contactPerson: "Charity Price",
		contactEmail: "lobortis.augue.scelerisque@protonmail.couk",
	},
	{
		time: new Date("Feb 23, 2021"),
		nights: 15,
		price: 59,
		contactPerson: "Rina Macdonald",
		contactEmail: "quisque@outlook.com",
	},
	{
		time: new Date("Apr 8, 2021"),
		nights: 16,
		price: 68,
		contactPerson: "Travis Steele",
		contactEmail: "natoque.penatibus@google.edu",
	},
	{
		time: new Date("Apr 30, 2021"),
		nights: 9,
		price: 64,
		contactPerson: "Deanna Reyes",
		contactEmail: "dolor@hotmail.net",
	},
	{
		time: new Date("Feb 15, 2021"),
		nights: 14,
		price: 67,
		contactPerson: "Faith Rojas",
		contactEmail: "sagittis.duis.gravida@hotmail.edu",
	},
	{
		time: new Date("Mar 1, 2021"),
		nights: 4,
		price: 73,
		contactPerson: "Hyacinth Fuentes",
		contactEmail: "nec.urna@google.com",
	},
	{
		time: new Date("May 9, 2021"),
		nights: 2,
		price: 71,
		contactPerson: "Brenden Sloan",
		contactEmail: "a.dui.cras@google.net",
	},
	{
		time: new Date("Feb 17, 2021"),
		nights: 8,
		price: 74,
		contactPerson: "Nora Bruce",
		contactEmail: "egestas.blandit@google.org",
	},
	{
		time: new Date("Jul 20, 2021"),
		nights: 10,
		price: 68,
		contactPerson: "Riley Harrison",
		contactEmail: "lacus@outlook.ca",
	},
	{
		time: new Date("May 24, 2021"),
		nights: 12,
		price: 74,
		contactPerson: "Mariko Lewis",
		contactEmail: "volutpat@google.couk",
	},
	{
		time: new Date("Feb 16, 2021"),
		nights: 2,
		price: 68,
		contactPerson: "Todd Jones",
		contactEmail: "cras.eu.tellus@icloud.org",
	},
	{
		time: new Date("Apr 21, 2021"),
		nights: 16,
		price: 69,
		contactPerson: "Tasha Mcleod",
		contactEmail: "quam.a@protonmail.org",
	},
	{
		time: new Date("Aug 28, 2021"),
		nights: 10,
		price: 74,
		contactPerson: "Fletcher Bird",
		contactEmail: "tincidunt@yahoo.com",
	},
	{
		time: new Date("Apr 19, 2021"),
		nights: 3,
		price: 57,
		contactPerson: "Alan Murphy",
		contactEmail: "tempor.erat.neque@icloud.com",
	},
	{
		time: new Date("Jan 26, 2021"),
		nights: 13,
		price: 71,
		contactPerson: "Hakeem Booth",
		contactEmail: "porttitor.tellus@hotmail.com",
	},
	{
		time: new Date("Feb 4, 2021"),
		nights: 11,
		price: 67,
		contactPerson: "Courtney Sellers",
		contactEmail: "penatibus.et@outlook.ca",
	},
	{
		time: new Date("Jul 28, 2021"),
		nights: 11,
		price: 67,
		contactPerson: "Frances Mcdonald",
		contactEmail: "libero.dui@aol.org",
	},
	{
		time: new Date("Jan 24, 2021"),
		nights: 6,
		price: 72,
		contactPerson: "Devin Mathews",
		contactEmail: "proin.nisl.sem@google.couk",
	},
	{
		time: new Date("May 13, 2021"),
		nights: 10,
		price: 71,
		contactPerson: "Arden Sparks",
		contactEmail: "arcu.sed@google.edu",
	},
	{
		time: new Date("Apr 1, 2021"),
		nights: 2,
		price: 55,
		contactPerson: "Roanna Calhoun",
		contactEmail: "nisi.aenean@outlook.edu",
	},
	{
		time: new Date("Feb 9, 2021"),
		nights: 12,
		price: 66,
		contactPerson: "Zeph Ellis",
		contactEmail: "nonummy.ipsum.non@aol.org",
	},
	{
		time: new Date("Jun 10, 2021"),
		nights: 10,
		price: 73,
		contactPerson: "Harriet Lee",
		contactEmail: "mauris.quis@aol.edu",
	},
	{
		time: new Date("Jan 25, 2021"),
		nights: 7,
		price: 60,
		contactPerson: "Chanda Gay",
		contactEmail: "egestas.blandit.nam@yahoo.ca",
	},
	{
		time: new Date("Aug 22, 2021"),
		nights: 12,
		price: 56,
		contactPerson: "Tiger Roman",
		contactEmail: "et@aol.org",
	},
	{
		time: new Date("Aug 6, 2021"),
		nights: 13,
		price: 59,
		contactPerson: "Yuri Booker",
		contactEmail: "pretium.neque@google.ca",
	},
	{
		time: new Date("Apr 12, 2021"),
		nights: 7,
		price: 56,
		contactPerson: "Blaze Gardner",
		contactEmail: "sed.leo@aol.ca",
	},
	{
		time: new Date("Jun 13, 2021"),
		nights: 4,
		price: 73,
		contactPerson: "Vanna Nieves",
		contactEmail: "amet.consectetuer@google.edu",
	},
	{
		time: new Date("May 8, 2021"),
		nights: 4,
		price: 58,
		contactPerson: "Malik Mullins",
		contactEmail: "pede.nec@yahoo.org",
	},
	{
		time: new Date("Apr 25, 2021"),
		nights: 5,
		price: 60,
		contactPerson: "Sarah Goodwin",
		contactEmail: "condimentum.eget@icloud.couk",
	},
	{
		time: new Date("Jan 13, 2021"),
		nights: 5,
		price: 73,
		contactPerson: "Nigel Griffin",
		contactEmail: "ornare@yahoo.edu",
	},
	{
		time: new Date("Mar 25, 2021"),
		nights: 6,
		price: 67,
		contactPerson: "Lysandra Gregory",
		contactEmail: "in.ornare@protonmail.edu",
	},
	{
		time: new Date("Sep 28, 2021"),
		nights: 8,
		price: 70,
		contactPerson: "Breanna Williamson",
		contactEmail: "nulla.integer@yahoo.ca",
	},
	{
		time: new Date("Feb 10, 2021"),
		nights: 5,
		price: 61,
		contactPerson: "Edward Black",
		contactEmail: "lobortis.mauris@icloud.couk",
	},
	{
		time: new Date("Jul 28, 2021"),
		nights: 5,
		price: 56,
		contactPerson: "Imogene Stafford",
		contactEmail: "donec@icloud.net",
	},
	{
		time: new Date("Aug 7, 2021"),
		nights: 15,
		price: 56,
		contactPerson: "Clark Garcia",
		contactEmail: "sed.leo@hotmail.com",
	},
	{
		time: new Date("Sep 6, 2021"),
		nights: 6,
		price: 55,
		contactPerson: "Uma Tate",
		contactEmail: "quam@hotmail.ca",
	},
	{
		time: new Date("Apr 9, 2021"),
		nights: 16,
		price: 60,
		contactPerson: "Kennedy Newton",
		contactEmail: "et.ultrices@protonmail.com",
	},
	{
		time: new Date("Jan 17, 2021"),
		nights: 13,
		price: 55,
		contactPerson: "Tana Fields",
		contactEmail: "felis.ullamcorper@aol.org",
	},
	{
		time: new Date("Sep 13, 2021"),
		nights: 9,
		price: 67,
		contactPerson: "Chelsea Burke",
		contactEmail: "nisi@aol.couk",
	},
	{
		time: new Date("Aug 6, 2021"),
		nights: 13,
		price: 66,
		contactPerson: "Samantha Hood",
		contactEmail: "ac.eleifend@outlook.ca",
	},
	{
		time: new Date("Jan 5, 2021"),
		nights: 11,
		price: 65,
		contactPerson: "Chester Wooten",
		contactEmail: "id.nunc.interdum@protonmail.net",
	},
	{
		time: new Date("Jun 8, 2021"),
		nights: 14,
		price: 69,
		contactPerson: "Vaughan Hopkins",
		contactEmail: "morbi.metus.vivamus@google.couk",
	},
	{
		time: new Date("Jan 28, 2021"),
		nights: 6,
		price: 58,
		contactPerson: "Sydnee Montoya",
		contactEmail: "donec.feugiat@protonmail.edu",
	},
	{
		time: new Date("Jun 4, 2021"),
		nights: 11,
		price: 73,
		contactPerson: "Kelly Espinoza",
		contactEmail: "ligula.donec@aol.com",
	},
	{
		time: new Date("May 18, 2021"),
		nights: 2,
		price: 70,
		contactPerson: "Jonah Solis",
		contactEmail: "orci.sem@google.couk",
	},
	{
		time: new Date("Jun 8, 2021"),
		nights: 3,
		price: 58,
		contactPerson: "Denton Taylor",
		contactEmail: "metus.urna@protonmail.couk",
	},
	{
		time: new Date("Feb 14, 2021"),
		nights: 4,
		price: 68,
		contactPerson: "Keely Sutton",
		contactEmail: "rutrum.non@hotmail.ca",
	},
	{
		time: new Date("May 17, 2021"),
		nights: 8,
		price: 67,
		contactPerson: "Derek Meyer",
		contactEmail: "posuere.enim.nisl@aol.org",
	},
	{
		time: new Date("Apr 18, 2021"),
		nights: 9,
		price: 73,
		contactPerson: "Phelan Pena",
		contactEmail: "ullamcorper.duis@google.net",
	},
	{
		time: new Date("Apr 3, 2021"),
		nights: 11,
		price: 71,
		contactPerson: "Maxwell Morales",
		contactEmail: "eu.nibh@outlook.ca",
	},
	{
		time: new Date("Aug 1, 2021"),
		nights: 6,
		price: 74,
		contactPerson: "Hope Hines",
		contactEmail: "rutrum.fusce@hotmail.couk",
	},
	{
		time: new Date("May 28, 2021"),
		nights: 11,
		price: 67,
		contactPerson: "Cullen Woodward",
		contactEmail: "luctus.et@protonmail.ca",
	},
	{
		time: new Date("Feb 5, 2021"),
		nights: 11,
		price: 63,
		contactPerson: "Leah Tanner",
		contactEmail: "neque.sed@icloud.couk",
	},
	{
		time: new Date("Sep 27, 2021"),
		nights: 15,
		price: 61,
		contactPerson: "Fletcher Blair",
		contactEmail: "non.bibendum@yahoo.edu",
	},
	{
		time: new Date("Mar 17, 2021"),
		nights: 15,
		price: 63,
		contactPerson: "Jennifer Daugherty",
		contactEmail: "ligula@yahoo.couk",
	},
	{
		time: new Date("Mar 29, 2021"),
		nights: 10,
		price: 66,
		contactPerson: "Zeus Riggs",
		contactEmail: "ac.metus.vitae@outlook.com",
	},
	{
		time: new Date("Jan 5, 2021"),
		nights: 6,
		price: 64,
		contactPerson: "Chelsea Talley",
		contactEmail: "nec.quam.curabitur@yahoo.net",
	},
	{
		time: new Date("May 12, 2021"),
		nights: 15,
		price: 71,
		contactPerson: "Sara Key",
		contactEmail: "elementum.lorem@aol.com",
	},
	{
		time: new Date("Jun 27, 2021"),
		nights: 4,
		price: 70,
		contactPerson: "Uriel Mcconnell",
		contactEmail: "curabitur.consequat@outlook.net",
	},
	{
		time: new Date("Jun 10, 2021"),
		nights: 10,
		price: 74,
		contactPerson: "Molly Atkins",
		contactEmail: "magna.et@protonmail.ca",
	},
	{
		time: new Date("Feb 11, 2021"),
		nights: 13,
		price: 66,
		contactPerson: "Dieter Burnett",
		contactEmail: "ac.ipsum.phasellus@google.net",
	},
];

gridDataset.forEach(item => (item.totalCost = item.nights * item.price));

const gridConfig = {
	columns: [
		{
			gravity: 2,
			id: "time",
			header: [{ text: "Time", align: "center" }],
			type: "date",
			format: "%M %d, %H:%i",
		},
		{ id: "nights", header: [{ text: "Nights" }] },
		{ id: "price", header: [{ text: "Price" }], type: "number", format: "# #", template: i => `$ ${i}` },
		{ gravity: 3, id: "contactPerson", header: [{ text: "Contact Person" }] },
		{
			gravity: 4,
			id: "contactEmail",
			header: [{ text: "Contact Email" }],
			htmlEnable: true,
			template: text => {
				return `<span class="contact_email";>${text}</span>`;
			},
		},
		{
			gravity: 2,
			id: "totalCost",
			header: [{ text: "Total Cost" }],
			type: "number",
			format: "# #",
			template: i => `$${i}`,
		},
	],
	autoWidth: true,
	css: "grid",
	data: gridDataset,
	multiselection: true,
	selection: "complex",
	editable: true,
};

// Data for chart
const chartData = [
	{ id: "Jan", value: 44.33, month: "Jan", color: "#0288D1", opacity: 1 },
	{ id: "Feb", value: 22.12, month: "Feb", color: "#0288D1", opacity: 0.4 },
	{ id: "Mar", value: 53.21, month: "Mar", color: "#0288D1", opacity: 0.6 },
	{ id: "Apr", value: 34.25, month: "Apr", color: "#0288D1", opacity: 0.2 },
	{ id: "May", value: 24.65, month: "May", color: "#0288D1", opacity: 0.1 },
];

// Hotels chart data
const hotelsData = [
	{ month: "Jan.", "Won deals": 35, "Lost deals": 14, "All deals": 40 },
	{ month: "Feb.", "Won deals": 80, "Lost deals": 59, "All deals": 94 },
	{ month: "Mar.", "Won deals": 35, "Lost deals": 62, "All deals": 48 },
	{ month: "Apr.", "Won deals": 45, "Lost deals": 13, "All deals": 59 },
	{ month: "May.", "Won deals": 45, "Lost deals": 22, "All deals": 59 },
	{ month: "Jun.", "Won deals": 74, "Lost deals": 52, "All deals": 90 },
	{ month: "Jul.", "Won deals": 85, "Lost deals": 78, "All deals": 98 },
];

// Ribbon data
const ribbonData = [
	{
		id: "fileBlock",
		type: "block",
		title: "File",
		items: [
			{
				type: "block",
				direction: "col",
				items: [
					{
						value: "File",
						id: "file",
						icon: "mdi mdi-file-outline",
						size: "small",
						ribbonHeight: "auto",
					},
					{
						type: "block",
						items: [
							{ id: "folder", icon: "mdi mdi-folder-outline" },
							{ id: "cloud", icon: "mdi mdi-weather-cloudy" },
						],
					},
				],
			},
			{
				id: "save",
				value: "Save",
				icon: "mdi mdi-content-save",
				size: "auto",
			},
		],
	},
	{
		type: "block",
		title: "Action",
		direction: "col",
		items: [
			{ id: "copy", icon: "mdi mdi-content-copy", value: "Copy" },
			{ id: "cut", icon: "mdi mdi-content-cut", value: "Cut" },
		],
	},
	{
		type: "block",
		title: "Text",
		items: [
			{
				type: "block",
				direction: "col",
				items: [
					{ id: "left", group: "align", value: "Left", icon: "mdi mdi-format-align-left" },
					{ id: "center", group: "align", value: "Center", icon: "mdi mdi-format-align-center" },
				],
			},
			{
				type: "block",
				direction: "col",
				items: [
					{ id: "right", group: "align", value: "Right", icon: "mdi mdi-format-align-right" },
					{ id: "justify", group: "align", value: "Justify", icon: "mdi mdi-format-align-justify" },
				],
			},
		],
	},
	{
		type: "block",
		title: "Output",
		items: [{ id: "print", value: "Print", icon: "mdi mdi-printer", size: "auto" }],
	},
];

// Tickets Dataview template
const templateTicketsDataview = ({ title, text, type, avatar, name, comments, time }) => {
	return `
		<div class="dhx_dataview_template_a">
			<div class="dhx_dataview_template_a__head">
				<div class="dhx_dataview_template_a__type dhx_dataview_template_a__type--${type}">${type}</div>
				<div class="dhx_dataview_template_a__content">
					<div class="dhx_dataview_template_a__title">${title}</div>
					<div class="dhx_dataview_template_a__comment">${text}</div>
				</div>
			</div>
			<div class="dhx_dataview_template_a__body">
				<div class="dhx_dataview_template_a__person">
					<div class="dhx_dataview_template_a__avatar" style="background-image: url(${avatar})"></div>
					<div class="dhx_dataview_template_a__info">
						<div class="dhx_dataview_template_a__time">${time}</div>
						<div class="dhx_dataview_template_a__name">${name}</div>
					</div>
				</div>
				<div class="dhx_dataview_template_a__comments">${comments}
				<span class="mdi mdi-comment-outline"></span></div>
			</div>
		</div>
	`;
};
// Tickets Dataview Data
const ticketsDataviewData = [
	{
		title: "Ticket for Technical Support #T742",
		text: "Need some support to add a new widget to Dashboard.",
		type: "major",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_14.jpg",
		name: "Margaret King",
		comments: "0",
		time: "12:15",
	},
	{
		title: "Ticket for Sales Manager #S210",
		text: "Can you tell me about pricing plans? I didn't understand the difference.",
		type: "minor",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_13.jpg",
		name: "Patsy Rhyne",
		comments: "2",
		time: "12:15",
	},
	{
		title: "Ticket for Marketing Manager #M112",
		text:
			"Want to mention our scheduler case study in your social media. The company has to be mentioned.",
		type: "minor",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_06.jpg",
		name: "Ravi Chakrabarti",
		comments: "6",
		time: "12:15",
	},
	{
		title: "Ticket for Account Manager #A984",
		text: "The trial period will end next week. Can you make a discount for us?",
		type: "normal",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_04.jpg",
		name: "Lucy Miller",
		comments: "1",
		time: "12:15",
	},
	{
		title: "Ticket for QA #Q394",
		text: "I found a bug. When I change the skin settings some buttons don't change.",
		type: "major",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_10.jpg",
		name: "Michael Willis",
		comments: "4",
		time: "12:15",
	},
	{
		title: "Ticket for Technical Support #T741",
		text: "I can't sign in to my account. Maybe I entered wrong password, help me!",
		type: "major",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_11.jpg",
		name: "Casey Garcia",
		comments: "0",
		time: "12:15",
	},
];

// Data for tree
const treeData = [
	{
		value: "Books",
		id: "Books",
		opened: true,
		items: [
			{
				value: "Thrillers",
				id: "Thrillers",
				opened: true,
				items: [
					{
						value: "Bestsellers",
						id: "Bestsellers",
						checked: true,
						items: [
							{
								value: "Lawrence Block",
								id: "Lawrence Block",
							},
						],
					},
					{
						value: "Robert Crais",
						id: "Robert Crais",
					},
					{
						value: "Ian Rankin",
						id: "Ian Rankin",
					},
					{
						value: "James Johns",
						id: "James Johns",
					},
					{
						value: "Nancy Atherton",
						id: "Nancy Atherton",
					},
				],
			},
			{
				value: "History",
				id: "History",
				items: [
					{
						value: "John Mack Faragher",
						id: "John Mack Faragher",
					},
					{
						value: "Jim Dwyer",
						id: "Jim Dwyer",
					},
					{
						value: "Larry Schweikart",
						id: "Larry Schweikart",
					},
					{
						value: "R. Lee Ermey",
						id: "R. Lee Ermey",
					},
				],
			},
			{
				value: "Horror",
				id: "Horror",
				items: [
					{
						value: "Stephen King",
						id: "Stephen King",
					},
					{
						value: "Dan Brown",
						id: "Dan Brown",
					},
					{
						value: "Mary Janice Davidson",
						id: "Mary Janice Davidson",
					},
					{
						value: "Katie Macalister",
						id: "Katie Macalister",
					},
				],
			},
			{
				value: "Fiction & Fantasy",
				id: "Fiction & Fantasy",
				items: [
					{
						value: "Audrey Niffenegger",
						id: "Audrey Niffenegger",
					},
					{
						value: "Philip Roth",
						id: "Philip Roth",
					},
				],
			},
			{
				value: "Teens",
				id: "Teens",
				items: [
					{
						value: "Joss Whedon",
						id: "Joss Whedon",
					},
					{
						value: "Meg Cabot",
						id: "Meg Cabot",
					},
					{
						value: "Garth Nix",
						id: "Garth Nix",
					},
					{
						value: "Ann Brashares",
						id: "Ann Brashares",
					},
				],
			},
		],
	},
];

// Message Dataview template
const messageTemplate = ({ mail, name, avatar, status, delivered }) => {
	return `
	<div class="dhx_dataview_template_b">
		<div class="dhx_dataview_template_b__avatar" style="background-image: url(${avatar});">
			<div class="dhx_dataview_template_b__status dhx_dataview_template_b__status--${status}"></div>
		</div>
		<div class="dhx_dataview_template_b__title">Delivered ${delivered}</div>
		<div class="dhx_dataview_template_b__name">${name}</div>
		<a class="dhx_dataview_template_b__message" target="_blank" href="mailto:${mail}">
			<span class="dhx_dataview_template_b__message-icon mdi mdi-message-reply-text"></span>
			<span class="dhx_dataview_template_b__message-label">Message</span>
		</a>
	</div>
  `;
};

const messageDataviewData = [
	{
		mail: "pmccoy@flowers.com",
		name: "Philip Mccoy",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_02.jpg",
		status: "online",
		delivered: "0/3",
	},
	{
		mail: "clores@flowers.com",
		name: "Calvin Flores",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_04.jpg",
		status: "online",
		delivered: "0/3",
	},
	{
		mail: "dwight@flowers.com",
		name: "Dwight Jones",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_05.jpg",
		status: "offline",
		delivered: "0/3",
	},
	{
		mail: "flores@flowers.com",
		name: "Esther Flores",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_11.jpg",
		status: "offline",
		delivered: "3/3",
	},
	{
		mail: "gregory@flowers.com",
		name: "Gregory Bell",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_10.jpg",
		status: "online",
		delivered: "0/3",
	},
	{
		mail: "guy@flowers.com",
		name: "Guy Webb",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_06.jpg",
		status: "online",
		delivered: "2/3",
	},
	{
		mail: "pat@flowers.com",
		name: "Pat Cooper",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_15.jpg",
		status: "offline",
		delivered: "1/3",
	},
	{
		name: "Shaeleigh Lopez",
		mail: "odio@hotmail.com",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_01.jpg",
		status: "online",
		delivered: "0/3",
	},
	{
		name: "Craig Pope",
		mail: "fermentum.metus.aenean@icloud.edu",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_03.jpg",
		status: "offline",
		delivered: "1/3",
	},
	{
		name: "Angela Clements",
		mail: "nonummy.ut@icloud.net",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_07.jpg",
		status: "offline",
		delivered: "3/3",
	},
	{
		name: "Howard Villarreal",
		mail: "libero.donec.consectetuer@icloud.com",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_08.jpg",
		status: "online",
		delivered: "1/3",
	},
	{
		name: "Prescott Stafford",
		mail: "nunc.ac.sem@icloud.edu",
		avatar: "https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_09.jpg",
		status: "offline",
		delivered: "2/3",
	},
];

const country = [
	{
		"id": "austria",
		"value": "Austria",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/at.png"
	},
	{
		"value": "Belarus",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/by.png"
	},
	{
		"value": "Belgium",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/be.png"
	},
	{
		"value": "Bulgaria",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/bg.png"
	},
	{
		"value": "Cyprus",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/cy.png"
	},
	{
		"value": "Czech Republic",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/cz.png"
	},
	{
		"value": "Denmark",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/dk.png"
	},
	{
		"id": "estonia",
		"value": "Estonia",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/ee.png"
	},
	{
		"value": "Finland",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/fi.png"
	},
	{
		"value": "France",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/fr.png"
	},
	{
		"value": "Germany",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/de.png"
	},
	{
		"value": "Greece",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/gr.png"
	},
	{
		"value": "Hungary",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/hu.png"
	},
	{
		"value": "Ireland",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/ie.png"
	},
	{
		"value": "Italy",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/it.png"
	},
	{
		"value": "Latvia",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/lv.png"
	},
	{
		"value": "Lithuania",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/lt.png"
	},
	{
		"value": "Luxembourg",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/lu.png"
	},
	{
		"value": "Malta",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/mt.png"
	},
	{
		"value": "Netherlands",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/nl.png"
	},
	{
		"value": "Poland",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/pl.png"
	},
	{
		"value": "Portugal",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/pt.png"
	},
	{
		"value": "Russia",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/ru.png"
	},
	{
		"value": "Romania",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/ro.png"
	},
	{
		"value": "Slovakia",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/sk.png"
	},
	{
		"value": "Slovenia",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/si.png"
	},
	{
		"value": "Spain",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/es.png"
	},
	{
		"value": "Sweden",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/se.png"
	},
	{
		"value": "United Kingdom",
		"src": "https://snippet.dhtmlx.com/codebase/data/combobox/01/img/gb.png"
	}
];

function hexToHSLChema(HEX) {
	let r = 0, g = 0, b = 0;
	if (HEX.length == 4) {
		r = "0x" + HEX[1] + HEX[1];
		g = "0x" + HEX[2] + HEX[2];
		b = "0x" + HEX[3] + HEX[3];
	} else if (HEX.length == 7) {
		r = "0x" + HEX[1] + HEX[2];
		g = "0x" + HEX[3] + HEX[4];
		b = "0x" + HEX[5] + HEX[6];
	}
	// Then to HSL
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r,g,b),
		cmax = Math.max(r,g,b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;
  
	if (delta == 0)
		h = 0;
	else if (cmax == r)
		h = ((g - b) / delta) % 6;
	else if (cmax == g)
		h = (b - r) / delta + 2;
	else
		h = (r - g) / delta + 4;
  
	h = Math.round(h * 60);
  
	if (h < 0) h += 360;
  
	l = (cmax + cmin) / 2;
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);
  
	return {
		h,
		s,
		l
	}
}

const color = {
	black: "#000",
	light: "#fff",
	blue: "#0288D1",
	green: "#019A88",
	lilac: "#5A64CC",
	red: "#D75473",
	dark: "#414141",
}

const presetsData = [
	{ toolbar: { color: color.black }, sidebar: { color: color.dark }, main: { color: color.light, theme: "light" }, root: "dark" },
	{ toolbar: { color: color.black, theme: "dark" }, sidebar: { color: color.light }, main: { color: color.light }, root: "light" },
	{ toolbar: { color: color.light }, sidebar: { color: color.dark, theme: "dark" }, main: { color: color.light }, root: "light" },
	{ toolbar: { color: color.light }, sidebar: { color: color.light }, main: { color: color.light }, root: "light", active: true, },

	{ toolbar: { color: color.blue, custom: true, }, sidebar: { color: color.dark }, main: { color: color.light, theme: "light" }, root: "dark" },
	{ toolbar: { color: color.black }, sidebar: { color: color.blue, custom: true, }, main: { color: color.light, theme: "light" }, root: "dark" },
	{ toolbar: { color: color.light }, sidebar: { color: color.blue, theme: "dark", custom: true, }, main: { color: color.light }, root: "light" },
	{ toolbar: { color: color.blue, theme: "dark", custom: true, }, sidebar: { color: color.light }, main: { color: color.light }, root: "light" },

	{ toolbar: { color: color.green, custom: true, }, sidebar: { color: color.dark }, main: { color: color.light, theme: "light" }, root: "dark" },
	{ toolbar: { color: color.black }, sidebar: { color: color.green, custom: true, }, main: { color: color.light, theme: "light" }, root: "dark" },
	{ toolbar: { color: color.light }, sidebar: { color: color.green, theme: "dark", custom: true, }, main: { color: color.light }, root: "light" },
	{ toolbar: { color: color.green, theme: "dark", custom: true, }, sidebar: { color: color.light }, main: { color: color.light }, root: "light" },

	{ toolbar: { color: color.lilac, custom: true, }, sidebar: { color: color.dark}, main: { color: color.light, theme: "light" }, root: "dark" },
	{ toolbar: { color: color.black }, sidebar: { color: color.lilac, custom: true, }, main: { color: color.light, theme: "light" }, root: "dark" },
	{ toolbar: { color: color.light }, sidebar: { color: color.lilac, theme: "dark", custom: true, }, main: { color: color.light }, root: "light" },
	{ toolbar: { color: color.lilac, theme: "dark", custom: true, }, sidebar: { color: color.light }, main: { color: color.light }, root: "light" },

	{ toolbar: { color: color.black }, sidebar: { color: color.dark }, main: { color: color.dark }, root: "dark" },
	{ toolbar: { color: color.blue, custom: true, }, sidebar: { color: color.dark }, main: { color: color.dark }, root: "dark" },
	{ toolbar: { color: color.green, custom: true, }, sidebar: { color: color.dark }, main: { color: color.dark }, root: "dark" },
	{ toolbar: { color: color.lilac, custom: true, }, sidebar: { color: color.dark }, main: { color: color.dark }, root: "dark" },

	{ toolbar: { color: color.red, custom: true, }, sidebar: { color: color.dark }, main: { color: color.dark }, root: "dark" },
	{ toolbar: { color: color.black }, sidebar: { color: color.blue, custom: true, }, main: { color: color.dark }, root: "dark" },
	{ toolbar: { color: color.black }, sidebar: { color: color.green, custom: true, }, main: { color: color.dark }, root: "dark" },
	{ toolbar: { color: color.black }, sidebar: { color: color.lilac, custom: true, }, main: { color: color.dark }, root: "dark" },
];
