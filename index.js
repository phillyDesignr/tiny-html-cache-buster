#!/usr/bin/env node

// take input file list or dir
// take input for output dir
// 
'use strict';

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const utils = require('./lib/utils');
const args = require('minimist')(process.argv.slice(2));
const cpy = require('cpy');
const inputPath = path.dirname(args.i);
const inputFile = path.basename(args.i);
const outputPath = args.o;

// TODO: check for legit input and error handling
fs.readFile(path.join(inputPath, inputFile), 'utf8', (err, contents) => {
    if (err) {
        return console.log(err);
    }
    const hash = utils.randomHash();
    contents = contents.replace(utils.getRegexFromArray(args._, 'g'), x => {
        const [file, extension] = x.split('.');
        return `${hash}-${file}.${extension}`;
    });
    // write out files
    rimraf(outputPath, (err) => {
        fs.mkdir(outputPath, (err) => {
            if (err) {
                return console.log(err);
            } else {
                fs.writeFile(`${outputPath}/index.html`, contents, (err) => {
                    if (err) {
                        return console.log(err);
                    }
                    cpy(args._.map(el => path.join(inputPath, el)), outputPath, {
                        rename: basename => `${hash}-${basename}`
                    })
                        .on('progress', progress => {
                            console.log(progress);
                        })
                        .then(r => console.log("The file was saved!"));
                });
            }
        });
    });
});