
#!/usr/bin/env python3
"""
SCRIPT AUTOMATICO PER MAPPATURA IMMAGINI-PRODOTTI
Associa automaticamente i file immagine ai prodotti corretti
Basato sul modello FruitForce e guida PRODUCT_INSERTION_GUIDE.md
"""

import os
import json
import re
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional, Tuple

class ProductImageMapper:
    """Classe principale per la mappatura automatica delle immagini"""
    
    def __init__(self, images_folder: str = "attached_assets"):
        self.images_folder = Path(images_folder)
        self.output_folder = Path("product_mapping_output")
        self.output_folder.mkdir(exist_ok=True)
        
        # Database di prodotti conosciuti basato su FruitForce e catalogo esistente
        self.product_database = self._load_product_database()
        
        # Pattern di riconoscimento per codici prodotto
        self.code_patterns = {
            'jamieson': r'^(2194|2195|2393|2847|4622|4793|4883|5634|6234|7355|7844|7920|7959|9043|9254|9257|9258|9594|9848)',
            'powerbar': r'^21\d{2,5}',
            'watt': r'^W[NXP]?\d{3}',
            'volchem': r'^(ARC|FRI|EP|SF|JX)',
            'generic': r'^\d{4,5}'
        }
    
    def _load_product_database(self) -> Dict:
        """Carica il database dei prodotti conosciuti"""
        return {
            # Prodotti Jamieson - Vitamine e Minerali
            '2194': {
                'brand': 'JAMIESON',
                'name': 'Vitamin C 500mg Time Release',
                'category': 'Vitamine e Minerali',
                'variants': ['120 compresse'],
                'flavors': ['Naturale']
            },
            '2195': {
                'brand': 'JAMIESON', 
                'name': 'Vitamin D3 1000 IU',
                'category': 'Vitamine e Minerali',
                'variants': ['100 compresse'],
                'flavors': ['Naturale']
            },
            '2393': {
                'brand': 'JAMIESON',
                'name': 'Omega-3 Select 1000mg',
                'category': 'Vitamine e Minerali',
                'variants': ['100 softgel'],
                'flavors': ['Naturale']
            },
            '2847': {
                'brand': 'JAMIESON',
                'name': 'Vitamin E 400 IU Natural',
                'category': 'Vitamine e Minerali',
                'variants': ['100 softgel'],
                'flavors': ['Naturale']
            },
            
            # Prodotti generici - Integratori
            '4622': {
                'brand': 'INTEGRATORI_GENERICI',
                'name': 'Multivitaminico Completo',
                'category': 'Vitamine e Minerali',
                'variants': ['60 compresse', '120 compresse'],
                'flavors': ['Naturale']
            },
            '4793': {
                'brand': 'INTEGRATORI_GENERICI',
                'name': 'Complesso Vitaminico B',
                'category': 'Vitamine e Minerali',
                'variants': ['60 compresse'],
                'flavors': ['Naturale']
            },
            '4883': {
                'brand': 'INTEGRATORI_GENERICI',
                'name': 'Magnesio + Potassio',
                'category': 'Vitamine e Minerali',
                'variants': ['90 compresse'],
                'flavors': ['Naturale']
            },
            '5634': {
                'brand': 'INTEGRATORI_SPECIALIZZATI',
                'name': 'Ferro + Vitamina C',
                'category': 'Vitamine e Minerali',
                'variants': ['60 compresse'],
                'flavors': ['Naturale']
            },
            '6234': {
                'brand': 'INTEGRATORI_SPECIALIZZATI',
                'name': 'Calcio + Magnesio + Vitamina D3',
                'category': 'Vitamine e Minerali',
                'variants': ['120 compresse'],
                'flavors': ['Naturale']
            },
            
            # Prodotti avanzati e premium
            '7355': {
                'brand': 'INTEGRATORI_AVANZATI',
                'name': 'Formula Antiossidante Avanzata',
                'category': 'Vitamine e Minerali',
                'variants': ['90 capsule'],
                'flavors': ['Naturale']
            },
            '7844': {
                'brand': 'INTEGRATORI_AVANZATI',
                'name': 'Complesso Energetico Plus',
                'category': 'Vitamine e Minerali',
                'variants': ['60 capsule'],
                'flavors': ['Naturale']
            },
            '7920': {
                'brand': 'INTEGRATORI_AVANZATI',
                'name': 'Supporto Immunitario Avanzato',
                'category': 'Vitamine e Minerali',
                'variants': ['90 capsule'],
                'flavors': ['Naturale']
            },
            '7959': {
                'brand': 'INTEGRATORI_AVANZATI',
                'name': 'Omega Plus Concentrato',
                'category': 'Vitamine e Minerali',
                'variants': ['60 softgel'],
                'flavors': ['Naturale']
            },
            
            # Prodotti specializzati
            '9043': {
                'brand': 'INTEGRATORI_SPECIALIZZATI',
                'name': 'Collagene Marino Idrolizzato',
                'category': 'Vitamine e Minerali',
                'variants': ['60 capsule'],
                'flavors': ['Naturale']
            },
            '9254': {
                'brand': 'INTEGRATORI_SPECIALIZZATI',
                'name': 'Curcuma + Piperina',
                'category': 'Vitamine e Minerali',
                'variants': ['90 capsule'],
                'flavors': ['Naturale']
            },
            '9257': {
                'brand': 'INTEGRATORI_SPECIALIZZATI',
                'name': 'Ashwagandha Concentrata',
                'category': 'Vitamine e Minerali',
                'variants': ['60 capsule'],
                'flavors': ['Naturale']
            },
            '9258': {
                'brand': 'INTEGRATORI_SPECIALIZZATI',
                'name': 'Rhodiola Rosea Estratto',
                'category': 'Vitamine e Minerali',
                'variants': ['60 capsule'],
                'flavors': ['Naturale']
            },
            '9594': {
                'brand': 'INTEGRATORI_PREMIUM',
                'name': 'CoQ10 Ubiquinone 100mg',
                'category': 'Vitamine e Minerali',
                'variants': ['60 capsule'],
                'flavors': ['Naturale']
            },
            '9848': {
                'brand': 'INTEGRATORI_PREMIUM',
                'name': 'Resveratrolo + Quercetina',
                'category': 'Vitamine e Minerali',
                'variants': ['60 capsule'],
                'flavors': ['Naturale']
            }
        }
    
    def scan_images(self, folder_path: Optional[str] = None) -> List[Dict]:
        """Scansiona le immagini nella cartella specificata"""
        if folder_path:
            scan_path = Path(folder_path)
        else:
            scan_path = self.images_folder
        
        print(f"🔍 Scansionando immagini in: {scan_path}")
        
        if not scan_path.exists():
            print(f"❌ Cartella non trovata: {scan_path}")
            return []
        
        # Cerca immagini in tutte le sottocartelle
        image_files = []
        for ext in ['*.png', '*.jpg', '*.jpeg', '*.webp']:
            image_files.extend(scan_path.rglob(ext))
        
        print(f"📸 Trovate {len(image_files)} immagini")
        return image_files
    
    def extract_product_code(self, filename: str) -> Optional[str]:
        """Estrae il codice prodotto dal nome file"""
        # Rimuovi estensione e timestamp
        base_name = filename.split('.')[0]
        
        # Rimuovi timestamp (pattern: _1234567890123)
        base_name = re.sub(r'_\d{13}$', '', base_name)
        
        # Rimuovi suffissi come _singolo, _box
        base_name = re.sub(r'_(singolo|box)$', '', base_name)
        
        # Estrai il codice (prima parte prima di _)
        code = base_name.split('_')[0]
        
        return code if code.isdigit() or any(code.startswith(p) for p in ['W', 'EP', 'SF', 'JX', 'ARC', 'FRI']) else None
    
    def analyze_image(self, image_path: Path) -> Dict:
        """Analizza una singola immagine"""
        filename = image_path.name
        code = self.extract_product_code(filename)
        
        analysis = {
            'filename': filename,
            'path': str(image_path),
            'code': code,
            'timestamp': datetime.now().isoformat(),
            'status': 'unknown',
            'product_info': None,
            'mapping_confidence': 0.0,
            'suggestions': []
        }
        
        if code and code in self.product_database:
            product = self.product_database[code]
            analysis.update({
                'status': 'identified',
                'product_info': product,
                'mapping_confidence': 0.95,
                'web_filename': self._generate_web_filename(product, filename),
                'biggimmy_category': product['category'],
                'suggested_slug': self._generate_product_slug(product)
            })
        elif code:
            analysis.update({
                'status': 'code_found',
                'mapping_confidence': 0.3,
                'suggestions': [f"Codice {code} non nel database - verifica manualmente"]
            })
        else:
            analysis.update({
                'status': 'needs_manual_review',
                'mapping_confidence': 0.0,
                'suggestions': ["Nome file non riconosciuto - richiesta identificazione manuale"]
            })
        
        return analysis
    
    def _generate_web_filename(self, product: Dict, original_filename: str) -> str:
        """Genera un nome file web-friendly"""
        brand = product['brand'].lower().replace('_', '-')
        name = re.sub(r'[^\w\s-]', '', product['name']).strip().lower()
        name = re.sub(r'[-\s]+', '-', name)
        
        # Mantieni l'estensione originale
        ext = Path(original_filename).suffix
        
        return f"{brand}-{name}{ext}"
    
    def _generate_product_slug(self, product: Dict) -> str:
        """Genera uno slug prodotto seguendo il modello FruitForce"""
        name = re.sub(r'[^\w\s-]', '', product['name']).strip().lower()
        slug = re.sub(r'[-\s]+', '-', name)
        
        # Rimuovi parole comuni
        common_words = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']
        slug_parts = [part for part in slug.split('-') if part not in common_words]
        
        return '-'.join(slug_parts)
    
    def process_images(self, folder_path: Optional[str] = None) -> Dict:
        """Processa tutte le immagini e genera il report"""
        print("🚀 AVVIO ELABORAZIONE IMMAGINI")
        print("=" * 50)
        
        images = self.scan_images(folder_path)
        
        if not images:
            print("❌ Nessuna immagine trovata")
            return {}
        
        results = {
            'timestamp': datetime.now().isoformat(),
            'total_images': len(images),
            'identified': 0,
            'needs_review': 0,
            'unknown': 0,
            'images': [],
            'mapping_summary': {},
            'web_filenames': {},
            'biggimmy_categories': {}
        }
        
        print(f"📋 Elaborando {len(images)} immagini...")
        
        for i, image_path in enumerate(images, 1):
            print(f"  📸 {i:2d}/{len(images)}: {image_path.name}")
            
            analysis = self.analyze_image(image_path)
            results['images'].append(analysis)
            
            # Aggiorna statistiche
            if analysis['status'] == 'identified':
                results['identified'] += 1
                product = analysis['product_info']
                
                # Mapping per imageUtils.ts
                if 'suggested_slug' in analysis:
                    results['web_filenames'][analysis['suggested_slug']] = analysis['web_filename']
                
                # Categorizzazione BigGimmy
                category = product['category']
                if category not in results['biggimmy_categories']:
                    results['biggimmy_categories'][category] = []
                results['biggimmy_categories'][category].append(analysis)
                
            elif analysis['status'] == 'needs_manual_review':
                results['needs_review'] += 1
            else:
                results['unknown'] += 1
        
        # Salva i risultati
        self._save_results(results)
        self._generate_frontend_mapping(results)
        self._print_summary(results)
        
        return results
    
    def _save_results(self, results: Dict):
        """Salva i risultati in file JSON"""
        output_file = self.output_folder / f"image_mapping_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        
        print(f"💾 Risultati salvati in: {output_file}")
    
    def _generate_frontend_mapping(self, results: Dict):
        """Genera il mapping per il frontend (imageUtils.ts)"""
        mapping_lines = []
        
        for analysis in results['images']:
            if analysis['status'] == 'identified' and 'suggested_slug' in analysis:
                slug = analysis['suggested_slug']
                filename = analysis['web_filename']
                mapping_lines.append(f'  "{slug}": "{filename}",')
        
        if mapping_lines:
            mapping_content = f"""
// MAPPING AUTOMATICO GENERATO - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
// Aggiungi queste righe a PRODUCT_IMAGE_MAP in client/src/lib/imageUtils.ts

{chr(10).join(mapping_lines)}
"""
            
            mapping_file = self.output_folder / "frontend_mapping.ts"
            with open(mapping_file, 'w', encoding='utf-8') as f:
                f.write(mapping_content)
            
            print(f"🔗 Mapping frontend generato: {mapping_file}")
    
    def _print_summary(self, results: Dict):
        """Stampa il riepilogo finale"""
        print("\n" + "=" * 50)
        print("📊 RIEPILOGO ELABORAZIONE")
        print("=" * 50)
        print(f"🔢 Immagini totali: {results['total_images']}")
        print(f"✅ Identificate: {results['identified']}")
        print(f"❓ Da rivedere: {results['needs_review']}")
        print(f"❌ Sconosciute: {results['unknown']}")
        print(f"📈 Successo: {(results['identified']/results['total_images']*100):.1f}%")
        
        if results['biggimmy_categories']:
            print(f"\n🛒 CATEGORIE BIGGIMMY:")
            for category, items in results['biggimmy_categories'].items():
                print(f"   {category}: {len(items)} prodotti")
        
        if results['needs_review'] > 0:
            print(f"\n⚠️  ATTENZIONE: {results['needs_review']} immagini richiedono revisione manuale")
    
    def generate_insertion_guide(self) -> str:
        """Genera la guida per l'inserimento prodotti"""
        guide = f"""
# 🖼️ GUIDA INSERIMENTO IMMAGINI - AGGIORNAMENTO AUTOMATICO

## Script Python per Mappatura Automatica

### Quando utilizzare lo script
- Prima di ogni sessione di inserimento prodotti
- Quando si ricevono nuove immagini da processare
- Per verificare la correttezza delle associazioni immagine-prodotto

### Come utilizzare lo script

1. **Posiziona le immagini** nella cartella `attached_assets` o specifica un percorso personalizzato
2. **Esegui lo script**:
   ```bash
   python image_product_mapper.py
   ```
3. **Controlla i risultati** nella cartella `product_mapping_output/`

### Output dello script

#### File generati:
- `image_mapping_YYYYMMDD_HHMMSS.json`: Analisi completa di tutte le immagini
- `frontend_mapping.ts`: Codice pronto per l'inserimento in `imageUtils.ts`

#### Informazioni per ogni immagine:
- **Codice prodotto** estratto dal nome file
- **Identificazione automatica** del prodotto nel database
- **Categoria BigGimmy** di appartenenza
- **Nome file web-friendly** suggerito
- **Slug prodotto** per URL SEO-friendly
- **Livello di confidenza** dell'identificazione

### Gestione casi speciali

#### ✅ Immagini identificate automaticamente
- Aggiungi il mapping generato a `imageUtils.ts`
- Procedi con l'inserimento seguendo il modello FruitForce

#### ❓ Immagini da rivedere
- Controlla manualmente il codice prodotto
- Verifica corrispondenza con il catalogo
- Aggiorna il database interno se necessario

#### ❌ Immagini sconosciute
- Identifica manualmente il prodotto
- Rinomina il file con il codice corretto
- Riesegui lo script per la nuova identificazione

### Modello FruitForce - Struttura da seguire

Ogni prodotto inserito deve seguire la struttura di FruitForce:

```typescript
{{
  slug: "prodotto-nome",
  name: "Nome Prodotto",
  category: "Categoria BigGimmy",
  variants: [
    {{
      name: "Variante 1",
      price: 25.99,
      originalPrice: 29.99,
      available: true
    }}
  ],
  flavors: ["Gusto 1", "Gusto 2"]
}}
```

### Checklist post-elaborazione

- [ ] Verificare mapping generato in `frontend_mapping.ts`
- [ ] Copiare le immagini in `public/images/products/`
- [ ] Aggiornare `PRODUCT_IMAGE_MAP` in `imageUtils.ts`
- [ ] Testare il caricamento immagini sul frontend
- [ ] Documentare eventuali prodotti non identificati

### Manutenzione dello script

Il database interno dello script va aggiornato quando:
- Si aggiungono nuovi brand/fornitori
- Si modificano i pattern dei codici prodotto
- Si introducono nuove categorie BigGimmy

Generato automaticamente il {datetime.now().strftime('%Y-%m-%d alle %H:%M:%S')}
"""
        return guide

def main():
    """Funzione principale"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Mappatura automatica immagini-prodotti')
    parser.add_argument('--folder', '-f', help='Cartella contenente le immagini')
    parser.add_argument('--guide', '-g', action='store_true', help='Genera solo la guida')
    
    args = parser.parse_args()
    
    mapper = ProductImageMapper()
    
    if args.guide:
        guide = mapper.generate_insertion_guide()
        with open('product_mapping_output/insertion_guide.md', 'w', encoding='utf-8') as f:
            f.write(guide)
        print("📖 Guida generata: product_mapping_output/insertion_guide.md")
    else:
        results = mapper.process_images(args.folder)
        
        if results:
            print(f"\n🎯 Elaborazione completata!")
            print(f"📁 Controlla i risultati in: product_mapping_output/")
            print(f"🔗 Mapping frontend: product_mapping_output/frontend_mapping.ts")

if __name__ == "__main__":
    main()
