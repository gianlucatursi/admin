var __BADWORDS = [ "affanculo",
  "bagasce",
  "bagascia",
  "bagascione",
  "baldracca",
  "baldraccacce",
  "baldraccaccia",
  "baldracche",
  "baldraccona",
  "baldraccone",
  "barile di merda",
  "bastardacce",
  "bastardacci",
  "bastardaccia",
  "bastardaccio",
  "bastarda madonna",
  "bastarde",
  "bastardi",
  "bastardo",
  "bastardona",
  "bastardone",
  "bastardoni",
  "battona",
  "battone",
  "bocchinara",
  "bocchinare",
  "bocchinari",
  "bocchinaro",
  "budello di dio",
  "busta di piscio",
  "cacaminchia",
  "cacare",
  "cacasotto",
  "cagacazzo",
  "cagaminchia",
  "cagare",
  "cagasotto",
  "canaccio di dio",
  "canaglia di dio",
  "cane d'allah",
  "cane d'eva",
  "cane di dio",
  "cazzacci",
  "cazzaccio",
  "cazzata",
  "cazzate",
  "cazzetti",
  "cazzetto",
  "cazzi",
  "cazzissimo",
  "cazzo",
  "cazzona",
  "cazzone",
  "cazzoni",
  "cazzuta",
  "cazzute",
  "cazzuti",
  "cazzutissimo",
  "cazzuto",
  "cesso",
  "checca",
  "checche",
  "chiavare",
  "chiavata",
  "chiavate",
  "chiavatona",
  "chiavatone",
  "ciucciamelo",
  "ciucciapalle",
  "cogliona",
  "coglionaggine",
  "coglionare",
  "coglionata",
  "coglionate",
  "coglionatore",
  "coglionatrice",
  "coglionatura",
  "coglionature",
  "coglionazzi",
  "coglionazzo",
  "coglioncelli",
  "coglioncello",
  "coglioncini",
  "coglioncino",
  "coglione",
  "coglioneria",
  "coglionerie",
  "coglioni",
  "coprofago",
  "coprofilo",
  "cornuto il papa",
  "credoana",
  "cretinetti",
  "cristo d'un dio",
  "cristo decapitato",
  "cristo in croce",
  "culattone",
  "culattoni",
  "culi",
  "culo",
  "culona",
  "culone",
  "deficiente",
  "dio bastardo",
  "dio bestia",
  "dio bestiazza",
  "dio boia",
  "diocan",
  "dio cane",
  "dio cannaiolo",
  "dio capra",
  "dio coglione",
  "dio comunista",
  "dio crasto",
  "dio cristo",
  "dio culattone",
  "diofa",
  "dio farabutto",
  "dio fascista",
  "dio finocchio",
  "dio flagellato",
  "dio impestato",
  "dio impiccato",
  "dio ladro",
  "dio lebbroso",
  "dio lobotomizzato",
  "dio lurido",
  "dio maiale",
  "dio maledetto",
  "dio merda",
  "dio minchione",
  "dio negro",
  "dio porco",
  "dio poveraccio",
  "dio povero",
  "dio rotto",
  "dio rotto in culo",
  "dio rutto",
  "dio sbudellato",
  "dio schifoso",
  "dio seppellito",
  "dio serpente",
  "dio stracane",
  "dio stramerda",
  "dio stronzo",
  "dio sventrato",
  "dio verme",
  "faccia da culo",
  "faccia di merda",
  "fanculo",
  "fica",
  "ficata",
  "ficate",
  "fichetta",
  "fichette",
  "fichetti",
  "fichetto",
  "ficona",
  "ficone",
  "figa",
  "figata",
  "figate",
  "fighe",
  "fighetta",
  "fighette",
  "fighetti",
  "fighetto",
  "figlia di cane",
  "figlia di mignotta",
  "figlia di puttana",
  "figlia di troia",
  "figli di cani",
  "figli di mignotta",
  "figli di puttana",
  "figli di troia",
  "figlie di cani",
  "figlie di mignotta",
  "figlie di puttana",
  "figlie di troia",
  "figlio di cane",
  "figlio di mignotta",
  "figlio di puttana",
  "figlio di troia",
  "figona",
  "figone",
  "figoni",
  "fottere",
  "fottiti",
  "fottuta",
  "fottute",
  "fottuti",
  "fottutissima",
  "fottutissime",
  "fottutissimi",
  "fottutissimo",
  "fottuto",
  "fregna",
  "frocetto",
  "froci",
  "frociara",
  "frociaro",
  "frociarola",
  "frociarolo",
  "frocio",
  "frocione",
  "frocioni",
  "frocissimo",
  "gesù cristaccio",
  "gesù esorcizzato",
  "gesù handicappato",
  "gesù impasticcato",
  "gesù malandato",
  "gesù radioattivo",
  "gesù sieropositivo",
  "gesù stordito",
  "gesù zozzo",
  "incazzare",
  "incazzata",
  "incazzate",
  "incazzati",
  "incazzatissima",
  "incazzatissime",
  "incazzatissimi",
  "incazzatissimo",
  "incazzato",
  "inculare",
  "inculata",
  "inculate",
  "infrociato",
  "leccacazzi",
  "leccaculi",
  "leccaculo",
  "leccafica",
  "leccafiga",
  "leccafighe",
  "leccapalle",
  "madonna assassinata",
  "madonna cane",
  "madonna impestata",
  "madonna isterica",
  "madonna lurida",
  "madonna maiala",
  "madonna mongoloide",
  "madonna negra",
  "madonna puttana",
  "madonna schiava",
  "madonna stregaccia",
  "madonna sudicia",
  "madonna suicida",
  "madonna surgelata",
  "madonna troia",
  "madonna violentata",
  "mannaggia cristo",
  "mannaggia dio",
  "mannaggia il battesimo",
  "mannaggia il clero",
  "mannaggia i santi",
  "mannaggia l'arcangelo",
  "mannaggia la bibbia",
  "mannaggia la diocesi",
  "mannaggia la madonna",
  "mannaggia la puttana",
  "mannaggia padre pio",
  "mannaggia san giuseppe",
  "merda",
  "merdacce",
  "merdaccia",
  "merda mal cagata",
  "merdata",
  "merdate",
  "merde",
  "merdina",
  "merdine",
  "merdolina",
  "merdoline",
  "merdona",
  "merdone",
  "merdosa",
  "merdose",
  "merdosi",
  "merdoso",
  "mezzasega",
  "mezzeseghe",
  "mignotta",
  "mignotte",
  "minchia",
  "minchiadura",
  "minchiaduro",
  "minchiata",
  "minchiate",
  "minchie",
  "minchione",
  "minchioni",
  "mona",
  "mongoloide",
  "negra",
  "negraccia",
  "negraccio",
  "negro",
  "negrona",
  "negrone",
  "nerchia",
  "patonza",
  "patonze",
  "piciu",
  "pigliacazzi",
  "pisciare",
  "pisciasotto",
  "pisciata",
  "pisciatina",
  "pisciato",
  "pisciatona",
  "piscio",
  "pisciona",
  "piscione",
  "piscioni",
  "pompinara",
  "pompinare",
  "pompini",
  "pompino",
  "porca madonna",
  "porca puttana",
  "porco di dio",
  "porco dio",
  "porco il clero",
  "porco il signore",
  "pugnetta",
  "pugnette",
  "puppa",
  "puppamela",
  "puppamelo",
  "puppare",
  "puppe",
  "puttana",
  "puttanacce",
  "puttanaccia",
  "puttanaeva",
  "puttana madonna",
  "puttanata",
  "puttanate",
  "puttane",
  "puttanella",
  "puttanelle",
  "puttaniere",
  "puttanieri",
  "puttano",
  "puttanona",
  "puttanone",
  "raspone",
  "rasponi",
  "ricchione",
  "ricchioni",
  "rincoglionito",
  "rizzacazzi",
  "rompicazzi",
  "rompicazzo",
  "rompi coglioni",
  "rottinculo",
  "sbocchinare",
  "sbocchinato",
  "sbocchiniamolo",
  "sborra",
  "sborrare",
  "sborrata",
  "sborrate",
  "sborrato",
  "sborratona",
  "sburra",
  "sburrare",
  "scassacazzo",
  "scassacoglioni",
  "scassaminchia",
  "scazzare",
  "scazzata",
  "scazzate",
  "scazzati",
  "scazzato",
  "scopare",
  "scopata",
  "scopate",
  "segaiolo",
  "signore bastardo",
  "spompinare",
  "spompinata",
  "spompinato",
  "spompiniamolo",
  "stronzata",
  "stronzate",
  "stronzetta",
  "stronzette",
  "stronzetti",
  "stronzetto",
  "stronzina",
  "stronzine",
  "stronzini",
  "stronzino",
  "stronzo",
  "stronzoli",
  "stronzolo",
  "stronzo malcagato",
  "stronzona",
  "stronzone",
  "stronzoni",
  "succhiacazzi",
  "succhiamelo",
  "succhiaminchia",
  "succhiapalle",
  "tarzanelli",
  "tarzanello",
  "tetta",
  "tette",
  "tettina",
  "tettine",
  "tettona",
  "tettone",
  "troia",
  "troiacce",
  "troiaccia",
  "troiamadonna",
  "troie",
  "troietta",
  "troiette",
  "troio",
  "troiona",
  "troioncella",
  "troioncelle",
  "troione",
  "trombare",
  "trombata",
  "trombatona",
  "vacca madonna",
  "vaffanculo",
  "zinne",
  "zoccola"];

window.__BADWORDS = __BADWORDS;