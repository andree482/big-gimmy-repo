// Sistema universale di gestione immagini prodotti
export interface ProductImageMapping {
  [slug: string]: string;
}

// Mapping delle immagini dei prodotti
export const PRODUCT_IMAGE_MAP: Record<string, string> = {
  // Prodotti WHY Sport Proteine - WPC 100% e PERFECT 100% WHEY
  "wpc-100": "WHEY PROTEIN 90 Banana_Fronte.jpg",
  "perfect-100-whey": "perfect-100-whey-pesca-450g.png",
  "essential-100-whey": "essential-100-whey-cacao.png",
  "perfect-blend-90": "perfect-blend-90-cacao-750g.png",
  "top-100-xp-cacao": "top-100-xp-cacao.jpg",
  "vegetal-100-protein": "vegetal-100-protein.png",
  "hydrolyzed-104-dh4":
    "W434_hydrolyzed-104-dh4-black-chocolate-900-g_singolo_1752072221354.png",
  "hydrolyzed-104-dh4-cioccolato": "hydrolyzed-104-dh4-cioccolato.png",
  "hydrolyzed-104-dh4-black-chocolate":
    "hydrolyzed-104-dh4-black-chocolate.png",
  "hydrolyzed-104-dh4-fragola-banana": "hydrolyzed-104-dh4-fragola-banana.png",
  "hydrolyzed-104-dh4-wafer-nocciola": "hydrolyzed-104-dh4-wafer-nocciola.png",
  "hydrolyzed-104-dh4-vaniglia": "hydrolyzed-104-dh4-vaniglia.png",
  "hydrolyzed-104-dh4-cookie-cream": "hydrolyzed-104-dh4-cookie-cream.png",

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

  // Prodotti EthicSport
  "super-dextrin": "super-dextrin-sweet.jpg",
  "super-dextrin-sweet": "super-dextrin-sweet.jpg",
  "super-dextrin-tasty": "super-dextrin-tasty.jpg",
  testogen: "testogen.png",
  "fluid-motion": "fluid-motion.png",
  "collagene-ethicsport": "collagene-ethicsport.png",
  "collagene-marino": "collagene-marino.png",
  "vitamina-c-1000-ethicsport": "vitamina-c-1000.png",
  "vitamina-d3-2000-iu": "vitamina-d3-2000-iu.png",
  "super-dextrin-pro": "super-dextrin-pro.png",
  "glucosamina-condroitina-msm-vitamina-c":
    "glucosamina-+-condroitina-+-msm-+-vitamina-c.png",
  "starter-1000": "starter-1000.jpg",
  "caffeina-suprema": "caffeina-suprema.png",
  "super-dextrin-gel-pro": "super-dextrin-gel-pro.png",
  repoxan: "repoxan.jpg",
  "creatina-vector": "creatina-vector.jpg",
  "eaa-amminoacidi-essenziali-solubili":
    "eaa-amminoacidi-essenziali-solubili.png",
  "comfort-plus": "comfort-plus.jpg",
  "maltoshot-endurance-plus": "maltoshot-endurance-plus.png",
  "vpr-vegetal-protein-integratore-alimentare-di-proteine-vegetali":
    "vpr-vegetal-protein-integratore-alimentare-di-proteine-vegetali.png",
  "magnesium-glycinate": "magnesium-glycinate.png",
  "thermo-master": "thermo-master.png",

  // ===== BATCH 9 - PRODOTTI COMPLETI CON SLUG CORRETTI =====
  // Total Energy Arancia 300g
  "total-energy-arancia-300g": "TOTAL-ENERGY-SITO.png",

  // Hard Start X-Plode Arancia 300g
  "hard-staart-x-plode-arancia-300g": "HARD-START-XPLODE-SITO-1.png",

  // Glutamine Pure 1000 - 150 e 300 compresse
  "glutamine-pure-1000-150-compresse": "GLUTAMINE-PURE-1000-SITO.png",
  "glutamine-pure-1000-300-compresse": "GLUTAMINE-PURE-1000-SITO.png",

  // High Pro Release - tutti i gusti 1kg
  "high-pro-release-caffè-latte-1kg": "HIGH-PRO-RELEASE-SITO.png",
  "high-pro-release-crema-cioccolato-1kg": "HIGH-PRO-RELEASE-SITO.png",
  "high-pro-release-crema-vaniglia-1kg": "HIGH-PRO-RELEASE-SITO.png",

  // Glutamine Pure 100% - 200g e 400g
  "glutamine-pure-100-200g": "GLUTAMINE-PURE-100-SITO.png",
  "glutamine-pure-100-400g": "GLUTAMINE-PURE-100-SITO.png",

  // Maltodex Pure 100% 1,1kg
  "maltodex-pure-100-1-1kg": "MALTODEX-SITO.png",

  // Ramtech BCAA 2:1:1 120 capsule
  "ramtech-bcaa-2-1-1-120-capsule": "ramtech-bcaa.png",

  // OMNIA Active Formula 45 capsule
  "omnia-active-formula-45-capsule": "omina-active-formula.png",

  // Super Hydro Tabs - Limone e Arancio 20 compresse
  "super-hydro-plus-limone-20-compresse": "super-hydro-tabs-limone.png",
  "super-hydro-plus-arancio-20-compresse": "super-hydro-tabs-arancio.png",

  // Pre Gara Endurance 20 buste
  "pre-gara-endurance-20-buste": "pre-gara-endurance.png",

  // Merchandising EthicSport
  "borraccia-ethicsport-600ml": "borraccia-600.jpeg",
  "borraccia-ethicsport-800ml": "borraccia-600.jpeg",
  "sacca-taglia-unica": "sacca.jpeg",
  "t-shirt-ethcisport-limited-edition-s": "magliette-ethicsport.png",
  "t-shirt-ethcisport-limited-edition-m": "magliette-ethicsport.png",
  "t-shirt-ethcisport-limited-edition-l": "magliette-ethicsport.png",
  "t-shirt-ethcisport-limited-edition-xl": "magliette-ethicsport.png",
  "capppellino-ethicsport-taglia-unica": "cappellino.jpeg",

  // ===== PRODOTTI AGGIUNTIVI NON BATCH 9 =====
  // Amino Pool BV104 - Premier
  "amino-pool-bv104-250-compresse": "POO-250.png",
  "amino-pool-bv104-500-compresse": "POO-250.png",

  // Complex Carbs Advanced Ratio 1:0.8 - Nuova immagine corretta
  "complex-carbs-advanced-ratio": "complex-carb_1758971067923.webp",

  // Isowhey Pro-Zyme Premier - tutte le varianti
  "isowhey-pro-zyme-premier-vaniglia-450g": "ISOWHEY-WEB-PREMIER.png",
  "isowhey-pro-zyme-premier-vaniglia-900g": "ISOWHEY-WEB-PREMIER.png",
  "isowhey-pro-zyme-premier-vaniglia-2kg": "ISOWHEY-WEB-PREMIER.png",
  "isowhey-pro-zyme-premier-cioccolato-450g": "ISOWHEY-WEB-PREMIER.png",
  "isowhey-pro-zyme-premier-cioccolato-900g": "ISOWHEY-WEB-PREMIER.png",
  "isowhey-pro-zyme-premier-cioccolato-2kg": "ISOWHEY-WEB-PREMIER.png",
  "isowhey-pro-zyme-premier-cioccolato-bianco-450g": "ISOWHEY-WEB-PREMIER.png",
  "isowhey-pro-zyme-premier-cioccolato-bianco-900g": "ISOWHEY-WEB-PREMIER.png",
  "isowhey-pro-zyme-premier-cioccolato-bianco-2kg": "ISOWHEY-WEB-PREMIER.png",
  "isowhey-pro-zyme-premier-crema-caffè-450g": "ISOWHEY-WEB-PREMIER.png",
  "isowhey-pro-zyme-premier-crema-caffè-900g": "ISOWHEY-WEB-PREMIER.png",
  "isowhey-pro-zyme-premier-crema-caffè-2kg": "ISOWHEY-WEB-PREMIER.png",
  "isowhey-pro-zyme-premier-frutti-di-bosco-450g": "ISOWHEY-WEB-PREMIER.png",
  "isowhey-pro-zyme-premier-frutti-di-bosco-900g": "ISOWHEY-WEB-PREMIER.png",
  "isowhey-pro-zyme-premier-frutti-di-bosco-2kg": "ISOWHEY-WEB-PREMIER.png",

  // Prodotti PRE-WORKOUT
  "adrenaline-agrumi-pre-workout": "W063_singolo_1750778570187.png",

  // Prodotti ENERGETICI
  "liquid-carbo-flash-80":
    "Liquid Carbo+ FLASH80 Frutti di bosco FRONTE_1750780343039.jpg",

  "premier-pancake": "Pancake-300x411_1750183591622.png",
  "premier-pancake-natural-900g": "Pancake-300x411_1750183591622.png",
  // Rimosse entry duplicate di pistacchio-crema-proteica (ora definite nella sezione prodotti recenti)
  "pistacchio-crema-proteica-250g": "Pistacchio 250 g FRONTE_1750183611177.jpg",
  // Prodotti VOLCHEM - Mirabol Whey Protein 94%
  "mirabol-whey-protein-94-volchem":
    "Mirabol Whey Protein 94 vanilla 750g web.jpg",
  "mirabol-whey-94-vanilla-750g":
    "Mirabol Whey Protein 94 vanilla 750g web.jpg",
  "mirabol-whey-94-banana-750g": "Mirabol Whey 750g Banana web.jpg",
  "mirabol-whey-94-chocolate-750g":
    "Mirabol Whey Protein 94 chocolate 750g web.jpg",
  "mirabol-whey-94-coffee-750g": "Mirabol Whey 750g coffee web.jpg",
  "mirabol-whey-94-strawberry-750g":
    "Mirabol Whey Protein 94 strawberry 750g web.jpg",
  "mirabol-whey-94-double-chocolate-750g":
    "Mirabol Whey Protein 94 double chocolate 750g web.jpg",
  "mirabol-whey-94-bacio-750g": "Mirabol Whey Natural Bacio Web.jpg",
  "mirabol-whey-94-banana-500g": "Mirabol Whey Protein 94 banana 500g web.jpg",
  "mirabol-whey-94-strawberry-500g":
    "Mirabol Whey Protein 94 strawberry 500g web.jpg",
  "mirabol-whey-94-coffee-500g": "Mirabol Whey Protein 94 cooffe 500g web.jpg",

  // Prodotti VOLCHEM - Altri aminoacidi (aminotool-eaa eliminato)

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
  "protein-wafer-low-sugar-vaniglia":
    "PROTEIN WAFER LOW SUGAR_Vaniglia_Fronte.jpg",
  "protein-evo-cocco": "Protein+ EVO cocco FRONTE.jpg",
  "protein-evo-creme-caramel": "Protein+ EVO crème caramel FRONTE.jpg",

  // Prodotti +WATT - Proteine speciali
  "top-eggxellent-protein":
    "TOP EGGXELLENT PROTEIN_CACAO_Fronte_1749996078038.jpg",
  "xxx-hydrolysed-protein-90":
    "XXX HYDROLYSED 750 g Cacao Fronte_1749996348004.jpg",
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
  "vegan-isopea-90": "vegan-isopea-90-cioccolato-700g.png",
  "say-protein-221": "say-protein-221-cacao-750g.jpg",
  "smart-protein-cacao": "smart-protein-cacao-320ml.jpg",
  "perfect-mass": "perfect-mass-cacao-biscuit-1600g.png",

  // Nuovi prodotti aminoacidi - 12 prodotti (IMMAGINI CORRETTE)
  "aminoacidi-plus": "AMINOACIDI Arancia_Fronte_1750948719180.jpg",
  "aminoacidi-essenziali-plus-polvere":
    "AMINOACIDI ESSENZIALI POLVERE_cola_Fronte_1750948719181.jpg",
  "aminotool-eaa": "Aminotool EAA 252g lemon-lime web_1750948719182.jpg",
  argin: "Argin 300 cpr web_1750948719184.jpg",
  "arginina-plus-complex-capsule":
    "ARGININA COMPLEX CAPSULE_Fronte_1750948719185.jpg",
  "bcaa-plus-8-1-1": "bcaa-811-polvere-arancia-100-g-44fa (copy).webp",
  glutamass: "Glutamass glutamina 300cpr web_1750948719190.jpg",
  norincol: "Norincol 80 cpr web_1750948719192.jpg",

  // NUOVI 6 PRODOTTI AMINOACIDI - immagini copertina (utilizzate dai gruppi esistenti)
  "volamin-bcaa": "Volamin 300 cpr web_1750951382270.jpg",
  "volamin-powder": "Volamin Powder 224g orange_1750951382271.jpg",
  "bcaa-1000-b6": "W001_singolo_1750951382273.png",
  "bcaa-supreme-4-1-1": "W176_singolo_1750951382276.png",

  // Prodotti +WATT - Creatina
  "creatina-extra-gold-100g": "CREATINA_Extra Gold_100g_Fronte.jpg",
  "creatina-compresse-extra-gold": "CREATINA Compresse Extra Gold_Fronte.jpg",
  "creatina-polvere-gold": "CREATINA POLVERE GOLD_FRONTE.jpg",
  "creatina-polvere-350g": "Creatina+ polvere extragold 350 FRONTE.jpg",
  "creanized-creatina": "CREANIZED_CRETINA_MONOIDRATO_Fronte.jpg",

  // NUOVI PRODOTTI CREATINA - 7 prodotti categoria Creatina
  "creanized-creatina-monoidrato":
    "CREANIZED_CRETINA_MONOIDRATO_Fronte_1751037655150.jpg",
  "creatina-extra-gold": "creatina-extragold-100-g-1786.webp",
  creatyl: "Creatyl creatina 120 cpr web_1751037744104.jpg",
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

  // BATCH 7 - DIMAGRANTI - 10 nuovi prodotti inseriti 28/08/2025
  "stack-fire-boost": "stack-fire-boost-30b7-500x500.webp",
  "weight-control-new-formula": "weight-control-new-formula-9f17-500x500.webp",
  "dima-therm": "dima-therm-1df4-500x912.webp",
  "kal-redux-+": "kal-redux-1.png",
  "hard-stack-red-hot": "hard-stack-sito-1.png",
  "hard-acetyl-1000": "HARD-ACETYL-SITO.png",
  "alc-plus-1000": "W175_alc-plus-60-cpr_singolo.png",
  "cla-1000": "cla-1000.jpg", // Pronutrition
  "cla-1000-why-sport": "W398_CLA_1000cpr_singolo.png", // WHY Sport
  "lipoic-1000": "W429_lipoic-1000-60-cpr_singolo.png",
  "thermo-caffeine": "W299_thermo-caffeine-90-cpr_singolo.png",
  "thermo-no-caffeine": "W300_thermo-no-caffeine-90-cpr_singolo.png",

  // Prodotti +WATT - Mass Gainer
  "mass-formula-mct-gainer-cacao": "mass-formula-cacao.jpg",
  "mass-formula-mct-gainer-nocciola":
    "MASS FORMULA MCT GAINER_Nocciola_Fronte.jpg",
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
  collagene: "Collagene-Fronte.jpg",
  "comfort-vision": "Comfort-Vision-Fronte.jpg",
  bromelina: "Bromelina-Fronte.jpg",
  "antiradical-mix": "Antiradical-mix-60-capsule-FRONTE.jpg",
  enziplus: "ENZIPLUS CAPSULE fronte.jpg",
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

  // Prodotti +WATT - Vitamine e Minerali
  "vitamine-minerals-watt": "vitamins-minerals-watt.jpg",

  // Citrullina Malato - immagini specifiche per variante
  "citrullina-malato-175g-175g": "citrullina-malato-175g-limone.png", // variante 175g - nuova immagine
  "citrullina-malato-175g-90capsule":
    "integratore-citrullina-malato-90-cpr.jpg", // variante 90 capsule - nuova immagine

  // Prodotti principali rimanenti - mappatura esplicita
  "milk-protein-90-micellar-casein": "milk-protein-90-banana.png",
  "whey-protein-90": "WHEY PROTEIN 90 Vaniglia_Fronte.jpg",
  "whey-protein-80":
    "wheyghty-protein-80-250-g-cacao-bea8-500x500_1751552286392.webp",
  "wheyghty-protein-80": "WHEYGHTY PROTEIN 80 CACAO fronte.jpg",
  "wheyghty-protein-80-standard": "WHEYGHTY PROTEIN 80 CACAO fronte.jpg",
  "wheyghty-protein-80-limited-edition": "WHEYGHTY PROTEIN 80 CACAO fronte.jpg",

  // ============ BATCH 3 - PROLABS - 29 PRODOTTI ============
  // Prodotti singoli
  "daa-acido-d-aspartico": "daa-90cpr-200ml.jpg",
  "dextro-plus": "dextro-plus.jpg",
  "eaa-tabs": "eaa-tabs.jpg",
  "eaa-tabs-500-compresse": "eaa-tabs-500-compresse.jpg",
  gaba: "gaba-internal.jpg",
  "gluta-max": "gluta-max.jpg",
  "gluta-pep": "gluta-pep.jpg",
  "hmb-1000-mg": "hmb-1000-mg.jpg",
  "k2-d3": "k2-d3-internal.jpg",
  "leucine-1000": "leucine-1000.jpg",
  melatonina: "melatonina.jpg",
  "pre-workout-energy": "pre-workout-energy.jpg",
  probiomax: "probiomax.jpg",
  "pro-flex": "pro-flex.jpg",
  "whey-104-extreme": "whey-104-extreme.jpg",

  // Prodotti con varianti - EGG Protein
  "egg-protein-crema-vaniglia": "egg-protein-crema-vaniglia.jpg",
  "egg-protein-cioccolato": "egg-protein-cioccolato.jpg",

  // Prodotti con varianti - Fish Oil
  "fish-oil-90-softgel": "fish-oil-90-softgel.jpg",
  "fish-oil-200-softgel": "fish-oil-200-softgel.jpg",

  // Prodotti con varianti - Glutamine Pure
  "glutamina-pure-250g": "glutamina-pure-250g.jpg",
  "glutamina-pure-500g": "glutamina-pure-500g.jpg",
  "glutamina-pure-1kg": "glutamina-pure-1kg.jpg",

  // Prodotti con varianti - Mass Matrix
  "mass-matrix-cioccolato": "mass-matrix-cioccolato.jpg",
  "mass-matrix-vaniglia": "mass-matrix-vaniglia.jpg",
  "mass-matrix-fragola": "mass-matrix-fragola.jpg",
  "mass-matrix-banana": "mass-matrix-banana.jpg",

  // Prodotti con varianti - Multi Mineral
  "multi-mineral-120-compresse": "multi-mineral-120-compresse.jpg",
  "multi-mineral-240-compresse": "multi-mineral-240-compresse.jpg",

  // Prodotti con varianti - Vitamine & Mineral Complex
  "vitamine-mineral-complex-60-compresse":
    "vitamine-mineral-complex-60-compresse.jpg",
  "vitamine-mineral-complex-120-compresse":
    "vitamine-mineral-complex-120-compresse.jpg",

  // PRODOTTI PROLABS - BATCH 2 - 20 prodotti (immagini autentiche dal zip)
  "acetil-l-carnitina-200-mg": "acetil-l-carnitina-200-mg.jpg",
  "akg-arginina-alfa-chetoglutarato": "akg-arginina-alfa-chetoglutarato.jpg",
  "akg-pure": "akg-pure.jpg",
  "ala-600-acido-alfa-lipoico": "ala-600-(acido-alfa-lipoico).jpg",
  "alc-tabs-1000-mg": "alc-tabs-1000-mg.jpg",
  "amino-essential-arancia": "amino-essential-arancia.jpg",
  "amino-essential-limone": "amino-essential-limone.jpg",
  "arginine-pure-prolabs-polvere": "arginine-pure-polvere.jpg",
  "arginine-pure-prolabs-compresse": "arginine-pure-compresse.jpg",
  "bcaa-2-1-1-powder-arancia": "bcaa-2-1-1-powder-arancia.jpg",
  "bcaa-2-1-1-powder-tropicale": "bcaa-2-1-1-powder-tropicale.jpg",
  "bcaa-4-1-1-150-compresse": "bcaa-4-1-1-150-compresse.jpg",
  "bcaa-4-1-1-400-compresse": "bcaa-4-1-1-400-compresse.jpg",
  "bcaa-8-1-1-150-compresse": "bcaa-8-1-1-150-compresse.jpg",
  "bcaa-8-1-1-400-compresse": "bcaa-8-1-1-400-compresse.jpg",
  "bcaa-8-1-1-powder-arancia": "bcaa-8-1-1-powder-arancia.jpg",
  "bcaa-8-1-1-powder-limone": "bcaa-8-1-1-powder-limone.jpg",
  "beta-alanine": "beta-alanine.jpg",
  "beta-alanine-polvere": "beta-alanine-polvere.jpg",
  "carb-up": "carb-up.jpg",
  "carnitina-prolabs": "carnitina.jpg",
  "citrulline-prolabs": "citrulline-1000.jpg",

  "citrulline-pure-compresse": "citrulline-pure-200-compresse.jpg",
  "cla-plus": "cla-plus.jpg",
  "creatina-pure-polvere": "creatina-pure-polvere.jpg",
  "creatina-pure-compresse": "creatina-pure-210-compresse.jpg",

  // Prodotti con immagini autentiche corrette - 11 prodotti sistemati (refresh forzato)
  "d-glucosio": "d-glucosio.jpg",
  "eaa-pro": "aminoacidi-essenziali-420-g-anguria.png",
  "essential-amino-9-3": "essential-amino-9-3-finale.jpg",
  "essenziali-zero-carb": "essenziali-zero-carb-finale.jpg",
  "glutammina-pure": "glutammina-pure-finale.jpg",
  "glutammina-plus-polvere": "glutammina-plus-polvere-authentic.jpg",
  "hard-beta-alanine": "hard-beta-alanine.jpg",
  "high-bcaa-2-1-1": "high-bcaa-2-1-1.jpg",
  "pocket-carnitine": "pocket-carnitine.jpg",
  "rm1-bcaa-8-1-1-recovery-mix": "rm1-bcaa-8-1-1-recovery-mix.jpg",
  "crea-max": "crea-max.jpg",

  // Altri prodotti specifici
  "liquid-carbo-arancia": "LIQUID CARBO_Arancia_Fronte.jpg",
  "carbowart-pistacchio": "CARBOWART_Pistacchio_Fronte.jpg",
  "burn-out-lampone": "01-burn-out-lampone.jpg",
  "fruitforce-ananas": "FRUITFORCE-ANANAS-Fronte.jpg",
  "fruitforce-fragola": "12-fruitforce-fragola.jpg",
  fruitforce: "12-fruitforce-fragola.jpg",
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
  "45-protein-bar": "45-protein-bar-cookies-crisp.png", // Immagine copertina → Cookies Crisp WHY Sport (aggiornata)
  "45-protein-bar-cookies-crisp-45g":
    "W237_45_Protein_Bar_cookies_crisp_1751554724885.png",
  "45-protein-bar-cookies-crisp-24pz": "W237_box_1751554724885.png", // 2ª immagine → Cookies Crisp 24pz
  "oatmeal-pro-biscotto": "oatmeal-pro-biscotto.jpg",
  "veggie-ciok-albicocca": "Veggie-Ciok-40g-albicocca-FRONTE.jpg",
  "veggie-ciok-arancia": "Veggie-Ciok-40g-arancia-FRONTE.jpg",
  "veggie-ciok-cacao": "Veggie-Ciok-40g-cacao-FRONTE.jpg",
  "turboactive-arachidi": "TurboActive_Arachidi_Fronte.jpg",
  "turboactive-cacao": "TurboActive_Cacao_Fronte.jpg",
  "smart-protein-cacao-existing": "SMART PROTEIN_CACAO_Fronte.jpg",
  "say-protein-221-cacao-existing": "SAY PROTEIN 221 CACAO fronte.jpg",
  "say-protein-221-nocciola-existing": "SAY PROTEIN 221 NOCCIOLA fronte.jpg",

  // Prodotti Jamieson
  "vitamin-d-2000-iu": "Vitamin D 2000 IU 60 cpr_1750778570180.jpg",
  "vitamin-d-800-iu": "Vitamin D 800 IU 100 cpr web_1750778570179.jpg",

  // Prodotti +WATT
  "sali-performance-electrolyte":
    "SALI PERFORMANCE_Arancia_Fronte_1750778570175.jpg",
  "star-gel-plus": "star-gel-plus.jpg",
  triboost: "TRIBOOST_Fronte_1750778570178.jpg",
  "vitamina-c-1000": "VITAMINA C_Fronte_1750778570180.jpg",

  // Prodotti Premier
  "vital-energy": "VITAL-ENERGY-300x411_1750778570178.png",
  "vitamin-d3-2000-premier": "Vitamin-D3-2000-300x411 (1)_1750778570181.png",

  // Prodotti WHY Sport
  // "adrenaline-agrumi-pre-workout": "W063_singolo_1750778570187.png", // Moved to original position line 47
  "magnesio-potassio-sport": "magnesio-potassio-sport-updated.png",
  "drenante-why-sport": "WN122_singolo_1750778570190.png",
  "vitamina-b12-1000": "WN234_singolo_1750778607581.png",
  "refuel-recovery": "W172_box_1750778570187.png",
  "testo-xplode": "W297_singolo_1750778570188.png",
  "ps200-fosfatidilserina": "W386_singolo_1750778570189.png",

  // Prodotti Volchem

  // ============ PROVA PRODOTTI ProNutrition ============
  // Aminoacidi Essenziali
  "aminoacidi-essenziali": "aminoacidi-essenziali-300g-cola-lemon.png",

  // EAA Pro già mappato sopra nei prodotti ProLabs

  // Batch 3 - Nuovi 16 prodotti vitamine
  "fibra-watt": "FIBRA WATT_Fronte_1750780343032.jpg",
  "hard-b-life-complex":
    "HARD-B-LIFE-COMPLEX-SITO-300x411 (1)_1750780343035.png",
  "hard-c-life-plus-1000": "Hard-C-life-plus-1000 (1)_1750780343036.png",
  "hard-dren-1000": "HARD-DREN-SITO-300x411_1750780343036.png",
  "hard-vitamin-complex": "HARD-VITAMIN-SITO-300x411 (1)_1750780343037.png",
  "hepax-forte": "HEPAX-FORTE-300x411 (1)_1750780343037.png",
  "joint-flex-d3-plus": "JOINT-FLEX-sito-300x411_1750780343038.png",
  "megavis-1100mg-tablet":
    "Megavis 1100 l-carnitina 30 cpr web_1750780343039.jpg",
  "melatonine-plus": "melatonine-2-1-300x532 (1)_1750780343040.png",
  "norincol-marine-collagen":
    "Norincol Marine Collagen 300g lemon_1750780343041.jpg",
  "norincol-marine-collagen-limone":
    "Norincol Marine Collagen 300g lemon_1750780343041.jpg",
  "norincol-marine-collagen-arancia":
    "Norincol Marine Collagen 300g orange_1750780343041.jpg",
  "omega-3-egq": "Omega3 EGQ 180 perle FRONTE_1750780343042.jpg",
  "omega-3-xc-40-20-gold": "OMEGA3-XC-300x411_1750780343042.png",
  "sali-activator-1-0-8":
    "SALI ACTIVATOR ARANCIA ROSSA_Fronte_1750780343044.jpg",
  "sali-activator-1-0-8-arancia-rossa":
    "SALI ACTIVATOR ARANCIA ROSSA_Fronte_1750780343044.jpg",
  "sali-activator-1-0-8-fragola-banana":
    "SALI ACTIVATOR FRAGOLA E BANANA_Fronte_1750780343044.jpg",

  // ============ BATCH 4 - 12 NUOVI PRODOTTI VITAMINE ============
  // Basato su attached_assets/vitamine 13 prodotti ORD.4 (corretto)_1750781984146.md

  // Nuovi prodotti - 12 immagini dal quarto batch
  "ashwagandha-plus": "ashwagandha-2-1-300x548 (1)_1750781953158.png",
  "ashwagandha-pura-watt": "ASHWAGANDHA PURA_Fronte_1750781953157.jpg",

  "bcaa-liquid-carbo-plus": "BCAA LIQUID CARBO_FRONTE_1750781953159.jpg",

  "bcaa-ride-gel-plus":
    "BCAA RIDE GEL GUSTO TUTTI I FRUTTI_Fronte_1750781953160.jpg",
  "berberina-plus": "BERBERINA 60 CAPSULE_FRONTE_1750781953161.jpg",
  "calcium-volchem": "Calcium calcio 30 cpr WEB_1750781953161.jpg",
  "collagene-silicio-stabilizzato": "Collagene_Fronte_1750781953162.jpg",

  // Sali+ Electrolyte - consolidato in un singolo prodotto con varianti
  "sali-electrolyte-pocket-minerals":
    "sali-electrolyte-pocket-minerals-arancia-singola-bustina-43f4_1755611277271.webp",
  "sali-electrolyte-pocket-minerals-arancia":
    "ELECTROLYTE_Arancia_Fronte_1750781953163.jpg",
  "sali-electrolyte-pocket-minerals-limone":
    "ELECTROLYTE_Limone_Fronte_1750781953163.jpg",

  // ============ BATCH 5 - PRONUTRITION - 20 PRODOTTI ============
  // Single variant products
  "arginina-piroglutammato-e-lisina":
    "integratore-per-aumentare-fabbisogno-di-aminoacidi-arginina-70-cps.jpg",
  "beta-alanina-1000-mg": "beta-alanina-1000-mg-120-cpr.jpg",
  "creatina-krealkalyn": "creatina-krealkalyn-120-cpr.jpg",
  "creatina-transport-1000": "creatina-transport-1000-200-cps.jpg",
  "glutammina-glutpower": "glutammina-glutpower-100-cpr.jpg",
  "ghanabol-active-9": "ghanabol-active-9-90-cpr.jpg",
  "hmb-3000": "hmb-3000-90-cpr.jpg",

  // ============ BATCH 6 - PRONUTRITION - 20 PRODOTTI ============
  // Single variant products
  "astaxantina-plus": "astaxantina-8-mg-60-cpr.png",
  "caffè-verde-te-matcha-800mg": "caffè-verde-piu-tè-verde-60-cpr-800mg.png",
  "co-q10-forte-1000mg":
    "integratore-coenzima-q10-co-q10-forte-100mg-90cpr.png",
  "depurixia-antiossidante":
    "integratori-per-depurare-l-organismo-depurixia-60-cp.jpg",
  "glutatione-liposomiale": "integratore-glutatione-liposomiale-cp.png",
  "i-m-collagen": "im-collagen-325-g-fiordilatte.jpg",
  "lipoic-800-crom":
    "integratore-a-base-di-acido-alfa-lipoico-lipoic-800-cromo-cannella-60-cpr.jpg",
  "lipoic-b": "integratore-a-base-di-acido-lipoico-lipoic-b-90-cpr.jpg",
  "maxivit-sport": "maxivit-sport-60-cpr.png",
  minerals: "minerals-60-capsule.png",
  "omega-3-6-9": "omega-3-6-9-60-softgel.png",
  "probio-plus": "probio-plus-30-capsule.png",
  "red-booster": "red-booster-60-capsule.png",
  "ultra-vit": "ultra-vit-60-compresse.png",
  "vegan-protein": "vegan-protein-500g.png",
  "vitamina-b-complex": "vitamina-b-complex-60-compresse.png",

  // Grouped variant products
  "collagene-marino-acido-ialauronico-20-buste":
    "collagene-marino-acido-ialuronico-20bst.png",
  "collagene-marino-acido-ialauronico-160gr":
    "integratore-a-base-di-collagene-marino-acido-ialuronico-160g.png",
  "collagene-marino-acido-ialauronico":
    "collagene-marino-acido-ialuronico-20bst.png",
  "omega-3-super-60-perle": "omega-3-super-60-perle.png",
  "omega-3-super-120-perle": "omega-3-super-120-perle.png",
  "omega-3-super": "omega-3-super-60-perle.png",
  "vitamina-d3-k2-30-compresse": "vitamina-d3-k2-30-compresse.png",
  "vitamina-d3-k2-60-compresse": "vitamina-d3-k2-60-compresse.png",
  "vitamina-d3-k2-120-compresse": "vitamina-d3-k2-120-compresse.png",
  "vitamina-d3-k2": "vitamina-d3-k2-60-compresse.png",
  "leucina-1000-mg": "leucina-1000-mg-120-cpr.jpg",
  lisina: "lisina-300gr.jpg",
  "ornitina-akg": "ornitina-akg-60-cpr.jpg",
  "ashwagandha-forte-500-mg": "ashwagandha-forte-500-mg-60-cpr.jpg",

  // BCAA 2:1:1 Proram variants (group_id 36)
  "bcaa-2-1-1-proram": "integratore-bcaa-per-sportivi-proram-100-cpr-1g.jpg", // Immagine copertina
  "bcaa-2-1-1-proram-100-capsule":
    "integratore-bcaa-per-sportivi-proram-100-cpr-1g.jpg",
  "bcaa-2-1-1-proram-200-capsule":
    "integratori-bcaa-per-sportivi-proram-200-cpr-1g.jpg",
  "bcaa-2-1-1-proram-400-capsule":
    "integratori-bcaa-per-sportivi-proram-400-cpr-1g.jpg",

  // BCAA 8:1:1 variants (group_id 37)
  "bcaa-8-1-1":
    "bcaa-sport-8-1-1-150-g-gusto-arancio-integratore-per-attività-fisica-intensa.jpg", // Immagine copertina
  "bcaa-8-1-1-150g-arancia":
    "bcaa-sport-8-1-1-150-g-gusto-arancio-integratore-per-attività-fisica-intensa.jpg",
  "bcaa-8-1-1-350g-arancia":
    "bcaa-sport-8-1-1-150-g-gusto-arancio-integratore-per-attività-fisica-intensa.jpg",

  // BCAA 8:1:1 Peptide variants (group_id 38)
  "bcaa-8-1-1-peptide": "bcaa-8-1-1-peptide-100-cpr.jpg", // Immagine copertina
  "bcaa-8-1-1-peptide-100-cpr": "bcaa-8-1-1-peptide-100-cpr.jpg",
  "bcaa-8-1-1-peptide-200-cpr": "bcaa-8-1-1-peptide-200-cpr.jpg",

  // BCAA Sport 4:1:1 variants (group_id 39)
  "bcaa-sport-4-1-1": "bcaa-sport-4-1-1-150g-limone.jpg", // Immagine copertina
  "bcaa-sport-4-1-1-150g-limone": "bcaa-sport-4-1-1-150g-limone.jpg",
  "bcaa-sport-4-1-1-350g-limone": "bcaa-sport-4-1-1-350g-limone.jpg",

  // Citrullina Malato variants (group_id 40)
  "citrullina-malato": "citrullina-malato-175g-limone.png", // Immagine copertina aggiornata
  "citrullina-malato-175g": "citrullina-malato-175g-limone.png",
  "citrullina-malato-150g": "citrullina-malato-150g.jpg",
  "citrullina-malato-350g": "citrullina-malato-350g.jpg",

  // Creatina Micronizzata 100% variants (group_id 41)
  "creatina-micronizzata-100": "creatina-micronizzata-100-150g.jpg", // Immagine copertina
  "creatina-micronizzata-100-150g": "creatina-micronizzata-100-150g.jpg",
  "creatina-micronizzata-100-350g": "creatina-micronizzata-100-350g.jpg",

  // Creatina Tabs Monoidrata variants (group_id 42)
  "creatina-tabs-monoidrata": "creatina-tabs-monoidrata-100-cpr.jpg", // Immagine copertina
  "creatina-tabs-monoidrata-100-compresse":
    "creatina-tabs-monoidrata-100-cpr.jpg",
  "creatina-tabs-monoidrata-200-compresse":
    "creatina-tabs-monoidrata-200-cpr.jpg",

  // Glutammina Sport Recovery variants (group_id 43)
  "glutammina-sport-recovery": "glutammina-sport-recovery-150g.jpg", // Immagine copertina
  "glutammina-sport-recovery-150g": "glutammina-sport-recovery-150g.jpg",
  "glutammina-sport-recovery-350g": "glutammina-sport-recovery-350g.jpg",
  "glutammina-sport-recovery-500g": "glutammina-sport-recovery-500g.jpg",

  // Glutammina Peptide variants (group_id 44)
  "glutammina-peptide": "glutammina-peptide-corrected.jpg", // Immagine copertina aggiornata
  "glutammina-peptide-150g": "glutammina-peptide-150g.jpg",
  "glutammina-peptide-350g": "glutammina-peptide-350g.jpg",

  // === BARRETTE ENERGETICHE ===
  // Promeal Protein Snack 38% - Volchem
  "promeal-protein-snack-38":
    "Promeal Snacks bianco 150x250 web_1751034029688.jpg",

  // Protein Cream - Premier
  "protein-cream": "95079ee6-5454-441a-8659-f2945312edc5_1751034033069.png",

  // Veggie Ciok - +WATT
  "veggie-ciok": "Veggie Ciok  40 g albicocca FRONTE_1751034075963.jpg",

  // Perfect Bar 50% - WHY Sport
  "perfect-bar-50": "W262_PERFECT-BAR-BIANCOCIOK-BISCOTTO-CRISP.png",

  // Energy Fuel - WHY Sport
  "energy-fuel": "W468_singolo_1751034332990.png",

  // ============ BATCH 4 - PROLABS/PRONUTRITION - 20 PRODOTTI ============
  // Power Whey Amino Support (6 variants)
  "power-whey-amino-support": "power-why-amino-support-vaniglia.jpg",
  "power-whey-amino-support-vaniglia": "power-why-amino-support-vaniglia.jpg",
  "power-whey-amino-support-cioccolato":
    "power-why-amino-support-cioccolato.jpg",
  "power-whey-amino-support-cioccolato-cocco":
    "power-why-amino-support-cioccolato-cocco.jpg",
  "power-whey-amino-support-cookies-cream":
    "power-why-amino-support-cookies-cream.jpg",
  "power-whey-amino-support-fruttirossi-banana":
    "power-why-amino-support-fruttirossi-banana.jpg",
  "power-whey-amino-support-wafer-nocciola":
    "power-why-amino-support-wafer-nocciola.jpg",

  // Prime Casein (4 variants)
  "prime-casein": "prime-casein-cioccolato.jpg",
  "prime-casein-cioccolato": "prime-casein-cioccolato.jpg",
  "prime-casein-cioccolato-cocco": "prime-casein-cioccolato-cocco.jpg",
  "prime-casein-vaniglia": "prime-casein-vaniglia.jpg",
  "prime-casein-wafer-nocciola": "prime-casein-wafer-nocciola.jpg",

  // Prime Oat (4 variants)
  "prime-oat": "prime-oat-cioccolato.jpg",
  "prime-oat-cioccolato": "prime-oat-cioccolato.jpg",
  "prime-oat-biscotto": "prime-oat-biscotto.jpg",
  "prime-oat-cioccolato-cocco": "prime-oat-cioccolato-cocco.jpg",
  "prime-oat-wafer-nocciola": "prime-oat-wafer-nocciola.jpg",

  // Prime Whey Hydro Plus (3 variants)
  "prime-whey-hydro-plus": "prime-wehy-hydro-plus-cioccolato.jpg",
  "prime-whey-hydro-plus-cioccolato": "prime-wehy-hydro-plus-cioccolato.jpg",
  "prime-whey-hydro-plus-vaniglia": "prime-wehy-hydro-plus-vaniglia.jpg",
  "prime-whey-hydro-plus-cookies-cream":
    "prime-wehy-hydro-plus-cookies-cream.jpg",

  // Prime WPI (2 variants)
  "prime-wpi": "prime-wpi-cioccolato.jpg",
  "prime-wpi-cioccolato": "prime-wpi-cioccolato.jpg",
  "prime-wpi-vaniglia": "prime-wpi-vaniglia.jpg",

  // Pure Soy Isolate (2 variants)
  "pure-soy-isolate": "pure-soy-isolate-cioccolato.jpg",
  "pure-soy-isolate-cioccolato": "pure-soy-isolate-cioccolato.jpg",
  "pure-soy-isolate-wafer-nocciola": "pure-soy-isolate-wafer-nocciola.jpg",

  // Ram 1000 BCAA (4 variants + 4 size variants)
  "ram-1000-bcaa": "ram-1000-bcaa-100-compresse.jpg",
  "ram-1000-bcaa-100-compresse": "ram-1000-bcaa-100-compresse.jpg",
  "ram-1000-bcaa-180-compresse": "ram-1000-bcaa-180-compresse.jpg",
  "ram-1000-bcaa-500-compresse": "ram-1000-bcaa-500-compresse.jpg",

  // Total Protein Blend (3 variants)
  "total-protein-blend": "total-protein-blend-vaniglia.jpg",
  "total-protein-blend-cioccolato": "total-protein-blend-cioccolato.jpg",
  "total-protein-blend-cookies-cream": "total-protein-blend-cookies-cream.jpg",
  "total-protein-blend-vaniglia": "total-protein-blend-vaniglia.jpg",

  // Whey Iso (8 variants)
  "whey-iso": "whey-iso-vaniglia.jpg",
  "whey-iso-vaniglia": "whey-iso-vaniglia.jpg",
  "whey-iso-brownies": "whey-iso-brownies.jpg",
  "whey-iso-cioccolato": "whey-iso-cioccolato.jpg",
  "whey-iso-cioccolato-bianco": "whey-iso-cioccolato-bianco.jpg",
  "whey-iso-cookies-cream": "whey-iso-cookies-cream.jpg",
  "whey-iso-crema-vaniglia": "whey-iso-crema-vaniglia.jpg",
  "whey-iso-frutti-rossi": "whey-iso-frutti-rossi.jpg",
  "whey-iso-torrone-al-cioccolato": "whey-iso-torrone-al-cioccolato.jpg",

  // === FINE BATCH 4 ===

  // Additional single products from Batch 4
  "taurina-1000-mg-150-compresse": "taurina-1000-mg-150-compresse.jpg",
  "thermogenic-force-120-compresse": "thermogenic-force-120-compresse.jpg",
  "tribulus-1000-plus-120-compresse": "tribulus-1000-plus-120-compresse.jpg",
  "vitamina-d3-2000-ui-200-compresse": "vitamina-d3-2000-ui-200-compresse.jpg",
  "viteral-60-compresse": "viteral-60-compresse.jpg",

  // Vitamin C 1000mg (2 variants)
  "vitamin-c-1000-mg-90-compresse": "vitamin-c-1000-mg-90-compresse.jpg",
  "vitamin-c-1000-mg-240-compresse": "vitamin-c-1000-mg-240-compresse.jpg",

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
  "75-protein-bar":
    "W240_75_ProteinBar_frutti_di_bosco_crisp_1751035219983.png",

  // Crema di Arachidi Iperproteica - WHY Sport
  "crema-di-arachidi-iperproteica": "W330_singolo_1751035294681.png",

  // EnergyFuel - WHY Sport
  "energyfuel-noci-nocciole":
    "aafbf9bb-a2aa-446c-abba-1af493193c67_1751035331102.png",

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
  powergel: "22010100_box_1751035814528.png",

  // 3. High Protein Shake - Powerbar
  "high-protein-shake": "23410202_singolo_1751035832599.png",

  // 4. Burro di Arachidi Croccante - +WATT
  "burro-di-arachidi-croccante":
    "ARACHIDI CROCCANTE_1KG_Fronte_1751035936116.jpg",

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
    // Aggiungi cache-busting per le nuove immagini modificate
    const cacheBustingSlugs = [
      "eaa-pro",
      "perfect-bar-50",
      "veggie-ciok",
      "rm1-bcaa-8-1-1-recovery-mix",
      "complex-carbs-advanced-ratio",
      "creatina-extra-gold",
      // BATCH 9 - Force cache refresh
      "total-energy-arancia-300g",
      "hard-staart-x-plode-arancia-300g",
      "glutamine-pure-1000-150-compresse",
      "glutamine-pure-1000-300-compresse",
      "high-pro-release-caffè-latte-1kg",
      "high-pro-release-crema-cioccolato-1kg",
      "high-pro-release-crema-vaniglia-1kg",
      "glutamine-pure-100-200g",
      "glutamine-pure-100-400g",
      "maltodex-pure-100-1-1kg",
      "ramtech-bcaa-2-1-1-120-capsule",
      "omnia-active-formula-45-capsule",
      "super-hydro-plus-limone-20-compresse",
      "super-hydro-plus-arancio-20-compresse",
      "pre-gara-endurance-20-buste",
      "borraccia-ethicsport-600ml",
      "borraccia-ethicsport-800ml",
      "sacca-taglia-unica",
      "t-shirt-ethcisport-limited-edition-s",
      "t-shirt-ethcisport-limited-edition-m",
      "t-shirt-ethcisport-limited-edition-l",
      "t-shirt-ethcisport-limited-edition-xl",
      "capppellino-ethicsport-taglia-unica",
    ];

    const fullPath = `/images/products/${fileName}`;

    if (cacheBustingSlugs.includes(productSlug)) {
      const cacheBustedPath = `${fullPath}?v=${Date.now()}`;
      console.log(
        `✅ Mapping con cache-busting per ${productSlug}: ${cacheBustedPath}`,
      );
      return cacheBustedPath;
    }

    console.log(`✅ Mapping diretto trovato per ${productSlug}: ${fullPath}`);
    return fullPath;
  }

  console.log(
    `❌ Nessuna immagine mappata per ${productSlug}, usando placeholder`,
  );
  return "/images/products/placeholder-product.jpg";
};

/**
 * Funzione per ottenere multiple immagini di un prodotto (per varianti di gusto)
 * @param productSlug - slug del prodotto
 * @returns array di oggetti immagine con src e alt
 */
export const getProductImages = (
  productSlug: string,
): Array<{ src: string; alt: string; primary: boolean }> => {
  // Gestione speciale per Perfect 100% Whey con varianti corrette
  if (productSlug === "perfect-100-whey") {
    return [
      {
        src: "/images/products/perfect-100-whey-pesca-450g.png",
        alt: "Perfect 100% Whey Pesca 450g",
        primary: true,
      },
      {
        src: "/images/products/perfect-100-whey-cookies-cream-450g.png",
        alt: "Perfect 100% Whey Cookies & Cream 450g",
        primary: false,
      },
      {
        src: "/images/products/perfect-100-whey-cioccolato-latte-450g.png",
        alt: "Perfect 100% Whey Cioccolato al Latte 450g",
        primary: false,
      },
      {
        src: "/images/products/perfect-100-whey-cioccolato-latte-900g.png",
        alt: "Perfect 100% Whey Cioccolato al Latte 900g",
        primary: false,
      },
      {
        src: "/images/products/perfect-100-whey-vaniglia-900g.png",
        alt: "Perfect 100% Whey Vaniglia 900g",
        primary: false,
      },
      {
        src: "/images/products/perfect-100-whey-pistacchio-900g.png",
        alt: "Perfect 100% Whey Pistacchio 900g",
        primary: false,
      },
    ];
  }

  // Gestione speciale per Perfect Blend 90 con varianti corrette
  if (productSlug === "perfect-blend-90") {
    return [
      {
        src: "/images/products/perfect-blend-90-cacao-750g.png",
        alt: "Perfect Blend 90 Cacao 750g",
        primary: true,
      },
      {
        src: "/images/products/perfect-blend-90-banana-vaniglia-750g.png",
        alt: "Perfect Blend 90 Banana & Vaniglia 750g",
        primary: false,
      },
    ];
  }

  // Gestione speciale per Mirabol Whey Protein 94% con tutte le varianti
  if (productSlug === "mirabol-whey-protein-94-volchem") {
    return [
      {
        src: "/images/products/Mirabol Whey Protein 94 vanilla 750g web.jpg",
        alt: "Mirabol Whey Protein 94% Vanilla 750g",
        primary: true,
      },
      {
        src: "/images/products/Mirabol Whey 750g Banana web.jpg",
        alt: "Mirabol Whey Protein 94% Banana 750g",
        primary: false,
      },
      {
        src: "/images/products/Mirabol Whey Protein 94 chocolate 750g web.jpg",
        alt: "Mirabol Whey Protein 94% Chocolate 750g",
        primary: false,
      },
      {
        src: "/images/products/Mirabol Whey 750g coffee web.jpg",
        alt: "Mirabol Whey Protein 94% Coffee 750g",
        primary: false,
      },
      {
        src: "/images/products/Mirabol Whey Protein 94 strawberry 750g web.jpg",
        alt: "Mirabol Whey Protein 94% Strawberry 750g",
        primary: false,
      },
      {
        src: "/images/products/Mirabol Whey Protein 94 double chocolate 750g web.jpg",
        alt: "Mirabol Whey Protein 94% Double Chocolate 750g",
        primary: false,
      },
      {
        src: "/images/products/Mirabol Whey Natural Bacio Web.jpg",
        alt: "Mirabol Whey Protein 94% Bacio 750g",
        primary: false,
      },
    ];
  }

  // Gestione speciale per Whey Protein 80 con varianti multiple
  if (productSlug === "whey-protein-80") {
    return [
      {
        src: "/images/products/wheyghty-protein-80-250-g-cacao-bea8-500x500_1751552286392.webp",
        alt: "Whey Protein 80 Cacao 250g",
        primary: true,
      },
      {
        src: "/images/products/bdc0c497-3cc5-4dfc-869f-037c1b1f1e09_1751552290192.webp",
        alt: "Whey Protein 80 Nocciola 250g",
        primary: false,
      },
      {
        src: "/images/products/WHEYGHTY PROTEIN 80 CACAO fronte.jpg",
        alt: "Whey Protein 80 Cacao 750g",
        primary: false,
      },
    ];
  }

  // Gestione speciale per Aminotool EAA con varianti
  if (productSlug === "aminotool-eaa-volchem") {
    return [
      {
        src: "/images/products/Aminotool eaa 252g orange web.jpg",
        alt: "Aminotool EAA Orange 252g",
        primary: true,
      },
      {
        src: "/images/products/Aminotool EAA 252g lemon-lime web.jpg",
        alt: "Aminotool EAA Lemon-Lime 252g",
        primary: false,
      },
    ];
  }

  const imagePath = getProductImagePath(productSlug);

  return [
    {
      src: imagePath,
      alt: productSlug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      primary: true,
    },
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
  console.log("🔍 Controllo immagini mappate...");

  const results = await Promise.all(
    Object.entries(PRODUCT_IMAGE_MAP).map(async ([slug, fileName]) => {
      const fullPath = `${PRODUCT_IMAGES_BASE_PATH}${fileName}`;
      const exists = await imageExists(fullPath);
      return { slug, fileName, fullPath, exists };
    }),
  );

  const missing = results.filter((r) => !r.exists);
  const found = results.filter((r) => r.exists);

  console.log(`✅ Immagini trovate: ${found.length}`);
  console.log(`❌ Immagini mancanti: ${missing.length}`);

  if (missing.length > 0) {
    console.log(
      "❌ Immagini mancanti:",
      missing.map((m) => m.fullPath),
    );
  }
};

/**
 * Funzione per riparare automaticamente mapping immagini mancanti
 */
export const autoFixMissingImages = (): void => {
  console.log("🔧 Auto-riparazione mapping immagini...");

  const problematicProducts = [
    "burn-out",
    "carbo-energy-plus",
    "fruitforce",
    "grissini-proteici",
    "iso-soya",
    "light-protein-plus-bar",
  ];

  problematicProducts.forEach((slug) => {
    const imagePath = getProductImagePath(slug);
    console.log(`📸 ${slug} → ${imagePath}`);
  });
};

// Mapping dei gusti disponibili per prodotto
export const PRODUCT_FLAVORS_MAP: Record<
  string,
  Array<{ name: string; available: boolean }>
> = {
  // Batch 3 - Prodotti con varianti gusto
  "norincol-marine-collagen": [
    { name: "Limone", available: true },
    { name: "Arancia", available: true },
  ],
  "sali-activator-1-0-8": [
    { name: "Arancia Rossa", available: true },
    { name: "Fragola Banana", available: true },
  ],

  // Nuovi prodotti inseriti
  "premier-pancake": [{ name: "Natural", available: true }],
  // Prodotti rimanenti nel database con i loro gusti
  "burn-out": [
    { name: "Lampone", available: true },
    { name: "Limone", available: true },
  ],
  "barrettone-2-0": [
    { name: "Cacao", available: true },
    { name: "Vaniglia", available: true },
    { name: "Burro d'Arachidi", available: true },
  ],
  "big-bar": [
    { name: "Cocco", available: true },
    { name: "Cookie Nocciola", available: true },
  ],
  "carbo-energy-plus": [
    { name: "Albicocca", available: true },
    { name: "Frutti di Bosco", available: true },
    { name: "Agrumi", available: true },
    { name: "Mela Verde", available: true },
  ],
  fruitforce: [
    { name: "Fragola", available: true },
    { name: "Ananas", available: true },
  ],
  "grissini-proteici": [{ name: "Arachidi e Mandorle", available: true }],
  "iso-soya": [{ name: "Naturale", available: true }],
  "light-protein-plus-bar": [
    { name: "Cheesecake", available: true },
    { name: "Caramello", available: true },
  ],
  "protein-evo-cocco": [{ name: "Cocco", available: true }],
  "protein-evo-creme-caramel": [{ name: "Crème Caramel", available: true }],
  "whey-protein-80": [
    { name: "Cacao", available: true },
    { name: "Nocciola", available: true },
    { name: "Banana", available: true },
    { name: "Fragola", available: true },
    { name: "Cappuccino", available: true },
    { name: "Cocco", available: true },
    { name: "Vaniglia", available: true },
  ],
  "whey-protein-90": [
    { name: "Banana", available: true },
    { name: "Cacao", available: true },
    { name: "Crema Nocciola", available: true },
    { name: "Fior di Latte", available: true },
    { name: "Fragola", available: true },
    { name: "Naturale", available: true },
    { name: "Vaniglia", available: true },
  ],
  "wheyghty-protein-80-standard": [
    { name: "Banana", available: true },
    { name: "Cacao", available: true },
    { name: "Cappuccino", available: true },
    { name: "Cocco", available: true },
    { name: "Nocciola", available: true },
    { name: "Fragola", available: true },
  ],
  "wheyghty-protein-80-limited-edition": [
    { name: "Cacao & Menta", available: true },
  ],
  "top-eggxellent-protein": [
    { name: "Crema Pasticciera", available: true },
    { name: "Crema Zabaione", available: true },
    { name: "Cacao", available: true },
  ],
  "hydrolyzed-104-dh4": [
    { name: "Cioccolato", available: true },
    { name: "Black Chocolate", available: true },
    { name: "Fragola-Banana", available: true },
    { name: "Wafer Nocciola", available: true },
    { name: "Vaniglia", available: true },
    { name: "Cookie Cream", available: true },
  ],
  "xxx-hydrolysed-protein-90": [
    { name: "Mokka", available: true },
    { name: "Cacao", available: true },
    { name: "Nocciola", available: true },
  ],
  "milk-protein-90-micellar-casein": [
    { name: "Banana", available: true },
    { name: "Cacao", available: true },
  ],

  // Prodotti Creatina - senza gusto specifico
  "creatina-compresse-extra-gold": [{ name: "Senza Aroma", available: true }],
  "creatina-compresse-extra-gold-plus-watt": [
    { name: "Senza Aroma", available: true },
  ],
  "creatina-polvere-gold-plus-watt": [{ name: "Senza Aroma", available: true }],
  "creanized-advance-care": [{ name: "Senza Aroma", available: true }],

  // Sali Activator - due gusti disponibili
  "sali-activator-plus-watt-arancia": [
    { name: "Arancia Rossa", available: true },
    { name: "Fragola e Banana", available: true },
  ],
  "sali-activator-plus-watt-fragola": [
    { name: "Fragola e Banana", available: true },
    { name: "Arancia Rossa", available: true },
  ],

  // Sali Electrolyte - due gusti disponibili
  "sali-electrolyte-plus-watt-arancia": [
    { name: "Arancia", available: true },
    { name: "Limone", available: true },
  ],
  "sali-electrolyte-plus-watt-limone": [
    { name: "Limone", available: true },
    { name: "Arancia", available: true },
  ],

  // Sali Performance Electrolyte - due gusti disponibili
  "sali-performance-electrolyte-plus-watt-arancia": [
    { name: "Arancia", available: true },
    { name: "Limone", available: true },
  ],
  "sali-performance-electrolyte-plus-watt-limone": [
    { name: "Limone", available: true },
    { name: "Arancia", available: true },
  ],

  // Sali Pocket - gusto singolo
  "sali-electrolyte-pocket-minerals": [{ name: "Limone", available: true }],

  // R.M.1 BCAA - gusto singolo
  "rm1-bcaa-recovery-mix-plus-watt": [{ name: "Arancia", available: true }],

  // Mass Gainer esistenti - confermati
  "avena-plus-watt-cappuccino": [{ name: "Cappuccino", available: true }],
  "avena-plus-watt-cacao": [{ name: "Cacao", available: true }],
  "avena-plus-watt-nocciola": [{ name: "Nocciola", available: true }],
  "mass-formula-mct-gainer-cacao": [{ name: "Cacao", available: true }],
  "mass-formula-mct-gainer-nocciola": [{ name: "Nocciola", available: true }],

  // Prodotti PREMIER - Amminoacidi
  "glutamine-pure-100-premier": [{ name: "Senza Aroma", available: true }],
  "arginine-no-premier": [{ name: "Senza Aroma", available: true }],
  "alaform-800-premier": [{ name: "Senza Aroma", available: true }],
  "high-bcaa-premier": [{ name: "Senza Aroma", available: true }],
  "intra-pro-essential-premier": [{ name: "Senza Aroma", available: true }],

  // Prodotti PREMIER - Proteine
  "vegan-soy-ea-90-premier": [{ name: "Gusto Cioccolato", available: true }],
  "protein-cream-premier": [
    { name: "Gianduia", available: true },
    { name: "Cacao", available: true },
  ],
  "premier-pancake-premier": [{ name: "Naturale", available: true }],
  "iso-soya-premier": [{ name: "Naturale", available: true }],

  // Prodotti PREMIER - Vitamine e Minerali
  "hard-zma-xp-premier": [{ name: "Senza Aroma", available: true }],
  "vital-energy-premier": [{ name: "Senza Aroma", available: true }],
  "omega-3-xc-premier": [{ name: "Senza Aroma", available: true }],
  "melatonine-plus-premier": [{ name: "Senza Aroma", available: true }],
  "hard-c-life-plus-1000-premier": [{ name: "Senza Aroma", available: true }],
  "joint-flex-premier": [{ name: "Senza Aroma", available: true }],

  // Prodotti PREMIER - Mass Gainer
  "massive-gain-xxl-premier": [{ name: "Cioccolato Bianco", available: true }],
  "maltodex-premier": [{ name: "Naturale", available: true }],

  // Prodotti PREMIER - Pre-workout
  "hard-start-xplode-premier": [{ name: "Senza Aroma", available: true }],

  // Prodotti VOLCHEM - Mirabol Whey Protein 94% (solo gusti, formati gestiti separatamente)
  "mirabol-whey-protein-94-volchem": [
    { name: "Vanilla", available: true },
    { name: "Banana", available: true },
    { name: "Chocolate", available: true },
    { name: "Coffee", available: true },
    { name: "Strawberry", available: true },
    { name: "Double Chocolate", available: true },
    { name: "Bacio", available: true },
  ],

  // Prodotti VOLCHEM - Aminotool EAA (solo gusti, formato fisso 252g)
  "aminotool-eaa-volchem": [
    { name: "Orange", available: true },
    { name: "Lemon-Lime", available: true },
  ],
  // Aminoacidi
  "alanina-vegana": [{ name: "Neutro", available: true }],

  // Vitamine e Minerali
  "sali-activator-plus-watt": [
    { name: "Arancia Rossa", available: true },
    { name: "Fragola e Banana", available: true },
  ],
  "sali-electrolyte-plus-watt": [
    { name: "Arancia", available: true },
    { name: "Limone", available: true },
  ],
  "sali-performance-electrolyte-plus-watt": [
    { name: "Limone", available: true },
  ],

  // Prodotti Jamieson - Vitamine e Minerali
  "selenio-100-jamieson": [{ name: "Naturale", available: true }],
  "calcio-citrato-d3-jamieson": [{ name: "Naturale", available: true }],
  "licopene-jamieson": [{ name: "Naturale", available: true }],
  "vita-vim-multivitaminico-jamieson": [{ name: "Naturale", available: true }],
  "lutein-z-jamieson": [{ name: "Naturale", available: true }],
  "spirulina-jamieson": [{ name: "Naturale", available: true }],
  "olio-di-lino-jamieson": [{ name: "Naturale", available: true }],
  "omega-3-select-mini-jamieson": [{ name: "Naturale", available: true }],
  "omega-complete-krill-jamieson": [{ name: "Naturale", available: true }],
  "omega-3-extra-jamieson": [{ name: "Naturale", available: true }],
  "vitamina-c-masticabile-jamieson": [
    { name: "Frutti Misti", available: true },
  ],
  "vitamina-k2-d3-jamieson": [{ name: "Naturale", available: true }],
  "magnesio-tripla-azione-jamieson": [{ name: "Naturale", available: true }],
  "calcio-650-why-sport": [{ name: "Naturale", available: true }],
  "ashwagandha-jamieson": [{ name: "Naturale", available: true }],
  "korean-red-ginseng": [{ name: "Naturale", available: true }],
  "echinacea-purpurea": [{ name: "Naturale", available: true }],

  // === BARRETTE ENERGETICHE - GUSTI ===
  "promeal-protein-snack-38": [
    { name: "Vaniglia", available: true },
    { name: "Cioccolato", available: true },
  ],
  "protein-cream": [
    { name: "Cacao", available: true },
    { name: "Gianduia", available: true },
  ],
  "veggie-ciok": [
    { name: "Albicocca", available: true },
    { name: "Arancia", available: true },
    { name: "Cacao", available: true },
  ],
  "perfect-bar-50": [{ name: "Cioccolato e Latte", available: true }],
  "energy-fuel": [{ name: "Caramello Salato", available: true }],
  "crema-di-arachidi-peanut-butter": [
    { name: "Crunchy", available: true },
    { name: "Smooth", available: true },
  ],
  "wafer-zero": [{ name: "Cacao e Cioccolato Bianco", available: true }],

  // === NUOVI 8 PRODOTTI BARRETTE ENERGETICHE - GUSTI ===
  "pancake-proteico-why-sport": [{ name: "Originale", available: true }],
  "45-protein-bar": [
    { name: "Wafer Nocciola", available: true },
    { name: "Cookies Crisp", available: true },
  ],
  "75-protein-bar": [{ name: "Frutti di Bosco", available: true }],
  "crema-di-arachidi-iperproteica": [{ name: "Crunchy", available: true }],
  "energyfuel-noci-nocciole": [{ name: "Noci-Nocciole", available: true }],
  "perfect-cream": [
    { name: "Nocciola", available: true },
    { name: "Pistacchio", available: true },
    { name: "Yogurt Frutti di Bosco", available: true },
  ],
  "liquid-carbo-plus": [{ name: "Arancia", available: true }],
  "nocciola-crema-proteica": [{ name: "Nocciola", available: true }],

  // === NUOVI 9 PRODOTTI - GUSTI ===
  "energize-advanced": [{ name: "Raspberry", available: true }],
  powergel: [
    { name: "Mela", available: true },
    { name: "Mango", available: true },
  ],
  "high-protein-shake": [{ name: "Smooth Chocolate", available: true }],
  "burro-di-arachidi-croccante": [{ name: "Croccante", available: true }],
  "avena-farina-istantanea": [
    { name: "Cappuccino", available: true },
    { name: "Cacao", available: true },
  ],
  "oatmeal-pro": [{ name: "Biscotto", available: true }],
  "pistacchio-crema-proteica": [{ name: "Pistacchio", available: true }],
  "promeal-energetica": [{ name: "Mandorle", available: true }],
  "promeal-50-protein-bar": [
    { name: "Yogurt", available: true },
    { name: "Cocco", available: true },
  ],
};

/**
 * Funzione per ottenere i gusti disponibili di un prodotto
 * @param productSlug - slug del prodotto
 * @returns array dei gusti disponibili
 */
export const getProductFlavors = (
  productSlug: string,
): Array<{ name: string; available: boolean }> => {
  return (
    PRODUCT_FLAVORS_MAP[productSlug] || [{ name: "Naturale", available: true }]
  );
};
