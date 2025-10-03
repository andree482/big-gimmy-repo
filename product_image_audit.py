#!/usr/bin/env python3
"""
AUDIT SISTEMA IMMAGINI E GUSTI - FASE 1.1
Identifica prodotti con problemi di mappatura immagini/gusti
per correzioni sistematiche secondo piano strutturato
"""

import os
import json
import re
from pathlib import Path

class ProductImageAuditor:
    def __init__(self):
        self.attached_assets = Path("attached_assets")
        self.public_images = Path("public/images/products")
        self.image_map_file = Path("client/src/lib/imageUtils.ts")
        
    def get_all_attached_images(self):
        """Ottieni tutte le immagini disponibili in attached_assets"""
        images = []
        for ext in ['*.jpg', '*.jpeg', '*.png']:
            images.extend(self.attached_assets.glob(ext))
        return [img.name for img in images]
    
    def get_mapped_images(self):
        """Estrai immagini mappate da imageUtils.ts"""
        if not self.image_map_file.exists():
            return {}
            
        content = self.image_map_file.read_text()
        # Estrai le mappature dal file TypeScript
        pattern = r'"([^"]+)":\s*"([^"]+)"'
        matches = re.findall(pattern, content)
        return dict(matches)
    
    def get_synced_images(self):
        """Ottieni immagini sincronizzate in public/images/products"""
        if not self.public_images.exists():
            return []
            
        images = []
        for ext in ['*.jpg', '*.jpeg', '*.png']:
            images.extend(self.public_images.glob(ext))
        return [img.name for img in images]
    
    def analyze_image_mapping_issues(self):
        """Identifica problemi di mappatura immagini"""
        attached = set(self.get_all_attached_images())
        mapped = self.get_mapped_images()
        synced = set(self.get_synced_images())
        
        issues = {
            'missing_images': [],
            'unmapped_products': [],
            'unsynced_mapped': [],
            'placeholder_images': [],
            'duplicate_mappings': {}
        }
        
        # Trova immagini mappate ma non esistenti
        for product_slug, image_name in mapped.items():
            if image_name not in attached:
                issues['missing_images'].append({
                    'product': product_slug,
                    'missing_image': image_name
                })
        
        # Trova immagini mappate ma non sincronizzate
        for product_slug, image_name in mapped.items():
            if image_name not in synced and image_name in attached:
                issues['unsynced_mapped'].append({
                    'product': product_slug,
                    'image': image_name
                })
        
        # Trova placeholder images
        for product_slug, image_name in mapped.items():
            if 'placeholder' in image_name.lower():
                issues['placeholder_images'].append({
                    'product': product_slug,
                    'placeholder': image_name
                })
        
        # Trova duplicati
        image_usage = {}
        for product_slug, image_name in mapped.items():
            if image_name not in image_usage:
                image_usage[image_name] = []
            image_usage[image_name].append(product_slug)
        
        for image_name, products in image_usage.items():
            if len(products) > 1:
                issues['duplicate_mappings'][image_name] = products
        
        return issues
    
    def suggest_image_matches(self, product_slug):
        """Suggerisci immagini compatibili per un prodotto"""
        attached = self.get_all_attached_images()
        
        # Estrai parole chiave dal slug prodotto
        keywords = re.split(r'[-_\s]+', product_slug.lower())
        keywords = [k for k in keywords if len(k) > 2]  # Filtro parole troppo corte
        
        suggestions = []
        for image in attached:
            image_lower = image.lower()
            matches = 0
            for keyword in keywords:
                if keyword in image_lower:
                    matches += 1
            
            if matches > 0:
                suggestions.append({
                    'image': image,
                    'relevance': matches,
                    'keywords_matched': [k for k in keywords if k in image_lower]
                })
        
        # Ordina per rilevanza
        suggestions.sort(key=lambda x: x['relevance'], reverse=True)
        return suggestions[:5]  # Top 5 suggerimenti
    
    def generate_correction_report(self):
        """Genera report completo per correzioni Fase 1.1"""
        issues = self.analyze_image_mapping_issues()
        
        report = {
            'summary': {
                'total_attached': len(self.get_all_attached_images()),
                'total_mapped': len(self.get_mapped_images()),
                'total_synced': len(self.get_synced_images()),
                'issues_found': sum(len(v) if isinstance(v, list) else len(v) for v in issues.values())
            },
            'issues': issues,
            'recommendations': []
        }
        
        # Genera raccomandazioni specifiche
        if issues['missing_images']:
            for item in issues['missing_images'][:5]:  # Top 5
                suggestions = self.suggest_image_matches(item['product'])
                report['recommendations'].append({
                    'type': 'replace_missing',
                    'product': item['product'],
                    'current_image': item['missing_image'],
                    'suggested_images': suggestions
                })
        
        if issues['placeholder_images']:
            for item in issues['placeholder_images'][:5]:  # Top 5
                suggestions = self.suggest_image_matches(item['product'])
                report['recommendations'].append({
                    'type': 'replace_placeholder',
                    'product': item['product'],
                    'placeholder': item['placeholder'],
                    'suggested_images': suggestions
                })
        
        return report
    
    def save_report(self, report):
        """Salva il report in formato JSON"""
        output_file = Path("product_image_audit_report.json")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Report salvato in: {output_file}")
        return output_file

def main():
    """Esegui audit completo per Fase 1.1"""
    print("🔧 FASE 1.1 - Audit Sistema Immagini e Gusti")
    print("=" * 50)
    
    auditor = ProductImageAuditor()
    report = auditor.generate_correction_report()
    
    # Stampa riepilogo
    summary = report['summary']
    print(f"📊 RIEPILOGO:")
    print(f"   • Immagini disponibili: {summary['total_attached']}")
    print(f"   • Prodotti mappati: {summary['total_mapped']}")
    print(f"   • Immagini sincronizzate: {summary['total_synced']}")
    print(f"   • Problemi identificati: {summary['issues_found']}")
    
    # Stampa problemi principali
    issues = report['issues']
    if issues['missing_images']:
        print(f"\n❌ IMMAGINI MANCANTI: {len(issues['missing_images'])}")
        for item in issues['missing_images'][:3]:
            print(f"   • {item['product']} → {item['missing_image']}")
    
    if issues['placeholder_images']:
        print(f"\n🔄 PLACEHOLDER DA SOSTITUIRE: {len(issues['placeholder_images'])}")
        for item in issues['placeholder_images'][:3]:
            print(f"   • {item['product']} → {item['placeholder']}")
    
    if issues['unsynced_mapped']:
        print(f"\n📁 DA SINCRONIZZARE: {len(issues['unsynced_mapped'])}")
        for item in issues['unsynced_mapped'][:3]:
            print(f"   • {item['product']} → {item['image']}")
    
    # Salva report dettagliato
    report_file = auditor.save_report(report)
    
    print(f"\n📋 Report completo disponibile in: {report_file.name}")
    print("🎯 Pronto per correzioni sistematiche Fase 1.1")

if __name__ == "__main__":
    main()