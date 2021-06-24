/* eslint-disable no-console */

const fs = require('fs');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const path = require('path');


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

        const files = fs.readdirSync(dirPath);

        // Find directories in current directory and convert their images to webp
        await Promise.all(files.filter(file => fs.statSync(`${path.join(path.resolve(path.dirname('')), dirPath)}/${file}`).isDirectory())
            .map(async directory => convertImagesToWebp(`${dirPath}/${directory}`)));
    }
    console.log('Webp conversion START');
    // Start converting from docs folder
    await convertImagesToWebp('docs');
    console.log('Webp conversion DONE');
})();
