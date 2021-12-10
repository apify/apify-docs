/* eslint-disable no-console */

const fs = require('fs');

const { readdir, stat } = fs.promises;
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

        const files = await readdir(dirPath);

        // Find directories in current directory and convert their images to webp
        for (const file of files) {
            const isDirectory = await (await stat(`${path.join(path.resolve(path.dirname('')), dirPath)}/${file}`)).isDirectory();

            isDirectory && await convertImagesToWebp(`${dirPath}/${file}`);
        }
    }

    (async function () {
        try {
            console.log('Webp conversion START');
            // Start converting from the Docs folder
            await convertImagesToWebp('docs');
            console.log('Webp conversion DONE');
        } catch (err) {
            console.error(err, 'Error during conversion of images to webp format.');
            process.exit(1);
        }
    }());
})();
