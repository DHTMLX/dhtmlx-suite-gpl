var animals = {
    dog: {
        short: "The domestic dog is the most widely abundant terrestrial carnivore.",
        full: "The domestic dog (Canis lupus familiaris) is a member of the genus Canis (canines), which forms part of the wolf-like canids, and is the most widely abundant terrestrial carnivore."
    },
    bird: {
        short: "Birds, are a group of endothermic vertebrates.",
        full: "Birds, also known as Aves or avian dinosaurs, are a group of endothermic vertebrates, characterised by feathers, toothless beaked jaws, the laying of hard-shelled eggs, a high metabolic rate, a four-chambered heart, and a strong yet lightweight skeleton"
    },
    elephant: {
        short: "Elephants are large mammals of the family Elephantidae in the order Proboscidea.",
        full: "Elephants are large mammals of the family Elephantidae in the order Proboscidea. Three species are currently recognised: the African bush elephant (Loxodonta africana), the African forest elephant (L. cyclotis), and the Asian elephant (Elephas maximus)"
    },
    giraffe: {
        short: "The giraffe (Giraffa) is a genus of African even-toed ungulate mammals.",
        full: "The giraffe (Giraffa) is a genus of African even-toed ungulate mammals, the tallest living terrestrial animals and the largest ruminants."
    },
    cat: {
        short: "The cat (Felis catus) is a small carnivorous mammal.",
        full: "The cat (Felis catus) is a small carnivorous mammal. It is the only domesticated species in the family Felidae and often referred to as the domestic cat to distinguish it from wild members of the family."
    },
    parrot: {
        short: "Parrots are birds found in most tropical and subtropical regions.",
        full: "Parrots, also known as psittacines /ˈsɪtəsaɪnz/, are birds of the roughly 393 species in 92 genera that make up the order Psittaciformes, found in most tropical and subtropical regions."
    },
    panda: {
        short: "The giant panda is a bear native to south central China.",
        full: "The giant panda (Ailuropoda melanoleuca; Chinese: 大熊猫; pinyin: dà xióng māo), also known as panda bear or simply panda, is a bear native to south central China."
    },
    eagle: {
        short: "Eagle is the common name for many large birds of prey of the family Accipitridae.",
        full: "Eagle is the common name for many large birds of prey of the family Accipitridae. Eagles belong to several groups of genera, not all of which are closely related."
    },
    tiger: {
        short: "The tiger is the largest species among the Felidae.",
        full: "The tiger (Panthera tigris) is the largest species among the Felidae and classified in the genus Panthera. It is most recognizable for its dark vertical stripes on reddish-orange fur with a lighter underside."
    },
    fox: {
        short: "Foxes are mammals belonging to several genera of the family Canidae.",
        full: "Foxes are small-to-medium-sized, omnivorous mammals belonging to several genera of the family Canidae. Foxes have a flattened skull, upright triangular ears, a pointed, slightly upturned snout, and a long bushy tail (or brush)."
    },
    raccoon: {
        short: "The raccoon is a medium-sized mammal native to North America.",
        full: "The raccoon (/rəˈkuːn/ or US: /ræˈkuːn/ (About this soundlisten), Procyon lotor), sometimes spelled racoon, also known as the common raccoon, North American raccoon, northern raccoon, or coon, is a medium-sized mammal native to North America."
    }
};

var dataset = [
    {
        title: "Dog",
        short: animals.dog.short,
        full: animals.dog.full
    },
    {
        title: "Bird",
        short: animals.bird.short,
        full: animals.bird.full
    },
    {
        title: "Elephant",
        short: animals.elephant.short,
        full: animals.elephant.full
    },
    {
        title: "Giraffe",
        short: animals.giraffe.short,
        full: animals.giraffe.full
    },
    {
        title: "Cat",
        short: animals.cat.short,
        full: animals.cat.full
    },
    {
        title: "Parrot",
        short: animals.parrot.short,
        full: animals.parrot.full
    },
    {
        title: "Panda",
        short: animals.panda.short,
        full: animals.panda.full
    },
    {
        title: "Dog",
        short: animals.dog.short,
        full: animals.dog.full
    },
    {
        title: "Eagle",
        short: animals.eagle.short,
        full: animals.eagle.full
    },
    {
        title: "Tiger",
        short: animals.tiger.short,
        full: animals.tiger.full
    },
    {
        title: "Raccoon",
        short: animals.raccoon.short,
        full: animals.raccoon.full
    },
    {
        title: "Dog",
        short: animals.dog.short,
        full: animals.dog.full
    },
    {
        title: "Fox",
        short: animals.fox.short,
        full: animals.fox.full
    }
];

for (var i = 0; i < dataset.length; i++) {
    var num = i + 1;
    dataset[i].img = "../common/imgs/" + (num < 10 ? "0" + num : num) + ".jpg";
}
