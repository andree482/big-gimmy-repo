
/**
 * Sistema di sincronizzazione automatica immagini
 * Da attached_assets a public/images/products
 */
import { promises as fs } from 'fs';
import path from 'path';

const ATTACHED_ASSETS_PATH = path.join(process.cwd(), 'attached_assets');
const PUBLIC_IMAGES_PATH = path.join(process.cwd(), 'public/images/products');

/**
 * Copia tutte le immagini da attached_assets a public/images/products
 */
export async function syncAllImages() {
  console.log('🔄 Avvio sincronizzazione immagini...');
  
  try {
    // Assicurati che la cartella di destinazione esista
    await fs.mkdir(PUBLIC_IMAGES_PATH, { recursive: true });
    
    // Leggi tutti i file da attached_assets
    const files = await fs.readdir(ATTACHED_ASSETS_PATH);
    
    // Filtra solo le immagini
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp|svg)$/i.test(file)
    );
    
    console.log(`📸 Trovate ${imageFiles.length} immagini da sincronizzare`);
    
    let copied = 0;
    let skipped = 0;
    
    for (const file of imageFiles) {
      const sourcePath = path.join(ATTACHED_ASSETS_PATH, file);
      const destPath = path.join(PUBLIC_IMAGES_PATH, file);
      
      try {
        // Controlla se il file esiste già
        await fs.access(destPath);
        skipped++;
        console.log(`⏭️  ${file} (già presente)`);
      } catch {
        // Il file non esiste, copialo
        await fs.copyFile(sourcePath, destPath);
        copied++;
        console.log(`✅ ${file}`);
      }
    }
    
    console.log(`\n🎉 Sincronizzazione completata!`);
    console.log(`   📸 ${copied} immagini copiate`);
    console.log(`   ⏭️  ${skipped} immagini già presenti`);
    console.log(`   📁 Tutte le immagini ora disponibili in: ${PUBLIC_IMAGES_PATH}`);
    
    return { copied, skipped, total: imageFiles.length };
    
  } catch (error) {
    console.error('❌ Errore durante la sincronizzazione:', error);
    throw error;
  }
}

/**
 * Copia una singola immagine
 */
export async function copyImageToProducts(fileName: string) {
  const sourcePath = path.join(ATTACHED_ASSETS_PATH, fileName);
  const destPath = path.join(PUBLIC_IMAGES_PATH, fileName);
  
  try {
    await fs.copyFile(sourcePath, destPath);
    console.log(`✅ Immagine copiata: ${fileName}`);
    return true;
  } catch (error) {
    console.error(`❌ Errore copiando ${fileName}:`, error);
    return false;
  }
}

/**
 * Monitora nuove immagini in attached_assets
 */
export async function watchForNewImages() {
  console.log('👀 Monitoraggio nuove immagini attivo...');
  
  // Implementazione semplificata - in produzione useresti fs.watch
  setInterval(async () => {
    try {
      const result = await syncAllImages();
      if (result.copied > 0) {
        console.log(`🆕 ${result.copied} nuove immagini sincronizzate!`);
      }
    } catch (error) {
      console.error('Errore nel monitoraggio:', error);
    }
  }, 30000); // Controlla ogni 30 secondi
}
