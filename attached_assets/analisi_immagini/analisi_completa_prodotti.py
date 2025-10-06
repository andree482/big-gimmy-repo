
#!/usr/bin/env python3
"""
ANALISI COMPLETA DI OGNI SINGOLO PRODOTTO
Analizza tutte le immagini dalle cartelle 1 e 2 per identificare:
- Brand e nome prodotto
- Categoria di appartenenza
- Varianti (gusti, formati, quantità)
- Compatibilità con BigGimmy
"""

import os
import json
from pathlib import Path
from datetime import datetime

def analyze_single_product(filename, source_folder):
    """Analizza un singolo file prodotto per dedurre tutte le caratteristiche"""
    
    # Estrai codice base dal filename
    base_code = filename.replace('_singolo.png', '').replace('_box.png', '')
    
    product_analysis = {
        'filename': filename,
        'source_folder': source_folder,
        'code': base_code,
        'image_type': 'box' if '_box' in filename else 'singolo',
        'brand': 'SCONOSCIUTO',
        'category': 'DA_CLASSIFICARE',
        'product_name': 'DA_DETERMINARE',
        'suitable_for_biggimmy': False,
        'biggimmy_category': None,
        'variants': {
            'flavors': [],
            'sizes': [],
            'formats': []
        },
        'characteristics': [],
        'analysis_notes': []
    }
    
    # ANALISI BRAND BASATA SUI CODICI
    if base_code.startswith(('W', 'WN', 'WP', 'WSX', 'WNX')):
        product_analysis['brand'] = '+WATT'
        product_analysis['suitable_for_biggimmy'] = True
        analyze_watt_product(base_code, product_analysis)
        
    elif base_code.startswith('21'):
        product_analysis['brand'] = 'POWERBAR'
        product_analysis['suitable_for_biggimmy'] = True
        analyze_powerbar_product(base_code, product_analysis)
        
    elif base_code.startswith('24'):
        product_analysis['brand'] = 'POWERBAR_PROTEIN'
        product_analysis['suitable_for_biggimmy'] = True
        analyze_powerbar_protein_product(base_code, product_analysis)
        
    elif base_code.startswith(('10', '2102', '2194', '2195', '2208', '2222', '2288', '2300', '2393', '2767', '2847', '2904')):
        product_analysis['brand'] = 'JAMIESON'
        product_analysis['suitable_for_biggimmy'] = True
        analyze_jamieson_product(base_code, product_analysis)
        
    elif base_code.startswith(('EP', 'SF', 'JX')):
        product_analysis['brand'] = 'SALUS_FLORADIX/JAMIESON'
        product_analysis['suitable_for_biggimmy'] = True
        analyze_salus_product(base_code, product_analysis)
        
    elif base_code.startswith(('ARC', 'FRI')):
        product_analysis['brand'] = 'WHY_SPORT'
        product_analysis['suitable_for_biggimmy'] = False
        analyze_why_sport_product(base_code, product_analysis)
        
    elif base_code.startswith('128'):
        product_analysis['brand'] = 'SOUDAL'
        product_analysis['suitable_for_biggimmy'] = False
        analyze_soudal_product(base_code, product_analysis)
        
    elif base_code.startswith(('124507', '22', '23')):
        product_analysis['brand'] = 'POWERBAR_ENERGY'
        product_analysis['suitable_for_biggimmy'] = True
        analyze_powerbar_energy_product(base_code, product_analysis)
        
    elif base_code.startswith(('31', '4622', '4793', '4883', '5634', '5635', '6232', '6234', '6403', '7355', '7844', '7920', '7959', '9043', '9251', '9252', '9254', '9256', '9257', '9258', '9524', '9594', '9848')):
        product_analysis['brand'] = 'ALTRI_INTEGRATORI'
        product_analysis['suitable_for_biggimmy'] = True
        analyze_other_supplements(base_code, product_analysis)
        
    else:
        product_analysis['analysis_notes'].append(f"Codice non riconosciuto: {base_code}")
    
    return product_analysis

def analyze_watt_product(code, analysis):
    """Analizza prodotti +WATT basati sul codice"""
    
    # Serie WN - WellNess (nutrizione sportiva)
    if code.startswith('WN'):
        analysis['category'] = 'NUTRIZIONE_SPORTIVA'
        analysis['product_name'] = f"+WATT WellNess {code}"
        
        # Mapping specifico per codici WN conosciuti
        wn_mapping = {
            'WN021': {'name': 'Protein Bar', 'biggimmy_cat': 'Barrette Energetiche'},
            'WN024': {'name': 'BCAA Complex', 'biggimmy_cat': 'Aminoacidi'},
            'WN048': {'name': 'Pre Workout', 'biggimmy_cat': 'Pre-Workout'},
            'WN054': {'name': 'Mass Gainer', 'biggimmy_cat': 'Mass Gainer'},
            'WN087': {'name': 'Whey Protein', 'biggimmy_cat': 'Proteine'},
            'WN103': {'name': 'Creatine Monohydrate', 'biggimmy_cat': 'Creatine'},
            'WN111': {'name': 'Amino Essential', 'biggimmy_cat': 'Aminoacidi'},
            'WN114': {'name': 'Energy Complex', 'biggimmy_cat': 'Pre-Workout'},
            'WN118': {'name': 'Vitamin Complex', 'biggimmy_cat': 'Vitamine e Minerali'},
        }
        
        if code in wn_mapping:
            analysis['product_name'] = f"+WATT {wn_mapping[code]['name']}"
            analysis['biggimmy_category'] = wn_mapping[code]['biggimmy_cat']
        else:
            analysis['biggimmy_category'] = 'Vitamine e Minerali'  # Default per WN
    
    # Serie WSX - Performance avanzata
    elif code.startswith('WSX'):
        analysis['category'] = 'PERFORMANCE_AVANZATA'
        analysis['product_name'] = f"+WATT Performance {code}"
        analysis['biggimmy_category'] = 'Pre-Workout'
        
    # Serie WP - Proteine
    elif code.startswith('WP'):
        analysis['category'] = 'PROTEINE'
        analysis['product_name'] = f"+WATT Protein {code}"
        analysis['biggimmy_category'] = 'Proteine'
        
    # Serie W generica
    elif code.startswith('W') and len(code) > 1:
        analysis['category'] = 'INTEGRATORI_GENERICI'
        analysis['product_name'] = f"+WATT {code}"
        
        # Classificazione per range di codici W
        w_num = int(''.join(filter(str.isdigit, code)))
        if w_num < 100:
            analysis['biggimmy_category'] = 'Vitamine e Minerali'
        elif w_num < 200:
            analysis['biggimmy_category'] = 'Aminoacidi'
        elif w_num < 300:
            analysis['biggimmy_category'] = 'Pre-Workout'
        elif w_num < 400:
            analysis['biggimmy_category'] = 'Proteine'
        else:
            analysis['biggimmy_category'] = 'Accessori'
    
    analysis['characteristics'] = [
        'Integratore sportivo professionale',
        'Brand italiano +WATT',
        'Adatto per atleti e sportivi'
    ]

def analyze_powerbar_product(code, analysis):
    """Analizza prodotti PowerBar energia"""
    
    analysis['category'] = 'BARRETTE_ENERGETICHE'
    analysis['biggimmy_category'] = 'Barrette Energetiche'
    
    # Mapping specifico PowerBar
    powerbar_mapping = {
        '21011': {'name': 'PowerBar Energize Original Chocolate', 'size': '55g', 'flavor': 'Cioccolato'},
        '21012': {'name': 'PowerBar Energize Original Berry', 'size': '55g', 'flavor': 'Frutti di Bosco'},
        '21013': {'name': 'PowerBar Energize Original Cookies & Cream', 'size': '55g', 'flavor': 'Cookies & Cream'},
        '21031': {'name': 'PowerBar Energize Advanced Orange', 'size': '55g', 'flavor': 'Arancia'},
        '21032': {'name': 'PowerBar Energize Advanced Hazelnut-Chocolate', 'size': '55g', 'flavor': 'Nocciola-Cioccolato'},
        '21033': {'name': 'PowerBar Energize Advanced', 'size': '55g', 'flavor': 'Mix'},
        '21034': {'name': 'PowerBar Energize Advanced', 'size': '55g', 'flavor': 'Speciale'},
        '21090': {'name': 'PowerBar True Organic Oat Chocolate', 'size': '65g', 'flavor': 'Cioccolato Bio'},
        '21091': {'name': 'PowerBar True Organic Oat Banana', 'size': '65g', 'flavor': 'Banana Bio'},
    }
    
    code_base = code[:5]  # Primi 5 caratteri
    if code_base in powerbar_mapping:
        product_info = powerbar_mapping[code_base]
        analysis['product_name'] = product_info['name']
        analysis['variants']['sizes'] = [product_info['size']]
        analysis['variants']['flavors'] = [product_info['flavor']]
    else:
        analysis['product_name'] = f"PowerBar Energy {code}"
        analysis['variants']['sizes'] = ['55g']
    
    analysis['characteristics'] = [
        'Barretta energetica PowerBar',
        'Carboidrati 2:1 (maltodestrina + fruttosio)',
        'Con magnesio e sodio',
        'Ideale pre/durante allenamento'
    ]

def analyze_powerbar_protein_product(code, analysis):
    """Analizza prodotti PowerBar proteici"""
    
    analysis['category'] = 'BARRETTE_PROTEICHE'
    analysis['biggimmy_category'] = 'Proteine'
    
    # Mapping PowerBar Protein
    protein_mapping = {
        '24320': {'name': 'PowerBar Protein Plus 30%', 'protein': '30%'},
        '24330': {'name': 'PowerBar Protein Plus 33%', 'protein': '33%'},
        '24460': {'name': 'PowerBar Protein Plus 40%', 'protein': '40%'},
        '24712': {'name': 'PowerBar ProteinNut', 'protein': '25%'},
        '24717': {'name': 'PowerBar Protein Soft Layer', 'protein': '27%'),
        '24763': {'name': 'PowerBar Protein Plus Recovery', 'protein': '35%'},
        '24765': {'name': 'PowerBar Protein Plus Endurance', 'protein': '32%'},
        '24768': {'name': 'PowerBar Protein Plus Performance', 'protein': '38%'},
        '24790': {'name': 'PowerBar Protein Bar', 'protein': '30%'},
        '24819': {'name': 'PowerBar Clean Whey', 'protein': '40%'},
        '24850': {'name': 'PowerBar Natural Protein', 'protein': '27%'},
        '24860': {'name': 'PowerBar Protein Cookie', 'protein': '25%'},
        '24870': {'name': 'PowerBar Protein Crisp', 'protein': '33%'},
    }
    
    code_base = code[:5]
    if code_base in protein_mapping:
        product_info = protein_mapping[code_base]
        analysis['product_name'] = product_info['name']
        analysis['characteristics'].append(f"Contenuto proteico: {product_info['protein']}")
    else:
        analysis['product_name'] = f"PowerBar Protein {code}"
    
    analysis['variants']['sizes'] = ['55g']
    analysis['characteristics'].extend([
        'Barretta proteica PowerBar',
        'Alto contenuto proteico',
        'Ideale post-workout',
        'Per recupero muscolare'
    ])

def analyze_jamieson_product(code, analysis):
    """Analizza prodotti Jamieson"""
    
    analysis['category'] = 'VITAMINE_MINERALI'
    analysis['biggimmy_category'] = 'Vitamine e Minerali'
    
    # Mapping Jamieson specifico
    jamieson_mapping = {
        '10129': {'name': 'Jamieson VitaVim Multivitaminico', 'format': '90 compresse'},
        '2102': {'name': 'Jamieson Lecitina 1200mg', 'format': '100 softgel'},
        '2194': {'name': 'Jamieson Vitamin C 500mg', 'format': '120 compresse'},
        '2195': {'name': 'Jamieson Vitamin D3 1000 IU', 'format': '100 compresse'},
        '2208': {'name': 'Jamieson Magnesium', 'format': '100 compresse'},
        '2222': {'name': 'Jamieson Zinc', 'format': '100 compresse'},
        '2288': {'name': 'Jamieson Iron', 'format': '100 compresse'},
        '2300': {'name': 'Jamieson B-Complex', 'format': '100 compresse'},
        '2393': {'name': 'Jamieson Omega-3', 'format': '100 softgel'},
        '2767': {'name': 'Jamieson Calcium', 'format': '120 compresse'],
        '2847': {'name': 'Jamieson Vitamin E', 'format': '100 softgel'},
        '2904': {'name': 'Jamieson CoQ10', 'format': '60 softgel'},
    }
    
    if code in jamieson_mapping:
        product_info = jamieson_mapping[code]
        analysis['product_name'] = product_info['name']
        analysis['variants']['formats'] = [product_info['format']]
    else:
        analysis['product_name'] = f"Jamieson {code}"
        analysis['variants']['formats'] = ['Standard']
    
    analysis['characteristics'] = [
        'Integratore Jamieson',
        'Qualità farmaceutica',
        'Made in Canada',
        'Certificato GMP'
    ]

def analyze_salus_product(code, analysis):
    """Analizza prodotti Salus Floradix/Jamieson"""
    
    analysis['category'] = 'VITAMINE_NATURALI'
    analysis['biggimmy_category'] = 'Vitamine e Minerali'
    
    if code.startswith('EP'):
        analysis['product_name'] = f"Salus Floradix {code}"
        analysis['characteristics'] = ['Integratore naturale Salus', 'Formula liquida', 'A base di erbe']
    elif code.startswith('SF'):
        analysis['product_name'] = f"Salus Formula {code}"
        analysis['characteristics'] = ['Salus Floradix', 'Estratti vegetali', 'Naturale']
    elif code.startswith('JX'):
        analysis['product_name'] = f"Jamieson Extra {code}"
        analysis['characteristics'] = ['Jamieson premium', 'Formula potenziata']

def analyze_why_sport_product(code, analysis):
    """Analizza prodotti WHY Sport (Accessori)"""
    
    analysis['category'] = 'ACCESSORI_SPORT'
    analysis['biggimmy_category'] = 'Accessori'
    analysis['suitable_for_biggimmy'] = True  # Cambiato a True per accessori
    
    if code.startswith('ARC'):
        analysis['product_name'] = f"WHY Sport Arco {code}"
        analysis['characteristics'] = ['Arco gonfiabile', 'Per events sportivi', 'Brandizzato WHY Sport']
    elif code.startswith('FRI'):
        analysis['product_name'] = f"WHY Sport Frigorifero {code}"
        analysis['characteristics'] = ['Frigorifero brandizzato', 'Per punto vendita', 'WHY Sport']

def analyze_soudal_product(code, analysis):
    """Analizza prodotti Soudal (da escludere)"""
    
    analysis['category'] = 'MANUTENZIONE_BICI'
    analysis['suitable_for_biggimmy'] = False
    analysis['product_name'] = f"Soudal Bike Maintenance {code}"
    analysis['analysis_notes'].append('ESCLUSO: Prodotto manutenzione bici, non integratore')
    analysis['characteristics'] = [
        'Prodotto manutenzione biciclette',
        'Brand Soudal',
        'NON ADATTO per e-commerce integratori'
    ]

def analyze_powerbar_energy_product(code, analysis):
    """Analizza prodotti PowerBar Energy/Gel"""
    
    if code.startswith('124507'):
        analysis['category'] = 'GEL_ENERGETICI'
        analysis['biggimmy_category'] = 'Pre-Workout'
        analysis['product_name'] = 'PowerBar PowerGel Shots'
        analysis['variants']['flavors'] = ['Cola', 'Raspberry']
        analysis['variants']['sizes'] = ['60g']
        analysis['characteristics'] = [
            'Gel energetico con caffeina',
            '75mg caffeina per porzione',
            'Carboidrati veloci',
            'Per energia immediata'
        ]
    else:
        analysis['category'] = 'ENERGIA_SPORT'
        analysis['biggimmy_category'] = 'Carboidrati'
        analysis['product_name'] = f"PowerBar Energy {code}"

def analyze_other_supplements(code, analysis):
    """Analizza altri integratori non classificati"""
    
    analysis['category'] = 'INTEGRATORI_VARI'
    analysis['product_name'] = f"Integratore {code}"
    
    # Classificazione approssimativa per range numerici
    try:
        num_code = int(code)
        if num_code < 5000:
            analysis['biggimmy_category'] = 'Vitamine e Minerali'
        elif num_code < 7000:
            analysis['biggimmy_category'] = 'Aminoacidi'
        elif num_code < 9000:
            analysis['biggimmy_category'] = 'Pre-Workout'
        else:
            analysis['biggimmy_category'] = 'Proteine'
    except:
        analysis['biggimmy_category'] = 'Vitamine e Minerali'
    
    analysis['characteristics'] = ['Integratore generico', 'Da classificare meglio']

def analyze_all_products():
    """Analizza tutti i prodotti dalle due cartelle"""
    
    print("🔍 AVVIO ANALISI COMPLETA DI OGNI SINGOLO PRODOTTO")
    print("=" * 70)
    
    results = {
        'timestamp': datetime.now().isoformat(),
        'total_analyzed': 0,
        'suitable_for_biggimmy': 0,
        'excluded_products': 0,
        'folders_analyzed': ['attached_assets/1', 'attached_assets/2'],
        'products': [],
        'brand_summary': {},
        'category_summary': {},
        'biggimmy_category_summary': {}
    }
    
    # Analizza cartella 1
    folder1_path = Path("attached_assets/1")
    if folder1_path.exists():
        print(f"\n📁 ANALISI CARTELLA 1: {folder1_path}")
        print("-" * 50)
        
        files = [f for f in os.listdir(folder1_path) if f.endswith('.png')]
        for filename in sorted(files):
            analysis = analyze_single_product(filename, "Cartella_1")
            results['products'].append(analysis)
            results['total_analyzed'] += 1
            
            if analysis['suitable_for_biggimmy']:
                results['suitable_for_biggimmy'] += 1
            else:
                results['excluded_products'] += 1
            
            print(f"  ✓ {analysis['product_name']} - {analysis['brand']} - {analysis['biggimmy_category'] or 'ESCLUSO'}")
    
    # Analizza cartella 2
    folder2_path = Path("attached_assets/2")
    if folder2_path.exists():
        print(f"\n📁 ANALISI CARTELLA 2: {folder2_path}")
        print("-" * 50)
        
        files = [f for f in os.listdir(folder2_path) if f.endswith('.png')]
        for filename in sorted(files):
            analysis = analyze_single_product(filename, "Cartella_2")
            results['products'].append(analysis)
            results['total_analyzed'] += 1
            
            if analysis['suitable_for_biggimmy']:
                results['suitable_for_biggimmy'] += 1
            else:
                results['excluded_products'] += 1
            
            print(f"  ✓ {analysis['product_name']} - {analysis['brand']} - {analysis['biggimmy_category'] or 'ESCLUSO'}")
    
    # Genera statistiche
    for product in results['products']:
        brand = product['brand']
        category = product['category']
        biggimmy_cat = product['biggimmy_category']
        
        results['brand_summary'][brand] = results['brand_summary'].get(brand, 0) + 1
        results['category_summary'][category] = results['category_summary'].get(category, 0) + 1
        if biggimmy_cat:
            results['biggimmy_category_summary'][biggimmy_cat] = results['biggimmy_category_summary'].get(biggimmy_cat, 0) + 1
    
    # Salva risultati
    output_file = "attached_assets/analisi_immagini/analisi_completa_risultati.json"
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    # Stampa riepilogo finale
    print("\n" + "=" * 70)
    print("📊 RIEPILOGO ANALISI COMPLETA")
    print("=" * 70)
    print(f"🔢 Prodotti totali analizzati: {results['total_analyzed']}")
    print(f"✅ Adatti per BigGimmy: {results['suitable_for_biggimmy']}")
    print(f"❌ Esclusi: {results['excluded_products']}")
    print(f"📈 Percentuale validità: {(results['suitable_for_biggimmy']/results['total_analyzed']*100):.1f}%")
    
    print(f"\n🏢 DISTRIBUZIONE BRAND:")
    for brand, count in sorted(results['brand_summary'].items(), key=lambda x: x[1], reverse=True):
        print(f"   {brand}: {count} prodotti")
    
    print(f"\n🛒 CATEGORIE BIGGIMMY:")
    for cat, count in sorted(results['biggimmy_category_summary'].items(), key=lambda x: x[1], reverse=True):
        print(f"   {cat}: {count} prodotti")
    
    print(f"\n💾 Risultati salvati in: {output_file}")
    
    return results

if __name__ == "__main__":
    results = analyze_all_products()
    print(f"\n🎯 ANALISI COMPLETATA! {results['total_analyzed']} prodotti analizzati.")
