var dataset = [
    {
        "value": "Ben",
        "short": "Ben is a very cautious 5-year-old Siberian Husky.",
        "shortDescription": "Ben is a very cautious 5-year-old Siberian Husky, whom we found 2 years ago not far away from the zoo. The dog owner never appeared. So now Ben is the best friend of all our animals.",
        "thumbnailName": "01.jpg"
    },
    {
        "value": "Izzy",
        "short": "This is our most beloved kingfisher bird Izzy.",
        "shortDescription": "This is our most beloved kingfisher bird Izzy, who adores eating fish and even hunts on its own. Izzy and Ben have the most intimate relationship. Izzy often sits on the head of Ben during a walk",
        "thumbnailName": "02.jpg"
    },
    {
        "value": "Momo",
        "short": "Momo is a 25-year-old elephant with a big heart.",
        "shortDescription": "Momo is a 25-year-old elephant with a big heart. Momo came from another zoo in New Zealand but soon got accustomed to the new surroundings. Despite being grown-up, Momo still loves messing around.",
        "thumbnailName": "03.jpg"
    },
    {
        "value": "Kevin",
        "short": "And here is Kevin, our old-timer who saw how everything started here.",
        "shortDescription": "And here is Kevin, our old-timer who saw how everything started here. Kevin loves attention and being taken pictures of, especially while chewing delicious leaves.",
        "thumbnailName": "04.jpg"
    },
    {
        "value": "Lucy",
        "short": "Lucy is a beautiful Siamese cat.",
        "shortDescription": "Lucy is a beautiful Siamese cat. She considers herself the Queen of the zoo and competes with Ben for the territory. However, you can often find her sleeping on Ben’s back.",
        "thumbnailName": "05.jpg"
    },
    {
        "value": "Christy",
        "short": "Christy is the most extravert bird you’ve ever seen.",
        "shortDescription": "Christy is the most extravert bird you’ve ever seen. She never stops murmuring, mumbling, and chattering. Sometimes she’s allowed to fly all over the zoo to spend all her energy and communicate with others.",
        "thumbnailName": "06.jpg"
    },
    {
        "value": "Philip",
        "short": "Philip is a Chinese panda, temporarily living with us.",
        "shortDescription": "Philip is a Chinese panda, temporarily living with us. In a couple of months he’ll be transported to another zoo in Australia, where there is a big panda family waiting for him.",
        "thumbnailName": "07.jpg"
    },
    {
        "value": "Clark",
        "short": "Clark is one of the dogs of our zookeeper.",
        "shortDescription": "Clark is one of the dogs of our zookeeper. He loves running around and having fun with everyone.",
        "thumbnailName": "08.jpg"
    },
    {
        "value": "Ed",
        "short": "Ed has the sharpest eye and always knows what’s happening around.",
        "shortDescription": "Ed has the sharpest eye and always knows what’s happening around. He is a good friend of Christy, when he’s in a positive frame of mind.",
        "thumbnailName": "09.jpg"
    },
    {
        "value": "Max",
        "short": "Max is a tiger with a very calm and wise character.",
        "shortDescription": "Max is a tiger with a very calm and wise character. I guess he’s pondering over some universal wisdom secrets. However, he adores rabbits, chicken, and, surprisingly, carrots!",
        "thumbnailName": "10.jpg"
    },
    {
        "value": "Michelle",
        "short": "This is our couch potato red panda Michelle.",
        "shortDescription": "This is our couch potato red panda Michelle. She prefers to stay in her cozy bed all day long and comes out only at night to have a stroll around the Zoo.",
        "thumbnailName": "11.jpg"
    },
    {
        "value": "Shelly",
        "short": "Shelly is the dog of my parents who lives with us when they’re travelling.",
        "shortDescription": "Shelly is the dog of my parents who lives with us when they’re travelling. She’s a bit scared of some of the zoo’s inhabitants, but has an intimate relationship with Steven.",
        "thumbnailName": "12.jpg"
    },
    {
        "value": "Steven",
        "short": "Steven is a 6-year old fox, whom we found in the forest with a broken leg.",
        "shortDescription": "Steven is a 6-year old fox, whom we found in the forest with a broken leg. Luckily, Steven soon recovered his strength, but we became so attached to him that decided to leave him with other animals.",
        "thumbnailName": "13.jpg"
    }
];

var editDataset = [
    {
        "shortDescription": "Ben",
        "short": "Ben is a very cautious 5-year-old Siberian Husky.",
        "value": "Ben is a very cautious 5-year-old Siberian Husky, whom we found 2 years ago not far away from the zoo. The dog owner never appeared. So now Ben is the best friend of all our animals.",
        "thumbnailName": "01.jpg"
    },
    {
        "shortDescription": "Izzy",
        "short": "This is our most beloved kingfisher bird Izzy.",
        "value": "This is our most beloved kingfisher bird Izzy, who adores eating fish and even hunts on its own. Izzy and Ben have the most intimate relationship. Izzy often sits on the head of Ben during a walk",
        "thumbnailName": "02.jpg"
    },
    {
        "shortDescription": "Momo",
        "short": "Momo is a 25-year-old elephant with a big heart.",
        "value": "Momo is a 25-year-old elephant with a big heart. Momo came from another zoo in New Zealand but soon got accustomed to the new surroundings. Despite being grown-up, Momo still loves messing around.",
        "thumbnailName": "03.jpg"
    },
    {
        "shortDescription": "Kevin",
        "short": "And here is Kevin, our old-timer who saw how everything started here.",
        "value": "And here is Kevin, our old-timer who saw how everything started here. Kevin loves attention and being taken pictures of, especially while chewing delicious leaves.",
        "thumbnailName": "04.jpg"
    },
    {
        "shortDescription": "Lucy",
        "short": "Lucy is a beautiful Siamese cat.",
        "value": "Lucy is a beautiful Siamese cat. She considers herself the Queen of the zoo and competes with Ben for the territory. However, you can often find her sleeping on Ben’s back.",
        "thumbnailName": "05.jpg"
    },
    {
        "shortDescription": "Christy",
        "short": "Christy is the most extravert bird you’ve ever seen.",
        "value": "Christy is the most extravert bird you’ve ever seen. She never stops murmuring, mumbling, and chattering. Sometimes she’s allowed to fly all over the zoo to spend all her energy and communicate with others.",
        "thumbnailName": "06.jpg"
    },
    {
        "shortDescription": "Philip",
        "short": "Philip is a Chinese panda, temporarily living with us.",
        "value": "Philip is a Chinese panda, temporarily living with us. In a couple of months he’ll be transported to another zoo in Australia, where there is a big panda family waiting for him.",
        "thumbnailName": "07.jpg"
    },
    {
        "shortDescription": "Clark",
        "short": "Clark is one of the dogs of our zookeeper.",
        "value": "Clark is one of the dogs of our zookeeper. He loves running around and having fun with everyone.",
        "thumbnailName": "08.jpg"
    },
    {
        "shortDescription": "Ed",
        "short": "Ed has the sharpest eye and always knows what’s happening around.",
        "value": "Ed has the sharpest eye and always knows what’s happening around. He is a good friend of Christy, when he’s in a positive frame of mind.",
        "thumbnailName": "09.jpg"
    },
    {
        "shortDescription": "Max",
        "short": "Max is a tiger with a very calm and wise character.",
        "value": "Max is a tiger with a very calm and wise character. I guess he’s pondering over some universal wisdom secrets. However, he adores rabbits, chicken, and, surprisingly, carrots!",
        "thumbnailName": "10.jpg"
    },
    {
        "shortDescription": "Michelle",
        "short": "This is our couch potato red panda Michelle.",
        "value": "This is our couch potato red panda Michelle. She prefers to stay in her cozy bed all day long and comes out only at night to have a stroll around the Zoo.",
        "thumbnailName": "11.jpg"
    },
    {
        "shortDescription": "Shelly",
        "short": "Shelly is the dog of my parents who lives with us when they’re travelling.",
        "value": "Shelly is the dog of my parents who lives with us when they’re travelling. She’s a bit scared of some of the zoo’s inhabitants, but has an intimate relationship with Steven.",
        "thumbnailName": "12.jpg"
    },
    {
        "shortDescription": "Steven",
        "short": "Steven is a 6-year old fox, whom we found in the forest with a broken leg.",
        "value": "Steven is a 6-year old fox, whom we found in the forest with a broken leg. Luckily, Steven soon recovered his strength, but we became so attached to him that decided to leave him with other animals.",
        "thumbnailName": "13.jpg"
    }
];