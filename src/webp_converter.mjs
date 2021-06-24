/* eslint-disable no-console */

import { statSync, readdirSync } from 'fs';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import path from 'path';


// Recursively converts all jpg and png files to webp in docs directory tree
(async () => {
    async function convertImagesToWebp(dirPath) {
        // Converts all jpg and png files in current directory to webp
        await imagemin([`${dirPath}/*.{jpg,png}`], {
            destination: dirPath,
            plugins: [
                imageminWebp({ quality: 65 }),
            ],
        });

        const files = readdirSync(dirPath);

        // Find directories in current directory and convert their images to webp
        await Promise.all(files.filter(file => statSync(`${path.join(path.resolve(path.dirname('')), dirPath)}/${file}`).isDirectory())
            .map(async directory => convertImagesToWebp(`${dirPath}/${directory}`)));
    }
    console.log('Webp conversion START');
    // Start converting from docs folder
    await convertImagesToWebp('docs');
    console.log('Webp conversion DONE');
})();
