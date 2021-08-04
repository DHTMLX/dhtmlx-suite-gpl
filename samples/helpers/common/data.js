var layoutConfig = {
	cols: [
		{
			id: "content",
		},
	],
};

var biggestConf = {
	customType: "biggest",
	rows: [
		{
			id: "toolbar",
			html: "Header",
			css: "toolbar",
			gravity: false,
		},
		{
			cols: [
				{
					id: "sidebar",
					html: "Sidebar",
					css: "left",
				},
				{
					id: "content",
					html: "Content",
					css: "center",
				},
				{
					id: "rightbar",
					html: "Aside",
					css: "right",
				},
			],
		},
		{
			id: "footer",
			html: "Footer",
			css: "toolbar",
			gravity: false,
		},
	],
};

var bigConf = {
	customType: "big",
	rows: [
		{
			id: "toolbar",
			html: "Header",
			css: "toolbar",
			gravity: false,
		},
		{
			cols: [
				{
					id: "sidebar",
					html: "Sidebar",
					css: "left",
				},
				{
					id: "content",
					html: "Content",
					css: "center",
				},
				{
					id: "rightbar",
					html: "Aside",
					css: "right",
				},
			],
		},
	],

};

var smallConf = {
	customType: "small",
	rows: [
		{
			id: "toolbar",
			html: "Header",
			css: "toolbar",
			gravity: false,
		},
		{
			rows: [
				{
					id: "content",
					html: "Content",
					css: "center",
				},
				{
					id: "rightbar",
					html: "Aside",
					css: "right",
				},
			],
		},
		{
			id: "footer",
			html: "Footer",
			css: "toolbar",
			gravity: false,
		},
	],
};

var smallestConf = {
	customType: "smallest",
	rows: [
		{
			id: "toolbar",
			html: "Header",
			css: "toolbar",
			gravity: false,
		},
		{
			id: "content",
			html: "Content",
			css: "center",
		},
		{
			id: "rightbar",
			html: "Aside",
			css: "right",
		},
	],
};

var dataViewData = [
	{
		"title": "Ben",
		"short": "Ben is a very cautious 5-year-old Siberian Husky.",
		"full": "Ben is a very cautious 5-year-old Siberian Husky, whom we found 2 years ago not far away from the zoo. The dog owner never appeared. So now Ben is the best friend of all our animals.",
		"img": "images/01.jpg",
	},
	{
		"title": "Izzy",
		"short": "This is our most beloved kingfisher bird Izzy.",
		"full": "This is our most beloved kingfisher bird Izzy, who adores eating fish and even hunts on its own. Izzy and Ben have the most intimate relationship. Izzy often sits on the head of Ben during a walk",
		"img": "images/02.jpg",
	},
	{
		"title": "Momo",
		"short": "Momo is a 25-year-old elephant with a big heart.",
		"full": "Momo is a 25-year-old elephant with a big heart. Momo came from another zoo in New Zealand but soon got accustomed to the new surroundings. Despite being grown-up, Momo still loves messing around.",
		"img": "images/03.jpg",
	},
	{
		"title": "Kevin",
		"short": "And here is Kevin, our old-timer who saw how everything started here.",
		"full": "And here is Kevin, our old-timer who saw how everything started here. Kevin loves attention and being taken pictures of, especially while chewing delicious leaves.",
		"img": "images/04.jpg",
	},
	{
		"title": "Lucy",
		"short": "Lucy is a beautiful Siamese cat.",
		"full": "Lucy is a beautiful Siamese cat. She considers herself the Queen of the zoo and competes with Ben for the territory. However, you can often find her sleeping on Ben’s back.",
		"img": "images/05.jpg",
	},
	{
		"title": "Christy",
		"short": "Christy is the most extravert bird you’ve ever seen.",
		"full": "Christy is the most extravert bird you’ve ever seen. She never stops murmuring, mumbling, and chattering. Sometimes she’s allowed to fly all over the zoo to spend all her energy and communicate with others.",
		"img": "images/06.jpg",
	},
	{
		"title": "Philip",
		"short": "Philip is a Chinese panda, temporarily living with us.",
		"full": "Philip is a Chinese panda, temporarily living with us. In a couple of months he’ll be transported to another zoo in Australia, where there is a big panda family waiting for him.",
		"img": "images/07.jpg",
	},
	{
		"title": "Clark",
		"short": "Clark is one of the dogs of our zookeeper.",
		"full": "Clark is one of the dogs of our zookeeper. He loves running around and having fun with everyone.",
		"img": "images/08.jpg",
	},
	{
		"title": "Ed",
		"short": "Ed has the sharpest eye and always knows what’s happening around.",
		"full": "Ed has the sharpest eye and always knows what’s happening around. He is a good friend of Christy, when he’s in a positive frame of mind.",
		"img": "images/09.jpg",
	},
	{
		"title": "Max",
		"short": "Max is a tiger with a very calm and wise character.",
		"full": "Max is a tiger with a very calm and wise character. I guess he’s pondering over some universal wisdom secrets. However, he adores rabbits, chicken, and, surprisingly, carrots!",
		"img": "images/10.jpg",
	},
	{
		"title": "Michelle",
		"short": "This is our couch potato red panda Michelle.",
		"full": "This is our couch potato red panda Michelle. She prefers to stay in her cozy bed all day long and comes out only at night to have a stroll around the Zoo.",
		"img": "images/11.jpg",
	},
	{
		"title": "Shelly",
		"short": "Shelly is the dog of my parents who lives with us when they’re travelling.",
		"full": "Shelly is the dog of my parents who lives with us when they’re travelling. She’s a bit scared of some of the zoo’s inhabitants, but has an intimate relationship with Steven.",
		"img": "images/12.jpg",
	},
];
