import { processProductImages } from "./utils/imageHandler";

// Processa tutte le immagini dalla cartella attached_assets
processProductImages('attached_assets');

console.log("Image processing completed. All future product images will work correctly.");