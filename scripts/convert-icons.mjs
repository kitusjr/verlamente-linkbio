import sharp from 'sharp';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');

async function convertSvgToPng(inputFile, outputFile, size) {
  const svgBuffer = readFileSync(join(publicDir, inputFile));
  
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(join(publicDir, outputFile));
    
  console.log(`Converted ${inputFile} to ${outputFile}`);
}

// Convertir todos los iconos
async function convertAll() {
  await convertSvgToPng('favicon.svg', 'favicon.png', 32);
  await convertSvgToPng('favicon.svg', 'favicon.ico', 32);
  await convertSvgToPng('apple-touch-icon.svg', 'apple-touch-icon.png', 180);
  await convertSvgToPng('icon-192.svg', 'icon-192.png', 192);
  await convertSvgToPng('icon-512.svg', 'icon-512.png', 512);
}

convertAll().catch(console.error); 