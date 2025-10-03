import fs from 'fs';
import path from 'path';

/**
 * Utility per gestire le immagini dei prodotti
 * Converte automaticamente i nomi file in formato web-friendly
 */

export function sanitizeImageName(originalName: string): string {
  return originalName
    .toLowerCase()
    .replace(/\s+/g, '-')           // Sostituisce spazi con trattini
    .replace(/[^\w\-\.]/g, '')      // Rimuove caratteri speciali
    .replace(/\-+/g, '-')           // Evita trattini multipli
    .replace(/^-|-$/g, '');         // Rimuove trattini all'inizio/fine
}

export function copyProductImage(
  sourcePath: string, 
  productSlug: string, 
  originalFileName: string
): string {
  const sanitizedName = sanitizeImageName(originalFileName);
  const destinationPath = path.join('public/images', sanitizedName);
  
  try {
    // Copia il file dall'origine alla destinazione
    fs.copyFileSync(sourcePath, destinationPath);
    console.log(`✓ Image copied: ${originalFileName} → ${sanitizedName}`);
    return sanitizedName;
  } catch (error) {
    console.error(`✗ Failed to copy image: ${originalFileName}`, error);
    return 'placeholder-product.jpg';
  }
}

export function addImageMapping(productSlug: string, imageName: string) {
  // Questa funzione aggiornerà automaticamente il mapping nel frontend
  const mappingPath = 'client/src/lib/imageMap.ts';
  
  const mappingContent = `// Auto-generated image mapping
export const productImageMap: { [key: string]: string } = {
  "${productSlug}": "${imageName}",
};`;
  
  // In futuro possiamo estendere questo per aggiornare automaticamente il file
  console.log(`✓ Image mapping: ${productSlug} → ${imageName}`);
}

/**
 * Processa tutte le immagini dei prodotti da una directory
 */
export function processProductImages(sourceDir: string): void {
  try {
    const files = fs.readdirSync(sourceDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );
    
    console.log(`Processing ${imageFiles.length} images from ${sourceDir}...`);
    
    imageFiles.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const sanitizedName = sanitizeImageName(file);
      const destinationPath = path.join('public/images', sanitizedName);
      
      fs.copyFileSync(sourcePath, destinationPath);
      console.log(`✓ ${file} → ${sanitizedName}`);
    });
    
    console.log('✓ All images processed successfully!');
  } catch (error) {
    console.error('✗ Error processing images:', error);
  }
}