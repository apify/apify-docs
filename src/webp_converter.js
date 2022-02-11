/* eslint-disable no-console */
const fs = require('fs');

const { readdir, stat } = fs.promises;
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const path = require('path');
const { getDirectoriesInPath } = require('./tools');
const { CONTENT_DIR_NAME } = require('./consts');

// Recursively converts all jpg and png files to webp in docs directory tree
(async () => {
    async function convertImagesToWebp(dirPath) {
        console.log(`Converting images to webp in ${dirPath}`);
        // Convert all jpg and png files in current directory to webp
        await imagemin([`${dirPath}/*.{jpg,png}`], {
            destination: dirPath,
            plugins: [
                imageminWebp({ quality: 65 }),
            ],
        });

        const files = await readdir(dirPath);
        // Search through the files in current dir for more dirs
        // Call this function on any found dirs
        for (const file of files) {
            const isDirectory = await (await stat(`${path.join(path.resolve(path.dirname('')), dirPath)}/${file}`)).isDirectory();

            isDirectory && await convertImagesToWebp(`${dirPath}/${file}`);
        }
    }

    /**
     * Find and iterate over all the folders in the Content directory
     * and convert all the images to webp format
     */
    (async function () {
        try {
            console.log('Webp conversion START');

            // Get all the content dirs
            const contentDirs = await getDirectoriesInPath(CONTENT_DIR_NAME);

            // Call the conversion function for each content dir found
            // It will recursively scan all the files in the given directory and convert them
            contentDirs.map(async (dir) => {
                await convertImagesToWebp(dir);
            });
        } catch (err) {
            console.error(err, 'Error during conversion of images to webp format.');
            process.exit(1);
        }
    }());
})();
