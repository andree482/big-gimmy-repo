// Sistema universale di gestione immagini prodotti
export interface ProductImageMapping {
  [slug: string]: string;
}

// Mapping delle immagini dei prodotti
export const PRODUCT_IMAGE_MAP: Record<string, string> = {
  // Prodotti WHY Sport Proteine - WPC 100% e PERFECT 100% WHEY
  "wpc-100": "WHEY PROTEIN 90 Banana_Fronte.jpg",
  "perfect-100-whey": "perfect-100-whey-pesca-450g.png",
  "essential-100-whey": "essential-100-whey.png",
  "perfect-blend-90": "perfect-blend-90-cacao-750g.png",
  "top-100-xp-cacao": "top-100-xp-cacao.jpg",
  "vegetal-100-protein": "vegetal-100-protein.png",
  "hydrolyzed-104-dh4": "hydrolyzed-100-whey.png",

  // Mapping di base per tutti i prodotti esistenti
  
  // Prodotti Jamieson Vitamine - Immagini caricate
  "selenio-100-jamieson": "2393_singolo_1750627156891.png",
  "calcio-citrato-d3-jamieson": "2847_singolo_1750627156892.png", 
  "licopene-jamieson": "4622_singolo_1750627156892.png",
  "vita-vim-multivitaminico-jamieson": "4793_singolo_1750627156892.png",
  "lutein-z-jamieson": "4883_singolo_1750627156892.png",
  "spirulina-jamieson": "5634_singolo_1750627156892.png",
  "olio-di-lino-jamieson": "6234_singolo_1750627156892.png",
  "omega-3-select-mini-jamieson": "7355_singolo_1750627156892.png",
  "omega-complete-krill-jamieson": "7844_singolo_1750627156892.png",
  "omega-3-extra-jamieson": "7920_singolo_1750627156892.png",
  "vitamina-c-masticabile-jamieson": "7959_singolo_1750627156892.png",
  "vitamina-k2-d3-jamieson": "9043_singolo_1750627156892.png",
  "magnesio-tripla-azione-jamieson": "magnesio-tripla-azione.png",
  "calcio-650-why-sport": "calcio-650-120-compresse.png",
  "ashwagandha-jamieson": "ashwagandha-60-compresse.png",
  "astaxantina-softgel": "astaxantina-softgel.jpg",
  "alaform-800-premier": "alaform-800.png",
  "echinacea-purpurea": "echinacea-purpurea.png",
  "korean-red-ginseng": "korean-red-ginseng.png",
  
  // Prodotti PRE-WORKOUT  
  "adrenaline-agrumi-pre-workout": "W063_singolo_1750778570187.png",
  "ready-pre-workout": "Ready 420g preworkout web_1750780343043.jpg",
  
  // Prodotti ENERGETICI
  "liquid-carbo-flash-80": "Liquid Carbo+ FLASH80 Frutti di bosco FRONTE_1750780343039.jpg",
  

  "premier-pancake": "Pancake-300x411_1750183591622.png",
  "premier-pancake-natural-900g": "Pancake-300x411_1750183591622.png",
  // Rimosse entry duplicate di pistacchio-crema-proteica (ora definite nella sezione prodotti recenti)
  "pistacchio-crema-proteica-250g": "Pistacchio 250 g FRONTE_1750183611177.jpg",
  // Prodotti VOLCHEM - Mirabol Whey Protein 94%
  "mirabol-whey-protein-94-volchem": "Mirabol Whey Protein 94 vanilla 750g web.jpg",
  "mirabol-whey-94-vanilla-750g": "Mirabol Whey Protein 94 vanilla 750g web.jpg",
  "mirabol-whey-94-banana-750g": "Mirabol Whey 750g Banana web.jpg",
  "mirabol-whey-94-chocolate-750g": "Mirabol Whey Protein 94 chocolate 750g web.jpg",
  "mirabol-whey-94-coffee-750g": "Mirabol Whey 750g coffee web.jpg",
  "mirabol-whey-94-strawberry-750g": "Mirabol Whey Protein 94 strawberry 750g web.jpg",
  "mirabol-whey-94-double-chocolate-750g": "Mirabol Whey Protein 94 double chocolate 750g web.jpg",
  "mirabol-whey-94-bacio-750g": "Mirabol Whey Natural Bacio Web.jpg",
  "mirabol-whey-94-banana-500g": "Mirabol Whey Protein 94 banana 500g web.jpg",
  "mirabol-whey-94-strawberry-500g": "Mirabol Whey Protein 94 strawberry 500g web.jpg",
  "mirabol-whey-94-coffee-500g": "Mirabol Whey Protein 94 cooffe 500g web.jpg",

  // Prodotti VOLCHEM - Aminotool EAA
  "aminotool-eaa-volchem": "Aminotool eaa 252g orange web.jpg",
  "aminotool-eaa-orange": "Aminotool eaa 252g orange web.jpg",
  "aminotool-eaa-lemon-lime": "Aminotool EAA 252g lemon-lime web.jpg",
  "aminotool-252g-orange": "Aminotool 252g orange web.jpg",

  // Prodotti +WATT - Proteine
  "whey-protein-90-banana": "WHEY PROTEIN 90 Banana_Fronte.jpg",
  "whey-protein-90-vaniglia": "WHEY PROTEIN 90 Vaniglia_Fronte.jpg",
  "whey-protein-90-fragola": "WHEY PROTEIN 90 GUSTO FRAGOLA_FRONTE.jpg",
  "whey-protein-90-fior-di-latte": "WHEY PROTEIN 90 FIOR DI LATTE Fronte.jpg",
  "whey-protein-90-crema-nocciola": "WHEY PROTEIN 90_crema nocciola_Fronte.jpg",
  "whey-protein-90-natural": "WHEY PROTEIN 90_Natural_Fronte.jpg",

  "whey-protein-80-banana": "WHEYGHTY PROTEIN 80 BANANA fronte.jpg",
  "whey-protein-80-cacao": "WHEYGHTY PROTEIN 80 CACAO fronte.jpg",
  "whey-protein-80-cappuccino": "WHEYGHTY PROTEIN 80 CAPPUCCINO Fronte.jpg",
  "whey-protein-80-cocco": "WHEYGHTY PROTEIN 80 COCCO Fronte.jpg",
  "whey-protein-80-nocciola": "WHEYGHTY PROTEIN 80 NOCCIOLA 750g_Fronte.jpg",
  "whey-protein-80-fragola": "WHEYghty PROTEIN 80 Fragola_Fronte.jpg",
  "whey-protein-80-vaniglia": "WHEY PROTEIN 80_vaniglia_Fronte.jpg",

  // Prodotti +WATT - Barrette
  "protein-wafer-low-sugar": "PROTEIN WAFER LOW SUGAR_Cacao_Fronte.jpg",
  "protein-wafer-low-sugar-vaniglia": "PROTEIN WAFER LOW SUGAR_Vaniglia_Fronte.jpg",
  "protein-evo-cocco": "Protein+ EVO cocco FRONTE.jpg",
  "protein-evo-creme-caramel": "Protein+ EVO crème caramel FRONTE.jpg",

  // Prodotti +WATT - Proteine speciali
  "top-eggxellent-protein": "TOP EGGXELLENT PROTEIN_CACAO_Fronte_1749996078038.jpg",
  "xxx-hydrolysed-protein-90": "XXX HYDROLYSED 750 g Cacao Fronte_1749996348004.jpg",
  "protein-classic-banana": "Protein+ classic_banana_fronte.jpg",
  "protein-classic-cacao": "Protein+ classic cacao FRONTE.jpg",
  "protein-classic-cocco": "Protein+ classic cocco FRONTE.jpg",
  "protein-white-limone": "Protein+ white crema limone FRONTE.jpg",
  "protein-white-tiramisu": "Protein+ white tiramisu FRONTE.jpg",
  "protein-white-vaniglia": "Protein+ white vaniglia FRONTE.jpg",
  "light-protein-bar-caramello": "LIGHT PROTEIN BAR CARAMELLO Fronte.jpg",
  "light-protein-bar-cheesecake": "LIGHT PROTEIN BAR CHEESECAKE Fronte.jpg",
  "big-bar-cookie-nocciola": "07-big-bar-cookie-nocciola.jpg",
  "bigbar-30-cocco": "06-big-bar-cocco.jpg",
  "low-sugar-bar-brownie": "Low-Sugar-Bar-50g-brownie-FRONTE.jpg",
  "low-sugar-bar-cookie-cream": "Low-Sugar-Bar-50g-cookie-cream-FRONTE.jpg",
  "barrettone-2-0-cacao": "04-barrettone-cacao.jpg",
  "barrettone-2-0-vaniglia": "05-barrettone-vaniglia.jpg", 
  "barrettone-2-0-burro-arachidi": "03-barrettone-burro-arachidi.jpg",
  "barrettone-2-0": "04-barrettone-cacao.jpg",
  "big-bar": "06-big-bar-cocco.jpg",

  // Nuovi prodotti proteine - immagini principali
  "hydro90-bv-104": "hydro90-vaniglia-18kg.png",
  "vegan-isopea-90": "vegan-isopea-90-cioccolato-700g.png",
  "smart-protein-cacao": "smart-protein-cacao-320ml.jpg",
  "perfect-mass": "perfect-mass-cacao-biscuit-1600g.png",

  // Nuovi prodotti aminoacidi - 12 prodotti (IMMAGINI CORRETTE)
  "aminoacidi-plus": "AMINOACIDI Arancia_Fronte_1750948719180.jpg",
  "aminoacidi-essenziali-plus-polvere": "AMINOACIDI ESSENZIALI POLVERE_cola_Fronte_1750948719181.jpg",
  "aminotool-eaa": "Aminotool EAA 252g lemon-lime web_1750948719182.jpg",
  "argin": "Argin 300 cpr web_1750948719184.jpg",
  "arginina-alfaketoglutarato-2000": "arginina-alfaketoglutarato-2000.jpg",
  "alc-plus-1000": "W175_alc-plus-60-cpr_singolo.png",
  "arginine-no": "ARGININE-NO-SITO-300x411.png",
  "bcaa-8-1-1": "bcaa-8-1-1-350g-arancia.jpg",
  "daa-acido-d-aspartico": "acido-d-aspartico.jpg",
  "lipoic-1000": "W429_lipoic-1000-60-cpr_singolo.png",
  "glutamina-pure": "GLUTAMINE-PURE-100-SITO-300x411 (1).png",
  "intra-pro-essential-plus-premier": "INTRA-PRO-ESSENTIAL-SITO-PREMIERINTEGRATORI.png",
  "bcaa-8-1-1-peptide": "bcaa-8-1-1-peptide-100-cpr.jpg",
  "lutein-z": "4883_singolo_1750627156892.png",
  "lutein-z-jamieson": "4883_singolo_1750627156892.png",
  "arginina-plus-complex-capsule": "ARGININA COMPLEX CAPSULE_Fronte_1750948719185.jpg",
  "bcaa-plus-8-1-1-nuovo": "BCAA LEUCING LOADING_arancia_Fronte_1750948719186.jpg",
  "d-glucosio": "D-GLUCOSIO1-5KG_FRONTE_1750948719188.jpg",
  "glutamass": "Glutamass glutamina 300cpr web_1750948719190.jpg",
  "glutammina-plus-polvere": "GLUTAMMINA POLVERE 300G_FRONTE_1750948719190.jpg",
  "hard-beta-alanine": "HARD-BETA-ALANINE-SITO-300x411_1750948719191.png",
  "high-bcaa-2-1-1": "HIGH-BCAA-SITO-300x411_1750948719191.png",
  "norincol": "Norincol 80 cpr web_1750948719192.jpg",

  // Nuove mappature preferiti - 27 prodotti mancanti
  "capppellino-ethicsport-taglia-unica": "cappellino.jpeg",
  "glutammina-peptide": "glutammina-peptide.jpg",
  "pre-gara-endurance": "pre-gara-endurance.png",
  "maltodex-pure-100": "MALTODEX-SITO.png",
  "fluid-motion": "fluid-motion.png",
  "kal-redux-+": "kal-redux-1.png",
  "tribulus-1000-plus": "tribulus-1000-plus.jpg",
  "beta-alanina-1000-mg": "beta-alanina-1000-mg.jpg",
  "high-pro-release": "HIGH-PRO-RELEASE-SITO.png",
  "hard-stack-red-hot": "hard-stack-sito-1.png",
  "creatina-vector": "creatina-vector.jpg",
  "cla-1000": "cla-1000.jpg",
  "super-dextrin-energy-bar": "super-dextrin-tasty.jpg",
  "dextro-plus": "dextro-plus.jpg",
  "ashwagandha-forte-500-mg": "ashwagandha-forte-500mg.jpg",
  "aminoacidi-essenziali": "aminoacidi-essenziali-300g-cola-lemon.png",
  "comfort-plus": "comfort-plus.jpg",
  "power-whey-amino-support": "power-whey-amino-support-cioccolato.jpg",
  "egg-protein-cioccolato": "egg-protein-cioccolato.jpg",
  "repoxan": "repoxan.jpg",
  "glutamine-pure-100": "GLUTAMINE-PURE-100-SITO-300x411 (1).png",
  "peanut-butter-premier": "burro-di-arachidi-sito.png",
  "hmb-3000": "hmb-3000.jpg",
  "alaform-800": "alaform-800.png",
  "arginine-no-premier": "ARGININE-NO-SITO-300x411.png",
  "glutamine-pure-1000": "GLUTAMINE-PURE-1000-SITO-300x411 (1).png",

  // Mappature preferiti - batch 2 (73 prodotti)
  "acido-d-aspartico": "acido-d-aspartico.jpg",
  "arginina-argipower-100-percent": "arginina-argipower-100.jpg",
  "arginina-piroglutammato-e-lisina": "arginina-piroglutammato-e-lisina.jpg",
  "astaxantina-plus": "ASTAXANTINA SOFTGEL_FRONTE.jpg",
  "bcaa-2-1-1-proram": "bcaa-2-1-1-proram-100-capsule.jpg",
  "bcaa-sport-4-1-1": "bcaa-sport-4-1-1-100-cpr.jpg",
  "borraccia-ethicsport": "borraccia-600.jpeg",
  "caffè-verde-te-matcha": "caffè-verde-te-matcha-800mg.jpg",
  "citrullina-malato-175g": "citrullina-malato-175g.jpg",
  "cla-1000-why-sport": "cla-1000.jpg",
  "co-q10-forte-1000mg": "co-q10-forte-1000mg.jpg",
  "collagene-ethicsport": "collagene-ethicsport.png",
  "creatina-krealkalyn": "creatina-krealkalyn-120-cpr.jpg",
  "creatina-tabs-monoidrata": "creatina-tabs-200-cpr.jpg",
  "depurixia-antiossidante": "depurixia-antiossidante.jpg",
  "dima-therm": "dima-therm-1df4-500x912.webp",
  "d-ribosio": "D RIBOSIO_Fronte.jpg",
  "eaa-amminoacidi-essenziali-solubili": "eaa-amminoacidi-essenziali-solubili.png",
  "eaa-pro": "eaa-pro.jpg",
  "eaa-tabs": "eaa-tabs.jpg",
  "gaba-1000": "gaba.jpg",
  "ghanabol-active-9": "ghanabol-active-9.jpg",
  "glucosamina": "glucosamina-+-condroitina-+-msm-+-vitamina-c.png",
  "glutammina-sport-recovery": "glutammina-sport-recovery.jpg",
  "glutatione-liposomiale": "glutatione-liposomiale.jpg",
  "gluta-max": "gluta-max.jpg",
  "gluta-pep": "gluta-pep.jpg",
  "hard-acetyl-1000": "HARD-ACETYL-SITO.png",
  "hard-staart-x-plode": "HARD-START-XPLODE-SITO-1.png",
  "hard-wph-bv104-premier": "SITO-wph-104-premier-integratori-crema-caffe.png",
  "hard-zma-xp-premier": "ZMA-SITO-PREMIERINTEGRATORI.png",
  "hepax-forte": "HEPAX-FORTE-300x411 (1).png",
  "hmb-1000-mg": "hmb-1000-mg.jpg",
  "leucine-1000": "leucine-1000.jpg",
  "lipoic-800-crom": "lipoic-800-crom.jpg",
  "lisina": "lisina.jpg",
  "magnesium-glycinate": "magnesium-glycinate.png",
  "maltoshot-endurance-plus": "maltoshot-endurance-plus.png",
  "mass-matrix-cioccolato": "mass-matrix-cioccolato-1,3kg.jpg",
  "maxivit-sport": "maxivit-sport.jpg",
  "milk-protein-90-micellar-casein": "milk-protein-90-banana.png",
  "omega-3-6-9": "omega-3-6-9.jpg",
  "omega-3-pro": "OMEGA-3-SITO-1.png",
  "perfect-bar-50": "W262_PERFECT-BAR-BIANCOCIOK-BISCOTTO-CRISP.png",
  "prime-casein": "prime-casein-cioccolato.jpg",
  "prime-wpi": "prime-wpi-cioccolato.jpg",
  "pure-soy-isolate": "pure-soy-isolate-cioccolato.jpg",
  "ram-1000-bcaa": "ram-1000-bcaa-100-compresse.jpg",
  "sacca-taglia-unica": "sacca.jpeg",
  "sali-activator-1-0-8": "SALI ACTIVATOR ARANCIA ROSSA_Fronte.jpg",
  "super-dextrin-gel-pro": "super-dextrin-gel-pro.png",
  "super-dextrin-pro": "super-dextrin-pro.png",
  "super-hydro-plus": "super-hydro-tabs-arancio.png",
  "taurina-1000-mg": "taurina-1000-mg-150-compresse.jpg",
  "testogen": "testogen.png",
  "thermo-caffeine": "W299_thermo-caffeine-90-cpr_singolo.png",
  "thermo-master": "thermo-master.png",
  "thermo-no-caffeine": "W300_thermo-no-caffeine-90-cpr_singolo.png",
  "thermogenic-force": "thermogenic-force-120-compresse.jpg",
  "top-100-xp-watt": "top-100-xp-cacao.jpg",
  "total-egg-premier": "TOTAL-EGG-SITO.png",
  "total-energy": "TOTAL-ENERGY-SITO.png",
  "vitamin-c-1000-mg": "vitamin-c-1000-mg-90-compresse.jpg",
  "vitamina-c-1000-ethicsport": "vitamina-c-1000.png",
  "vitamina-d3-2000-iu": "vitamina-d3-2000-iu.png",
  "vitamina-d3-2000-ui": "vitamina-d3-2000-iu.png",
  "viteral-prolabs": "viteral.jpg",
  "vpr-vegetal-protein-integratore-alimentare-di-proteine-vegetali": "vpr-vegetal-protein-integratore-alimentare-di-proteine-vegetali.png",
  "weight-control-new-formula": "weight-control-new-formula-9f17-500x500.webp",
  "whey-iso": "whey-iso-cioccolato.jpg",

  // Mappature preferiti - batch 3 (20 prodotti)
  "creatina-micronizzata-100": "creatina-micronizzata-200g.jpg",
  "creatina-transport-1000": "creatina-transport-1000-200-cpr.jpg",
  "d3-k2-complex-premier": "vitamina-d3-k2-60-compresse.jpg",
  "fish-oil": "fish-oil.jpg",
  "glutammina-glutpower": "glutammina-glutpower.jpg",
  "i-m-collagen": "i-m-collagen.jpg",
  "isowhey-pro-zyme-premier-cioccolato-450g": "ISOWHEY-WEB-PREMIER.png",
  "leucina-1000-mg": "leucina-1000-mg.jpg",
  "lipoic-b": "lipoic-b.jpg",
  "massive-gain-xxl-premier": "MASSIVE-GAIN-SITO.png",
  "omnia-active-formula": "omina-active-formula.png",
  "ornitina-akg": "ornitina-akg.jpg",
  "prime-oat": "prime-oat-cioccolato.jpg",
  "prime-whey-hydro-plus": "prime-whey-hydro-plus-cioccolato.jpg",
  "ramtech-bcaa-2-1-1": "ramtech-bcaa.png",
  "stack-fire-boost": "stack-fire-boost-30b7-500x500.webp",
  "starter-1000": "starter-1000.jpg",
  "test-protein-bar": "45-protein-bar-cookies-crisp.png",
  "amino-pool-bv104": "amino.pool-bv-104.png",
  "bcaa-plus-8-1-1": "bcaa-811-polvere-arancia-100-g-44fa (copy).webp",
  "hard-eaa-8-1-premier": "EAA-SITO.png",
  "hydrolyzed-104-dh4": "W430_hydrolyzed-104-dh4-ciocc.-900-g_singolo.png",
  "essential-100-whey": "W251_essential-100-whey-900-g-cacao_singolo.png",

  // NUOVI 6 PRODOTTI AMINOACIDI - immagini copertina
  "pocket-carnitine": "POCKET CARNITINE_Diagonale fronte_1750951382268.jpg",
  "rm1-bcaa-8-1-1-recovery-mix": "RM1 New Formula (BCAA 8.1.1)  500 g arancia FRONTE_1750951382269.jpg",
  "volamin-bcaa": "Volamin 300 cpr web_1750951382270.jpg",
  "volamin-powder": "Volamin Powder 224g orange_1750951382271.jpg",
  "bcaa-1000-b6": "W001_singolo_1750951382273.png",
  "glutammina-pure": "W012_singolo_1750951382275.png",
  "bcaa-supreme-4-1-1": "W176_singolo_1750951382276.png",
  "essenziali-zero-carb": "W247_singolo_1750951382277.png",
  "essential-amino-9-3": "2b3a554e-3dbf-4e64-aaa1-d3ae38efe251_1750951408616.png",

  // Prodotti +WATT - Creatina
  "creatina-extra-gold-100g": "CREATINA_Extra Gold_100g_Fronte.jpg",
  "creatina-compresse-extra-gold": "CREATINA Compresse Extra Gold_Fronte.jpg",
  "creatina-polvere-gold": "CREATINA POLVERE GOLD_FRONTE.jpg",
  "creatina-polvere-350g": "Creatina+ polvere extragold 350 FRONTE.jpg",
  "creanized-creatina": "CREANIZED_CRETINA_MONOIDRATO_Fronte.jpg",

  // NUOVI PRODOTTI CREATINA - 7 prodotti categoria Creatina
  "creanized-creatina-monoidrato": "CREANIZED_CRETINA_MONOIDRATO_Fronte_1751037655150.jpg",
  "creatina-extra-gold": "CREATINA_Extra Gold_100g_Fronte_1751037655153.jpg",
  "creatyl": "Creatyl creatina 120 cpr web_1751037744104.jpg",
  "gluco-creatina": "GLUCO CREATINA Compresse_Fronte_1751037744108.jpg",
  "creatina-platinum": "W013_singolo_1751037744109.png",
  "creatina-platinum-1300": "W026_singolo_1751037744110.png",
  "creatina-200-mesh": "W166_singolo_1751037744110.png",

  // NUOVI PRODOTTI ACCESSORI - 6 prodotti categoria Accessori
  "epilact-sport-protezione-unghie": "EP926741758_singolo_1751038145711.png",
  "physiostrap-ski": "EP973147061_singolo_1751038145714.png",
  "borraccia-why-sport-500ml": "WSX244_singolo_1751038145715.png",
  "borsone-why-sport": "WSX248_singolo_1751038145715.png",
  "sport-shaker-why-sport": "WSX276_singolo_1751038145717.png",
  "borraccia-sport-500ml": "WSX368_singolo_1751038145719.png",

  // NUOVI PRODOTTI ABBIGLIAMENTO - 3 prodotti nella categoria Accessori
  "leggings-donna-why-sport": "WSX043_singolo_1751038922376.png",
  "top-donna-why-sport": "WSX179_singolo_1751038922384.png",
  "short-donna-why-sport": "WSX182_singolo_1751038922384.png",

  // Prodotti +WATT - Mass Gainer
  "mass-formula-mct-gainer-cacao": "mass-formula-cacao.jpg",
  "mass-formula-mct-gainer-nocciola": "MASS FORMULA MCT GAINER_Nocciola_Fronte.jpg",
  "avena-cappuccino": "AVENA 1-360KG CAPPUCCINO_FRONTE.jpg",
  "avena-cacao": "AVENA 1-360KG CACAO_FRONTE.jpg",
  "avena-nocciola": "avena-nocciola.jpg",

  // Prodotti +WATT - Vitamine e Minerali
  "electrolyte-arancia": "ELECTROLYTE_Arancia_Fronte.jpg",
  "electrolyte-limone": "ELECTROLYTE_Limone_Fronte.jpg",
  "energy-pump-limone": "ENERGY PUMP_Limone_Fronte.jpg",
  "fluid-cramp-arancia": "FLUID CRAMP_Arancia_Fronte.jpg",
  "ferro-ribes": "FERRO_Ribes_Fronte.jpg",
  "d-ribosio": "D RIBOSIO_Fronte.jpg",
  "b-strong": "B-STRONG-Fronte.jpg",
  "ashwagandha-pura": "ASHWAGANDHA-PURA-Fronte.jpg",

  "berberina-60-capsule": "BERBERINA-60-CAPSULE-FRONTE.jpg",
  "collagene": "Collagene-Fronte.jpg",
  "comfort-vision": "Comfort-Vision-Fronte.jpg",
  "bromelina": "Bromelina-Fronte.jpg",
  "antiradical-mix": "Antiradical-mix-60-capsule-FRONTE.jpg",
  "enziplus": "ENZIPLUS CAPSULE fronte.jpg",
  "dretox-450ml": "DRETOX-450ML-FRONTE.jpg",

  // Prodotti POWERBAR (dal database)
  "powerbar-protein-plus-chocolate": "21484602_singolo.png",
  "powerbar-whey-isolate-vanilla": "21480202_box.png",
  "powerbar-protein-plus-vanilla": "21482402_singolo.png",
  "powerbar-whey-protein-strawberry": "21489401_box.png",
  "powerbar-recovery-protein-chocolate": "24712303_singolo.png",
  "powerbar-protein-max-cookies": "24717502_singolo.png",
  "powerbar-whey-isolate-pro-banana": "24763146_box.png",
  "powerbar-energize-berry": "21013001_box.png",
  "powerbar-performance-chocolate": "21033001_singolo.png",
  "powerbar-natural-energy-banana": "21012001_singolo.png",
  "powerbar-electrolytes-lemon": "22010800_singolo.png",
  "powerbar-magnesium": "22020100_singolo.png",
  "powerbar-vitamin-complex": "22060000_box.png",
  "powerbar-zinc-plus": "22040300_box.png",
  "powerbar-mass-gainer-chocolate": "23334700_singolo.png",
  "powerbar-weight-gainer-vanilla": "23345700_singolo.png",
  "powerbar-carb-load-orange": "21362042_box.png",
  "powerbar-energy-source": "21384100_singolo.png",
  "powerbar-caffeine-boost-cola": "21121001_box.png",

  // Prodotti JAMIESON - Vitamine e Minerali
  "jamieson-vitamin-d3-1000": "12450712_singolo.png",
  "jamieson-omega-3": "128365_singolo.png",
  "jamieson-b-complex": "128370_singolo.png",
  "vitamina-d3-1000-ui": "12450712_singolo.png",
  "omega-3-select": "128365_singolo.png",
  "complesso-b-100": "128370_singolo.png",
  "vitamina-c-1000mg": "12450712_singolo.png", // Usando Jamieson D3 come placeholder temporaneo
  "magnesio-250mg": "128365_singolo.png", // Usando Jamieson Omega-3 come placeholder temporaneo
  "calcio-600mg-vitamina-d3": "128370_singolo.png", // Usando Jamieson B-Complex come placeholder temporaneo

  // Prodotti WHY SPORT
  "why-sport-protein-chocolate": "2300_singolo.png",
  "energy-bar-premium-mixed": "2102_singolo.png",
  "amino-complex-pro-orange": "2215_singolo.png",

  // Prodotti principali rimanenti - mappatura esplicita
  "milk-protein-90-micellar-casein": "milk-protein-90-banana.png",
  "whey-protein-90": "WHEY PROTEIN 90 Vaniglia_Fronte.jpg",
  "whey-protein-80": "wheyghty-protein-80-250-g-cacao-bea8-500x500_1751552286392.webp",
  "wheyghty-protein-80": "WHEYGHTY PROTEIN 80 CACAO fronte.jpg",
  "wheyghty-protein-80-standard": "WHEYGHTY PROTEIN 80 CACAO fronte.jpg",
  "wheyghty-protein-80-limited-edition": "WHEYGHTY PROTEIN 80 CACAO fronte.jpg",

  // Altri prodotti specifici
  "liquid-carbo-arancia": "LIQUID CARBO_Arancia_Fronte.jpg",
  "carbowart-pistacchio": "CARBOWART_Pistacchio_Fronte.jpg",
  "burn-out-lampone": "01-burn-out-lampone.jpg",
  "fruitforce-ananas": "FRUITFORCE-ANANAS-Fronte.jpg",
  "fruitforce-fragola": "12-fruitforce-fragola.jpg",
  "fruitforce": "12-fruitforce-fragola.jpg",
  "carbo-energy-albicocca": "08-carbo-energy-albicocca.jpg",
  "carbo-energy-plus": "08-carbo-energy-albicocca.jpg",
  "carbo-energy-agrumi": "10-carbo-energy-agrumi.jpg",
  "carbo-energy-frutti-bosco": "09-carbo-energy-frutti-bosco.jpg",
  "carbo-energy-mela-verde": "11-carbo-energy-mela-verde.jpg",
  "grissini-proteici": "14-grissini-proteici-arachidi-mandorle.jpg",
  "iso-soya": "15-iso-soya-premier.jpg",
  "light-protein-plus-bar": "16-light-protein-bar-cheesecake.jpg",
  "light-protein-bar": "16-light-protein-bar-cheesecake.jpg", // Aggiunta per correggere slug
  
  // 45 Protein Bar - immagini aggiornate secondo specifiche
  "45-protein-bar": "45-protein-bar-box-24pz.png", // Immagine copertina → Box 24pz WHY Sport (sostituisce placeholder)
  "45-protein-bar-cookies-crisp-45g": "W237_45_Protein_Bar_cookies_crisp_1751554724885.png",
  "45-protein-bar-cookies-crisp-24pz": "W237_box_1751554724885.png", // 2ª immagine → Cookies Crisp 24pz
  "oatmeal-pro-biscotto": "oatmeal-pro-biscotto.jpg",
  "veggie-ciok-albicocca": "Veggie-Ciok-40g-albicocca-FRONTE.jpg",
  "veggie-ciok-arancia": "Veggie-Ciok-40g-arancia-FRONTE.jpg",
  "veggie-ciok-cacao": "Veggie-Ciok-40g-cacao-FRONTE.jpg",
  "turboactive-arachidi": "TurboActive_Arachidi_Fronte.jpg",
  "turboactive-cacao": "TurboActive_Cacao_Fronte.jpg",
  "smart-protein-cacao-existing": "SMART PROTEIN_CACAO_Fronte.jpg",
  "soy-protein-221": "SAY-PROTEIN-221-CACAO-fronte.jpg",
  "soy-protein-221": "SAY-PROTEIN-221-NOCCIOLA-fronte.jpg",
  "say-protein-221-cacao-existing": "SAY PROTEIN 221 CACAO fronte.jpg",
  "say-protein-221-nocciola-existing": "SAY PROTEIN 221 NOCCIOLA fronte.jpg",

  // Prodotti Jamieson
  "vitamin-d-2000-iu": "Vitamin D 2000 IU 60 cpr_1750778570180.jpg",
  "vitamin-d-800-iu": "Vitamin D 800 IU 100 cpr web_1750778570179.jpg",

  // Prodotti +WATT
  "sali-performance-electrolyte": "SALI PERFORMANCE_Arancia_Fronte_1750778570175.jpg",
  "star-gel-plus": "star-gel-plus.jpg",
  "triboost": "TRIBOOST_Fronte_1750778570178.jpg",
  "vitamina-c-1000": "VITAMINA C_Fronte_1750778570180.jpg",
  "vitamine-minerals-watt": "VITAMINS_MINERALS_30_Compresse_Fronte_1750778570185.jpg",

  // Prodotti Premier
  "vital-energy": "VITAL-ENERGY-300x411_1750778570178.png",
  "vitamin-d3-2000-premier": "Vitamin-D3-2000-300x411 (1)_1750778570181.png",

  // Prodotti WHY Sport
  "magnesio-potassio-sport": "magnesio-potassio-sport-updated.png",
  "drenante-why-nature": "WN122_singolo_1750778570190.png",
  "vitamina-b12-1000": "WN234_singolo_1750778607581.png",
  "refuel-recovery": "W172_box_1750778570187.png",
  "testo-xplode": "W297_singolo_1750778570188.png",
  "ps200-fosfatidilserina": "W386_singolo_1750778570189.png",

  // Prodotti Volchem
  "vitamina-d3-800-iu-volchem": "Vitamin D 800 IU 100 cpr web_1750778570179.jpg",
  "vitamina-d3-2000-iu-volchem": "Vitamin D 2000 IU 60 cpr_1750778570180.jpg",

  // Batch 3 - Nuovi 16 prodotti vitamine
  "fibra-watt": "FIBRA WATT_Fronte_1750780343032.jpg",
  "hard-b-life-complex": "HARD-B-LIFE-COMPLEX-SITO-300x411 (1)_1750780343035.png",
  "hard-c-life-plus-1000": "Hard-C-life-plus-1000 (1)_1750780343036.png",
  "hard-dren-1000": "HARD-DREN-SITO-300x411_1750780343036.png",
  "hard-vitamin-complex": "HARD-VITAMIN-SITO-300x411 (1)_1750780343037.png",
  "hepax-forte": "HEPAX-FORTE-300x411 (1)_1750780343037.png",
  "joint-flex-d3-plus": "JOINT-FLEX-sito-300x411_1750780343038.png",
  "megavis-1100mg-tablet": "Megavis 1100 l-carnitina 30 cpr web_1750780343039.jpg",
  "melatonine-plus": "melatonine-2-1-300x532 (1).png",
  "norincol-marine-collagen": "Norincol Marine Collagen 300g lemon_1750780343041.jpg",
  "norincol-marine-collagen-limone": "Norincol Marine Collagen 300g lemon_1750780343041.jpg", 
  "norincol-marine-collagen-arancia": "Norincol Marine Collagen 300g orange_1750780343041.jpg",
  "omega-3-egq": "Omega3 EGQ 180 perle FRONTE_1750780343042.jpg",
  "omega-3-xc-40-20-gold": "OMEGA3-XC-300x411_1750780343042.png",
  "sali-activator-1-0-8-arancia-rossa": "SALI ACTIVATOR ARANCIA ROSSA_Fronte_1750780343044.jpg",
  "sali-activator-1-0-8-fragola-banana": "SALI ACTIVATOR FRAGOLA E BANANA_Fronte_1750780343044.jpg",

  // ============ BATCH 4 - 12 NUOVI PRODOTTI VITAMINE ============
  // Basato su attached_assets/vitamine 13 prodotti ORD.4 (corretto)_1750781984146.md
  
  // Nuovi prodotti - 12 immagini dal quarto batch
  "ashwagandha-plus": "ashwagandha-2-1-300x548 (1)_1750781953158.png",
  "ashwagandha-pura-watt": "ASHWAGANDHA PURA_Fronte_1750781953157.jpg",

  "bcaa-liquid-carbo-plus": "BCAA LIQUID CARBO_FRONTE_1750781953159.jpg",
  "bcaa-plus-8-1-1-polvere": "BCAA POLVERE 300g_Fronte_1750781953159.jpg",
  "bcaa-ride-gel-plus": "BCAA RIDE GEL GUSTO TUTTI I FRUTTI_Fronte_1750781953160.jpg",
  "berberina-plus": "BERBERINA 60 CAPSULE_FRONTE_1750781953161.jpg",
  "calcium-volchem": "Calcium calcio 30 cpr WEB_1750781953161.jpg",
  "collagene-silicio-stabilizzato": "Collagene_Fronte_1750781953162.jpg",
  "complex-carbs-advanced-ratio": "COMPLEX CARBS_Fronte_1750781953162.jpg",
  // Sali+ Electrolyte - consolidato in un singolo prodotto con varianti 
  "sali-electrolyte-pocket-minerals": "ELECTROLYTE_Limone_Fronte_1750781953163.jpg",
  "sali-electrolyte-pocket-minerals-arancia": "ELECTROLYTE_Arancia_Fronte_1750781953163.jpg",
  "sali-electrolyte-pocket-minerals-limone": "ELECTROLYTE_Limone_Fronte_1750781953163.jpg",

  // === BARRETTE ENERGETICHE ===
  // Promeal Protein Snack 38% - Volchem
  "promeal-protein-snack-38": "Promeal Snacks bianco 150x250 web_1751034029688.jpg",

  // Protein Cream - Premier  
  "protein-cream": "95079ee6-5454-441a-8659-f2945312edc5_1751034033069.png",

  // Veggie Ciok - +WATT
  "veggie-ciok": "Veggie Ciok  40 g arancia FRONTE_1751034075964.jpg",

  // Perfect Bar 50% - WHY Sport
  "perfect-bar-50": "W462_singolo_1751034154888.png",

  // Energy Fuel - WHY Sport
  "energy-fuel": "W468_singolo_1751034332990.png",

  // Crema di Arachidi Peanut Butter - WHY Sport
  "crema-di-arachidi-peanut-butter": "WN054_singolo_1751034533751.png",

  // Wafer Zero - WHY Sport
  "wafer-zero": "WN160_singolo_1751034567870.png",

  // === NUOVI 8 PRODOTTI BARRETTE ENERGETICHE ===
  // Pancake Proteico - WHY Sport
  "pancake-proteico-why-sport": "W203_singolo_1751035188900.png",

  // 45 Protein Bar - WHY Sport (aggiornato con nuove immagini)
  "45-protein-bar-old": "W236_singolo_1751035188918.png",
  "45-protein-bar-cookies-crisp-old": "W237_box_1751035188919.png",

  // 75 Protein Bar - WHY Sport
  "75-protein-bar": "W240_75_ProteinBar_frutti_di_bosco_crisp_1751035219983.png",

  // Crema di Arachidi Iperproteica - WHY Sport
  "crema-di-arachidi-iperproteica": "W330_singolo_1751035294681.png",

  // EnergyFuel - WHY Sport
  "energyfuel-noci-nocciole": "aafbf9bb-a2aa-446c-abba-1af493193c67_1751035331102.png",

  // Perfect Cream - WHY Sport
  "perfect-cream": "W372_singolo_1751035351796.png",
  "perfect-cream-pistacchio": "W374_singolo_1751035351800.png",
  "perfect-cream-yogurt-frutti-bosco": "W380_singolo_1751035351801.png",

  // Liquid Carbo+ - +WATT
  "liquid-carbo-plus": "LIQUID CARBO_Arancia_Fronte_1751035368933.jpg",

  // Nocciola Crema Proteica - +WATT
  "nocciola-crema-proteica": "nocciola-crema-proteica.jpg",

  // Pistacchio Crema Proteica - +WATT
  "pistacchio-crema-proteica": "Pistacchio 250 g FRONTE_1751036350980.jpg",

  // === NUOVI 9 PRODOTTI ===
  // 1. Energize Advanced - Powerbar
  "energize-advanced": "energize-advanced-15pz.png",

  // 2. Powergel - Powerbar  
  "powergel": "22010100_box_1751035814528.png",

  // 3. High Protein Shake - Powerbar
  "high-protein-shake": "23410202_singolo_1751035832599.png",

  // 4. Burro di Arachidi Croccante - +WATT
  "burro-di-arachidi-croccante": "ARACHIDI CROCCANTE_1KG_Fronte_1751035936116.jpg",

  // 5. Avena Farina Istantanea - WHY Sport
  "avena-farina-istantanea": "WN043_singolo_1751035979180.png",

  // 6. Oatmeal PRO - +WATT
  "oatmeal-pro": "OATMEAL PRO BISCOTTO Fronte_1751036333832.jpg",

  // 7. Pistacchio Crema Proteica - +WATT (già definita sopra)

  // 8. Promeal Energetica - Volchem
  "promeal-energetica": "Promeal Energetica 40g_1751036384519.jpg",

  // 9. Promeal 50% Protein Bar - Volchem
  "promeal-50-protein-bar": "Promeal Energetica 40g_1751036384519.jpg",
};

// Base path per le immagini dei prodotti
export const PRODUCT_IMAGES_BASE_PATH = "/images/products/";

/**
 * Funzione universale per ottenere il percorso dell'immagine di un prodotto
 * @param productSlug - slug del prodotto
 * @returns percorso completo dell'immagine o placeholder se non trovata
 */
export const getProductImagePath = (productSlug: string): string => {
  console.log(`🔍 Cercando immagine per slug: ${productSlug}`);

  // Prima controlla il mapping esplicito
  const fileName = PRODUCT_IMAGE_MAP[productSlug];

  if (fileName) {
    const fullPath = `/images/products/${fileName}`;
    console.log(`✅ Mapping diretto trovato per ${productSlug}: ${fullPath}`);
    return fullPath;
  }

  console.log(`❌ Nessuna immagine mappata per ${productSlug}, usando placeholder`);
  return '/images/products/placeholder-product.jpg';

  // Se non trova nessun mapping, usa direttamente il placeholder
  // Questo evita il flickering tra caricamento e errore
  console.log(`❌ Nessuna immagine mappata per ${productSlug}, usando placeholder`);
  return '/images/products/placeholder-product.jpg';
};

/**
 * Funzione per ottenere multiple immagini di un prodotto (per varianti di gusto)
 * @param productSlug - slug del prodotto
 * @returns array di oggetti immagine con src e alt
 */
export const getProductImages = (productSlug: string): Array<{src: string, alt: string, primary: boolean}> => {
  // Gestione speciale per Perfect 100% Whey con varianti corrette
  if (productSlug === "perfect-100-whey") {
    return [
      {
        src: "/images/products/perfect-100-whey-pesca-450g.png",
        alt: "Perfect 100% Whey Pesca 450g",
        primary: true
      },
      {
        src: "/images/products/perfect-100-whey-cookies-cream-450g.png",
        alt: "Perfect 100% Whey Cookies & Cream 450g",
        primary: false
      },
      {
        src: "/images/products/perfect-100-whey-cioccolato-latte-450g.png",
        alt: "Perfect 100% Whey Cioccolato al Latte 450g",
        primary: false
      },
      {
        src: "/images/products/perfect-100-whey-cioccolato-latte-900g.png",
        alt: "Perfect 100% Whey Cioccolato al Latte 900g",
        primary: false
      },
      {
        src: "/images/products/perfect-100-whey-vaniglia-900g.png",
        alt: "Perfect 100% Whey Vaniglia 900g",
        primary: false
      },
      {
        src: "/images/products/perfect-100-whey-pistacchio-900g.png",
        alt: "Perfect 100% Whey Pistacchio 900g",
        primary: false
      }
    ];
  }

  // Gestione speciale per Perfect Blend 90 con varianti corrette  
  if (productSlug === "perfect-blend-90") {
    return [
      {
        src: "/images/products/perfect-blend-90-cacao-750g.png",
        alt: "Perfect Blend 90 Cacao 750g",
        primary: true
      },
      {
        src: "/images/products/perfect-blend-90-banana-vaniglia-750g.png",
        alt: "Perfect Blend 90 Banana & Vaniglia 750g",
        primary: false
      }
    ];
  }

  // Gestione speciale per Mirabol Whey Protein 94% con tutte le varianti
  if (productSlug === "mirabol-whey-protein-94-volchem") {
    return [
      {
        src: "/images/products/Mirabol Whey Protein 94 vanilla 750g web.jpg",
        alt: "Mirabol Whey Protein 94% Vanilla 750g",
        primary: true
      },
      {
        src: "/images/products/Mirabol Whey 750g Banana web.jpg",
        alt: "Mirabol Whey Protein 94% Banana 750g",
        primary: false
      },
      {
        src: "/images/products/Mirabol Whey Protein 94 chocolate 750g web.jpg",
        alt: "Mirabol Whey Protein 94% Chocolate 750g",
        primary: false
      },
      {
        src: "/images/products/Mirabol Whey 750g coffee web.jpg",
        alt: "Mirabol Whey Protein 94% Coffee 750g",
        primary: false
      },
      {
        src: "/images/products/Mirabol Whey Protein 94 strawberry 750g web.jpg",
        alt: "Mirabol Whey Protein 94% Strawberry 750g",
        primary: false
      },
      {
        src: "/images/products/Mirabol Whey Protein 94 double chocolate 750g web.jpg",
        alt: "Mirabol Whey Protein 94% Double Chocolate 750g",
        primary: false
      },
      {
        src: "/images/products/Mirabol Whey Natural Bacio Web.jpg",
        alt: "Mirabol Whey Protein 94% Bacio 750g",
        primary: false
      }
    ];
  }

  // Gestione speciale per Whey Protein 80 con varianti multiple
  if (productSlug === "whey-protein-80") {
    return [
      {
        src: "/images/products/wheyghty-protein-80-250-g-cacao-bea8-500x500_1751552286392.webp",
        alt: "Whey Protein 80 Cacao 250g",
        primary: true
      },
      {
        src: "/images/products/bdc0c497-3cc5-4dfc-869f-037c1b1f1e09_1751552290192.webp",
        alt: "Whey Protein 80 Nocciola 250g",
        primary: false
      },
      {
        src: "/images/products/WHEYGHTY PROTEIN 80 CACAO fronte.jpg",
        alt: "Whey Protein 80 Cacao 750g",
        primary: false
      }
    ];
  }

  // Gestione speciale per Aminotool EAA con varianti
  if (productSlug === "aminotool-eaa-volchem") {
    return [
      {
        src: "/images/products/Aminotool eaa 252g orange web.jpg",
        alt: "Aminotool EAA Orange 252g",
        primary: true
      },
      {
        src: "/images/products/Aminotool EAA 252g lemon-lime web.jpg",
        alt: "Aminotool EAA Lemon-Lime 252g",
        primary: false
      }
    ];
  }

  const imagePath = getProductImagePath(productSlug);

  return [
    {
      src: imagePath,
      alt: productSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      primary: true
    }
  ];
};

/**
 * Funzione per verificare se un prodotto ha un'immagine mappata
 * @param productSlug - slug del prodotto
 * @returns true se il prodotto ha un'immagine mappata
 */
export const hasProductImage = (productSlug: string): boolean => {
  return productSlug in PRODUCT_IMAGE_MAP;
};

/**
 * Funzione per verificare se un'immagine esiste (da usare nel browser)
 * @param imagePath - percorso dell'immagine
 * @returns Promise<boolean>
 */
export const imageExists = (imagePath: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imagePath;
  });
};

/**
 * Funzione di debug per controllare tutte le immagini mappate
 */
export const debugImages = async (): Promise<void> => {
  console.log('🔍 Controllo immagini mappate...');

  const results = await Promise.all(
    Object.entries(PRODUCT_IMAGE_MAP).map(async ([slug, fileName]) => {
      const fullPath = `${PRODUCT_IMAGES_BASE_PATH}${fileName}`;
      const exists = await imageExists(fullPath);
      return { slug, fileName, fullPath, exists };
    })
  );

  const missing = results.filter(r => !r.exists);
  const found = results.filter(r => r.exists);

  console.log(`✅ Immagini trovate: ${found.length}`);
  console.log(`❌ Immagini mancanti: ${missing.length}`);

  if (missing.length > 0) {
    console.log('❌ Immagini mancanti:', missing.map(m => m.fullPath));
  }
};

/**
 * Funzione per riparare automaticamente mapping immagini mancanti
 */
export const autoFixMissingImages = (): void => {
  console.log('🔧 Auto-riparazione mapping immagini...');

  const problematicProducts = [
    'burn-out', 'carbo-energy-plus', 'fruitforce', 
    'grissini-proteici', 'iso-soya', 'light-protein-plus-bar'
  ];

  problematicProducts.forEach(slug => {
    const imagePath = getProductImagePath(slug);
    console.log(`📸 ${slug} → ${imagePath}`);
  });
};

// Mapping dei gusti disponibili per prodotto
export const PRODUCT_FLAVORS_MAP: Record<string, Array<{ name: string; available: boolean }>> = {
  // Batch 3 - Prodotti con varianti gusto
  "norincol-marine-collagen": [
    { name: "Limone", available: true },
    { name: "Arancia", available: true }
  ],
  "sali-activator-1-0-8": [
    { name: "Arancia Rossa", available: true },
    { name: "Fragola Banana", available: true }
  ],

  // Nuovi prodotti inseriti
  "premier-pancake": [
    { name: "Natural", available: true }
  ],
  // Prodotti rimanenti nel database con i loro gusti
  "burn-out": [
    { name: "Lampone", available: true },
    { name: "Limone", available: true }
  ],
  "barrettone-2-0": [
    { name: "Cacao", available: true },
    { name: "Vaniglia", available: true },
    { name: "Burro d'Arachidi", available: true }
  ],
  "big-bar": [
    { name: "Cocco", available: true },
    { name: "Cookie Nocciola", available: true }
  ],
  "carbo-energy-plus": [
    { name: "Albicocca", available: true },
    { name: "Frutti di Bosco", available: true },
    { name: "Agrumi", available: true },
    { name: "Mela Verde", available: true }
  ],
  "fruitforce": [
    { name: "Fragola", available: true },
    { name: "Ananas", available: true }
  ],
  "grissini-proteici": [
    { name: "Arachidi e Mandorle", available: true }
  ],
  "iso-soya": [
    { name: "Naturale", available: true }
  ],
  "light-protein-plus-bar": [
    { name: "Cheesecake", available: true },
    { name: "Caramello", available: true }
  ],
  "protein-evo-cocco": [
    { name: "Cocco", available: true }
  ],
  "protein-evo-creme-caramel": [
    { name: "Crème Caramel", available: true }
  ],
  "whey-protein-80": [
    { name: "Cacao", available: true },
    { name: "Nocciola", available: true },
    { name: "Banana", available: true },
    { name: "Fragola", available: true },
    { name: "Cappuccino", available: true },
    { name: "Cocco", available: true },
    { name: "Vaniglia", available: true }
  ],
  "whey-protein-90": [
    { name: "Banana", available: true },
    { name: "Cacao", available: true },
    { name: "Crema Nocciola", available: true },
    { name: "Fior di Latte", available: true },
    { name: "Fragola", available: true },
    { name: "Naturale", available: true },
    { name: "Vaniglia", available: true }
  ],
  "wheyghty-protein-80-standard": [
    { name: "Banana", available: true },
    { name: "Cacao", available: true },
    { name: "Cappuccino", available: true },
    { name: "Cocco", available: true },
    { name: "Nocciola", available: true },
    { name: "Fragola", available: true }
  ],
  "wheyghty-protein-80-limited-edition": [
    { name: "Cacao & Menta", available: true }
  ],
  "top-eggxellent-protein": [
    { name: "Crema Pasticciera", available: true },
    { name: "Crema Zabaione", available: true },
    { name: "Cacao", available: true }
  ],
  "xxx-hydrolysed-protein-90": [
    { name: "Mokka", available: true },
    { name: "Cacao", available: true },
    { name: "Nocciola", available: true }
  ],
  "milk-protein-90-micellar-casein": [
    { name: "Banana", available: true },
    { name: "Cacao", available: true }
  ],

  // Prodotti Creatina - senza gusto specifico
  "creatina-compresse-extra-gold": [
    { name: "Senza Aroma", available: true }
  ],
  "creatina-compresse-extra-gold-plus-watt": [
    { name: "Senza Aroma", available: true }
  ],
  "creatina-polvere-gold-plus-watt": [
    { name: "Senza Aroma", available: true }
  ],
  "creanized-advance-care": [
    { name: "Senza Aroma", available: true }
  ],

  // Sali Activator - due gusti disponibili
  "sali-activator-plus-watt-arancia": [
    { name: "Arancia Rossa", available: true },
    { name: "Fragola e Banana", available: true }
  ],
  "sali-activator-plus-watt-fragola": [
    { name: "Fragola e Banana", available: true },
    { name: "Arancia Rossa", available: true }
  ],

  // Sali Electrolyte - due gusti disponibili
  "sali-electrolyte-plus-watt-arancia": [
    { name: "Arancia", available: true },
    { name: "Limone", available: true }
  ],
  "sali-electrolyte-plus-watt-limone": [
    { name: "Limone", available: true },
    { name: "Arancia", available: true }
  ],

  // Sali Performance Electrolyte - due gusti disponibili
  "sali-performance-electrolyte-plus-watt-arancia": [
    { name: "Arancia", available: true },
    { name: "Limone", available: true }
  ],
  "sali-performance-electrolyte-plus-watt-limone": [
    { name: "Limone", available: true },
    { name: "Arancia", available: true }
  ],

  // Sali Pocket - gusto singolo
  "sali-electrolyte-pocket-minerals-plus-watt": [
    { name: "Limone", available: true }
  ],

  // R.M.1 BCAA - gusto singolo
  "rm1-bcaa-recovery-mix-plus-watt": [
    { name: "Arancia", available: true }
  ],

  // Mass Gainer esistenti - confermati
  "avena-plus-watt-cappuccino": [
    { name: "Cappuccino", available: true }
  ],
  "avena-plus-watt-cacao": [
    { name: "Cacao", available: true }
  ],
  "avena-plus-watt-nocciola": [
    { name: "Nocciola", available: true }
  ],
  "mass-formula-mct-gainer-cacao": [
    { name: "Cacao", available: true }
  ],
  "mass-formula-mct-gainer-nocciola": [
    { name: "Nocciola", available: true }
  ],

  // Prodotti PREMIER - Amminoacidi
  "glutamine-pure-100-premier": [
    { name: "Senza Aroma", available: true }
  ],
  "arginine-no-premier": [
    { name: "Senza Aroma", available: true }
  ],
  "alaform-800-premier": [
    { name: "Senza Aroma", available: true }
  ],
  "high-bcaa-premier": [
    { name: "Senza Aroma", available: true }
  ],
  "intra-pro-essential-premier": [
    { name: "Senza Aroma", available: true }
  ],

  // Prodotti PREMIER - Proteine
  "vegan-soy-ea-90-premier": [
    { name: "Gusto Cioccolato", available: true }
  ],
  "protein-cream-premier": [
    { name: "Gianduia", available: true },
    { name: "Cacao", available: true }
  ],
  "premier-pancake-premier": [
    { name: "Naturale", available: true }
  ],
  "iso-soya-premier": [
    { name: "Naturale", available: true }
  ],

  // Prodotti PREMIER - Vitamine e Minerali
  "hard-zma-xp-premier": [
    { name: "Senza Aroma", available: true }
  ],
  "vital-energy-premier": [
    { name: "Senza Aroma", available: true }
  ],
  "omega-3-xc-premier": [
    { name: "Senza Aroma", available: true }
  ],
  "melatonine-plus-premier": [
    { name: "Senza Aroma", available: true }
  ],
  "hard-c-life-plus-1000-premier": [
    { name: "Senza Aroma", available: true }
  ],
  "joint-flex-premier": [
    { name: "Senza Aroma", available: true }
  ],

  // Prodotti PREMIER - Mass Gainer
  "massive-gain-xxl-premier": [
    { name: "Cioccolato Bianco", available: true }
  ],
  "maltodex-premier": [
    { name: "Naturale", available: true }
  ],

  // Prodotti PREMIER - Pre-workout
  "hard-start-xplode-premier": [
    { name: "Senza Aroma", available: true }
  ],

  // Prodotti VOLCHEM - Mirabol Whey Protein 94% (solo gusti, formati gestiti separatamente)
  "mirabol-whey-protein-94-volchem": [
    { name: "Vanilla", available: true },
    { name: "Banana", available: true },
    { name: "Chocolate", available: true },
    { name: "Coffee", available: true },
    { name: "Strawberry", available: true },
    { name: "Double Chocolate", available: true },
    { name: "Bacio", available: true }
  ],

  // Prodotti VOLCHEM - Aminotool EAA (solo gusti, formato fisso 252g)
  "aminotool-eaa-volchem": [
    { name: "Orange", available: true },
    { name: "Lemon-Lime", available: true }
  ],
  // Aminoacidi
  "alanina-vegana": [
    { name: "Neutro", available: true }
  ],

  // Vitamine e Minerali
  "sali-activator-plus-watt": [
    { name: "Arancia Rossa", available: true },
    { name: "Fragola e Banana", available: true }
  ],
  "sali-electrolyte-plus-watt": [
    { name: "Arancia", available: true },
    { name: "Limone", available: true }
  ],
  "sali-performance-electrolyte-plus-watt": [
    { name: "Limone", available: true }
  ],


  // Prodotti Jamieson - Vitamine e Minerali
  "selenio-100-jamieson": [
    { name: "Naturale", available: true }
  ],
  "calcio-citrato-d3-jamieson": [
    { name: "Naturale", available: true }
  ],
  "licopene-jamieson": [
    { name: "Naturale", available: true }
  ],
  "vita-vim-multivitaminico-jamieson": [
    { name: "Naturale", available: true }
  ],
  "lutein-z-jamieson": [
    { name: "Naturale", available: true }
  ],
  "spirulina-jamieson": [
    { name: "Naturale", available: true }
  ],
  "olio-di-lino-jamieson": [
    { name: "Naturale", available: true }
  ],
  "omega-3-select-mini-jamieson": [
    { name: "Naturale", available: true }
  ],
  "omega-complete-krill-jamieson": [
    { name: "Naturale", available: true }
  ],
  "omega-3-extra-jamieson": [
    { name: "Naturale", available: true }
  ],
  "vitamina-c-masticabile-jamieson": [
    { name: "Frutti Misti", available: true }
  ],
  "vitamina-k2-d3-jamieson": [
    { name: "Naturale", available: true }
  ],
  "magnesio-tripla-azione-jamieson": [
    { name: "Naturale", available: true }
  ],
  "calcio-650-why-sport": [
    { name: "Naturale", available: true }
  ],
  "ashwagandha-jamieson": [
    { name: "Naturale", available: true }
  ],
  "korean-red-ginseng": [
    { name: "Naturale", available: true }
  ],
  "echinacea-purpurea": [
    { name: "Naturale", available: true }
  ],

  // === BARRETTE ENERGETICHE - GUSTI ===
  "promeal-protein-snack-38": [
    { name: "Vaniglia", available: true },
    { name: "Cioccolato", available: true }
  ],
  "protein-cream": [
    { name: "Cacao", available: true },
    { name: "Gianduia", available: true }
  ],
  "veggie-ciok": [
    { name: "Albicocca", available: true },
    { name: "Arancia", available: true },
    { name: "Cacao", available: true }
  ],
  "perfect-bar-50": [
    { name: "Cioccolato e Latte", available: true }
  ],
  "energy-fuel": [
    { name: "Caramello Salato", available: true }
  ],
  "crema-di-arachidi-peanut-butter": [
    { name: "Crunchy", available: true },
    { name: "Smooth", available: true }
  ],
  "wafer-zero": [
    { name: "Cacao e Cioccolato Bianco", available: true }
  ],

  // === NUOVI 8 PRODOTTI BARRETTE ENERGETICHE - GUSTI ===
  "pancake-proteico-why-sport": [
    { name: "Originale", available: true }
  ],
  "45-protein-bar": [
    { name: "Wafer Nocciola", available: true },
    { name: "Cookies Crisp", available: true }
  ],
  "75-protein-bar": [
    { name: "Frutti di Bosco", available: true }
  ],
  "crema-di-arachidi-iperproteica": [
    { name: "Crunchy", available: true }
  ],
  "energyfuel-noci-nocciole": [
    { name: "Noci-Nocciole", available: true }
  ],
  "perfect-cream": [
    { name: "Nocciola", available: true },
    { name: "Pistacchio", available: true },
    { name: "Yogurt Frutti di Bosco", available: true }
  ],
  "liquid-carbo-plus": [
    { name: "Arancia", available: true }
  ],
  "nocciola-crema-proteica": [
    { name: "Nocciola", available: true }
  ],

  // === NUOVI 9 PRODOTTI - GUSTI ===
  "energize-advanced": [
    { name: "Raspberry", available: true }
  ],
  "powergel": [
    { name: "Mela", available: true },
    { name: "Mango", available: true }
  ],
  "high-protein-shake": [
    { name: "Smooth Chocolate", available: true }
  ],
  "burro-di-arachidi-croccante": [
    { name: "Croccante", available: true }
  ],
  "avena-farina-istantanea": [
    { name: "Cappuccino", available: true },
    { name: "Cacao", available: true }
  ],
  "oatmeal-pro": [
    { name: "Biscotto", available: true }
  ],
  "pistacchio-crema-proteica": [
    { name: "Pistacchio", available: true }
  ],
  "promeal-energetica": [
    { name: "Mandorle", available: true }
  ],
  "promeal-50-protein-bar": [
    { name: "Yogurt", available: true },
    { name: "Cocco", available: true }
  ]
};

/**
 * Funzione per ottenere i gusti disponibili di un prodotto
 * @param productSlug - slug del prodotto
 * @returns array dei gusti disponibili
 */
export const getProductFlavors = (productSlug: string): Array<{name: string, available: boolean}> => {
  return PRODUCT_FLAVORS_MAP[productSlug] || [{ name: "Naturale", available: true }];
};