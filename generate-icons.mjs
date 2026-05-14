import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');
const iconSizes = [16, 32, 48, 72, 96, 128, 144, 152, 180, 192, 256, 384, 512];
const svgPath = path.join(publicDir, 'cslogo.svg');

console.log('Generating PWA icons from cslogo.svg...');

for (const size of iconSizes) {
  const outputPath = path.join(publicDir, `icon-${size}x${size}.png`);
  sharp(svgPath)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(outputPath)
    .then(() => {
      console.log(`✓ Generated ${size}x${size} icon`);
    })
    .catch(err => {
      console.error(`✗ Failed to generate ${size}x${size} icon:`, err.message);
    });
}

console.log('Icon generation queued. Icons will be generated in parallel.');
