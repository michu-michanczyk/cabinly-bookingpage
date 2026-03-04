import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, basename } from 'path';
import { existsSync } from 'fs';

const SOURCE_DIR = '/Users/michal/Documents/Domek/domek zdjecia ogloszenie';
const OUTPUT_DIR = './public/images';
const MAX_WIDTH = 1920;
const QUALITY = 85;

async function compressImages() {
  try {
    // Ensure output directory exists
    if (!existsSync(OUTPUT_DIR)) {
      await mkdir(OUTPUT_DIR, { recursive: true });
    }

    // Read all files from source directory
    const files = await readdir(SOURCE_DIR);

    // Filter for image files
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png)$/i.test(file) && !file.startsWith('.')
    );

    console.log(`Found ${imageFiles.length} images to compress...`);

    // Process each image
    for (const file of imageFiles) {
      const inputPath = join(SOURCE_DIR, file);
      const outputPath = join(OUTPUT_DIR, basename(file, '.jpg') + '.webp');

      try {
        await sharp(inputPath)
          .resize(MAX_WIDTH, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: QUALITY })
          .toFile(outputPath);

        console.log(`✓ Compressed: ${file} → ${basename(outputPath)}`);
      } catch (err) {
        console.error(`✗ Failed to compress ${file}:`, err.message);
      }
    }

    console.log('\n✅ Image compression complete!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

compressImages();
