// take input file list or dir
// take input for output dir
// 
'use strict';

const fs = require('fs');
const rimraf = require('rimraf');
const utils = require('./utils');
const args = require('minimist')(process.argv.slice(2));
const fileInputPath = args.i;
const fileOutputPath = args.o;``

// TODO: check for legit input and error handling
fs.readFile(fileInputPath, 'utf8', (err, contents) => {
    if (!err) {
        const hash = utils.randomHash();
        contents = contents.replace(utils.getRegexFromArray(args._, 'g'), x => {
            const [file, extension] = x.split('.');
            return `${file}-${hash}.${extension}`;
        });
        // write out files
        rimraf(fileOutputPath, (err) => {
            fs.mkdir(fileOutputPath, (err) => {
                if (err) {

                } else {
                    fs.writeFile(`${fileOutputPath}/index.html`, contents, (err) => {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                    });
                }
            });
        });


    }
});