const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.product).delete();

    await knex(tables.product).insert([
      {
        idProduct: 1,
        idLeverancier: 1,
        naam: "Samsung RB34C605CB1/EF",
        eenheidsprijs: 700,
        btwtarief: 21,
        foto: "https://images.samsung.com/is/image/samsung/p6pim/cz/rb34c605cb1-ef/gallery/cz-rb7300t-wifi-459347-rb34c605cb1-ef-thumb-536510085?$480_480_PNG$",
        aantal: 5,
        categorie: "Koel- en vriesapparaten",
        gewicht: 20,
        beschrijving:
          "Samsung koelkast met ruime inhoud en energiezuinige werking.",
      },
      {
        idProduct: 2,
        idLeverancier: 2,
        naam: "LG GX Gallery Series OLED",
        eenheidsprijs: 2500,
        btwtarief: 21,
        foto: "https://www.lg.com/eastafrica/images/Oled-microsite/GX/TV-OLED-Brandsite-GX-01-Mobile-new.jpg",
        aantal: 8,
        categorie: "TV",
        gewicht: 35,
        beschrijving:
          "Prachtige OLED TV met dun profiel, perfect voor een moderne woonkamer.",
      },
      {
        idProduct: 3,
        idLeverancier: 3,
        naam: "Bosch Serie 8",
        eenheidsprijs: 900,
        btwtarief: 21,
        foto: "https://media3.bosch-home.com/Product_Shots/600x337/MCSA01697655_G4198_SMV88TX36E_1144049_korr_def.jpg",
        aantal: 10,
        categorie: "Vaatwasser",
        gewicht: 45,
        beschrijving:
          "Stille vaatwasser met verschillende programma's en energiezuinige werking.",
      },
      {
        idProduct: 4,
        idLeverancier: 1,
        naam: "Whirlpool W11 CM145",
        eenheidsprijs: 600,
        btwtarief: 21,
        foto: "https://www.loeters.be/s/picture/465523610/800/600/whirlpool-w11-cm145.jpg?language=nl",
        aantal: 12,
        categorie: "Koffiemachine",
        gewicht: 20,
        beschrijving:
          "Volautomatische espressomachine met melkopschuimer, perfect voor thuisgebruik.",
      },
      {
        idProduct: 5,
        idLeverancier: 2,
        naam: "Liebherr GNP 2313",
        eenheidsprijs: 800,
        btwtarief: 21,
        foto: "https://content.hwigroup.net/images/products_500x300/290812/liebherr-gnp-2313-21-a.jpg",
        aantal: 6,
        categorie: "Koel- en vriesapparaten",
        gewicht: 80,
        beschrijving:
          "Ruime vriezer met No Frost technologie, ideaal voor het bewaren van grote hoeveelheden voedsel.",
      },
      {
        idProduct: 6,
        idLeverancier: 3,
        naam: "Bauknecht EMPK7 9345 PT",
        eenheidsprijs: 1200,
        btwtarief: 21,
        foto: "https://whirlpool-cdn.thron.com/delivery/public/thumbnail/whirlpool/pi-7f0cb4d4-6f6d-4f02-87a0-ce8a5a1bd88d/jsind9/std/1000x1000/bs-2677f-cpal-kookplaten-8.webp?fill=zoom&fillcolor=rgba:255,255,255&scalemode=product&format=WEBP",
        aantal: 9,
        categorie: "Kookplaat",
        gewicht: 25,
        beschrijving:
          "Stijlvolle inductiekookplaat met geïntegreerde afzuiging, perfect voor een moderne keuken.",
      },
      {
        idProduct: 7,
        idLeverancier: 2,
        naam: "Siemens HB878GBS6B",
        eenheidsprijs: 1400,
        btwtarief: 21,
        foto: "https://media3.bsh-group.com/Product_Shots/1600x900/MCSA02760075_HB878GBB6B_Siemens_STP_FullSizeCooker__IC6_def.png",
        aantal: 7,
        categorie: "Kookapparatuur",
        gewicht: 40,
        beschrijving:
          "Multifunctionele inbouwoven met pyrolytische reiniging en stoomfunctie voor perfecte resultaten.",
      },
      {
        idProduct: 8,
        idLeverancier: 3,
        naam: "Sharp R-961INW",
        eenheidsprijs: 300,
        btwtarief: 21,
        foto: "https://media.s-bol.com/qxRlVov00jmk/550x337.jpg",
        aantal: 15,
        categorie: "Kookapparatuur",
        gewicht: 30,
        beschrijving:
          "Ruime combimagnetron met grill- en heteluchtfuncties, perfect voor drukke keukens.",
      },
      {
        idProduct: 9,
        idLeverancier: 1,
        naam: "LG GSL760PZXV",
        eenheidsprijs: 1800,
        btwtarief: 21,
        foto: "https://image.coolblue.be/600x315/products/804194",
        aantal: 5,
        categorie: "Koel- en vriesapparaten",
        gewicht: 150,
        beschrijving:
          "Grote Amerikaanse koelkast met water- en ijsdispenser, ideaal voor gezinnen.",
      },
      {
        idProduct: 10,
        idLeverancier: 2,
        naam: "Miele G 7100 SCU",
        eenheidsprijs: 1000,
        btwtarief: 21,
        foto: "https://cdn.niwzi.be/images/ez_prod/2987/514772/hires/g-7200-scu-bw-1-1653404843_1000x1000.png",
        aantal: 8,
        categorie: "Vaatwasser",
        gewicht: 50,
        beschrijving:
          "Stille en energiezuinige vaatwasser met uitgebreide programma-opties en besteklade.",
      },{
        idProduct: 11,
        idLeverancier: 1,
        naam: "Philips 55OLED935/12",
        eenheidsprijs: 2000,
        btwtarief: 21,
        foto: "https://images.philips.com/is/image/philipsconsumer/4275fb8a137c4638b5dbafb100feded7?$jpglarge$&wid=1250",
        aantal: 4,
        categorie: "TV",
        gewicht: 30,
        beschrijving:
          "Indrukwekkende OLED TV met Ambilight voor een meeslepende kijkervaring."
      },
      {
        idProduct: 12,
        idLeverancier: 1,
        naam: "Bosch WTX88MH9NL",
        eenheidsprijs: 1200,
        btwtarief: 21,
        foto: "https://media3.bosch-home.com/Product_Shots/900x506/20305269_WTX88M90NL_STP_def.webp",
        aantal: 6,
        categorie: "Wasapparaten",
        gewicht: 40,
        beschrijving:
          "Zeer energiezuinige wasdroger met selfCleaning condenser voor optimale prestaties."
      },
      {
        idProduct: 13,
        idLeverancier: 2,
        naam: "Sony KD-75XH9505",
        eenheidsprijs: 3000,
        btwtarief: 21,
        foto: "https://media.s-bol.com/yw5w7WqypBNR/G5LlY8J/550x368.jpg",
        aantal: 3,
        categorie: "TV",
        gewicht: 60,
        beschrijving:
          "High-end 4K LED TV met fantastisch beeld en geluid voor een bioscoopervaring thuis."
      },
      {
        idProduct: 14,
        idLeverancier: 2,
        naam: "Samsung WW10M86INOA",
        eenheidsprijs: 1500,
        btwtarief: 21,
        foto: "https://images.samsung.com/is/image/samsung/nl-washer-ww10m86inoa-ww10m86inoa-en-White-196105823?$624_624_PNG$",
        aantal: 7,
        categorie: "Wasapparaten",
        gewicht: 70,
        beschrijving:
          "Slimme wasmachine met Auto Optimal Wash voor de beste wasresultaten met minimale inspanning."
      },
      {
        idProduct: 15,
        idLeverancier: 3,
        naam: "AEG RX9-1-IBM",
        eenheidsprijs: 800,
        btwtarief: 21,
        foto: "https://media.s-bol.com/NQJ0561wRR2/1200x1114.jpg",
        aantal: 8,
        categorie: "Stofzuiger",
        gewicht: 5,
        beschrijving:
          "Slimme robotstofzuiger met 3D Vision-technologie voor grondige reiniging van elke hoek."
      },
      {
        idProduct: 16,
        idLeverancier: 3,
        naam: "Beko DFN39540X",
        eenheidsprijs: 500,
        btwtarief: 21,
        foto: "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_96408210?x=600&y=450&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=600&ey=450&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=600&cdy=450",
        aantal: 9,
        categorie: "Vaatwasser",
        gewicht: 45,
        beschrijving:
          "Energiezuinige vaatwasser met AquaIntense-functie voor perfect schone vaat."
      },
      {
        idProduct: 17,
        idLeverancier: 1,
        naam: "Panasonic TX-55HZW984",
        eenheidsprijs: 1800,
        btwtarief: 21,
        foto: "https://tweakers.net/i/Tp-r7VyODaivaDduDvnE0d6OKUM=/i/2003827462.jpeg",
        aantal: 5,
        categorie: "TV",
        gewicht: 25,
        beschrijving:
          "Hoogwaardige 4K OLED TV met HDR-ondersteuning voor indrukwekkende beeldkwaliteit."
      },
      {
        idProduct: 18,
        idLeverancier: 2,
        naam: "Bosch HVA534BS0",
        eenheidsprijs: 600,
        btwtarief: 21,
        foto: "https://media3.bosch-home.com/Product_Shots/435x515/MCSA01975329_HBA534BS0_FullSizeOven_Bosch_STP_EOX5_def.png",
        aantal: 12,
        categorie: "Kookapparatuur",
        gewicht: 35,
        beschrijving:
          "Inbouwoven met 3D Hotair Plus voor gelijkmatige warmteverdeling en perfecte bakresultaten."
      },
      {
        idProduct: 19,
        idLeverancier: 3,
        naam: "Siemens WT8HXM75NL",
        eenheidsprijs: 900,
        btwtarief: 21,
        foto: "https://media3.bsh-group.com/Product_Shots/1200x675/13088198_WT8HXM75NL_RPS2_def.jpg",
        aantal: 10,
        categorie: "Wasapparaten",
        gewicht: 50,
        beschrijving:
          "Condensdroger met selfCleaning condenser voor onderhoudsvrij drogen en optimale prestaties."
      },
      {
        idProduct: 20,
        idLeverancier: 1,
        naam: "LG OLED65GX",
        eenheidsprijs: 2500,
        btwtarief: 21,
        foto: "https://elektrozine.be/wp-content/uploads/2020/06/IMG_20200623_122311-scaled.jpg",
        aantal: 6,
        categorie: "TV",
        gewicht: 40,
        beschrijving:
          "Ultra-dunne OLED TV met gallery design voor een naadloze integratie in elke ruimte."
      },{
        idProduct: 21,
        idLeverancier: 2,
        naam: "Samsung WW10T834AENS2",
        eenheidsprijs: 1400,
        btwtarief: 21,
        foto: "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_106342851?x=600&y=450&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=600&ey=450&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=600&cdy=450",
        aantal: 7,
        categorie: "Wasapparaten",
        gewicht: 70,
        beschrijving:
          "Slimme wasmachine met Auto Dispense en AI Control voor optimale waservaring."
      },
      {
        idProduct: 22,
        idLeverancier: 3,
        naam: "Bosch WUQ24490",
        eenheidsprijs: 700,
        btwtarief: 21,
        foto: "https://www.loeters.be/s/picture/503464214/800/600/8kg-a-zuinig-warmtepomp-glazen-deur-autodry-droogkast-bosch-wqg-231m0-fg.jpg?language=nl",
        aantal: 9,
        categorie: "Wasapparaten",
        gewicht: 65,
        beschrijving:
          "Energiezuinige wasmachine met VarioPerfect voor flexibel wassen met uitstekende resultaten."
      },
      {
        idProduct: 23,
        idLeverancier: 1,
        naam: "LG OLED77ZX9LA",
        eenheidsprijs: 5000,
        btwtarief: 21,
        foto: "https://www.lg.com/nl/images/televisies/md07507441/gallery/1100_3.jpg",
        aantal: 3,
        categorie: "TV",
        gewicht: 80,
        beschrijving:
          "Indrukwekkende 8K OLED TV met Dolby Vision IQ en Dolby Atmos voor meeslepende entertainment."
      },
      {
        idProduct: 24,
        idLeverancier: 2,
        naam: "Samsung WD80T4046EW",
        eenheidsprijs: 1200,
        btwtarief: 21,
        foto: "https://images.samsung.com/is/image/samsung/p6pim/fr/wd80t4046ew-ef/gallery/fr-combo-wd80t4046ew-wd80t4046ew-ef-537439359?$650_519_PNG$",
        aantal: 6,
        categorie: "Wasapparaten",
        gewicht: 50,
        beschrijving:
          "Slimme warmtepompdroger met Optimal Dry voor efficiënt en zacht drogen van kleding."
      },
      {
        idProduct: 25,
        idLeverancier: 3,
        naam: "AEG L8FENS96",
        eenheidsprijs: 1500,
        btwtarief: 21,
        foto: "https://media.s-bol.com/my2JrkoGE4KO/550x771.jpg",
        aantal: 5,
        categorie: "Wasapparaten",
        gewicht: 75,
        beschrijving:
          "Stille en krachtige wasmachine met ÖKOInverter-motor voor duurzaam en efficiënt wassen."
      }
      
    ]);
  },
};
