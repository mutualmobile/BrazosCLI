
var p = require('preprocess');
var fs = require('fs');
var chalk = require('chalk');

var bpBase = './blueprint/';
var bpSharedExt = bpBase + 'SharedExt/';
var srcShared = './src/components/shared/';
var srcTheme = './src/components/theme/';

const createComponent = (className) => {
    console.log('Creating a new component');
    return new Promise((res, rej) => {
        var pjson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        if (pjson && pjson.brazos) {
            var srcBase = srcShared;

            var data = {
                CLASSNAME: className,
                CLASSNAME_LOWERCASE: className.toLocaleLowerCase,
            };
            var currentFile = '';

            // Create Base Component file
            currentFile = srcBase + data.CLASSNAME+'.js';
            if (!fs.existsSync(currentFile)){ 
                p.preprocessFileSync(bpBase + 'Shared.js', currentFile, data, {type: 'js'});
                console.log(chalk.yellow("(∩｀-´)⊃━☆ﾟ.*･｡ﾟ") + chalk.blue('\tCreated file: ' + currentFile));
            } else {
                console.log(chalk.blue('File already exists, skipping. ') + currentFile);
            }

            // Create Extensions folder
            var srcSharedClassExt = srcBase + data.CLASSNAME+'Ext/';
            if (!fs.existsSync(srcSharedClassExt)){ fs.mkdirSync(srcSharedClassExt); }

            // Create Extension index
            currentFile = srcSharedClassExt + 'index.js';
            if (!fs.existsSync(currentFile)){ 
                p.preprocessFileSync(bpSharedExt + 'index.js', currentFile, data, {type: 'js'});
                console.log(chalk.yellow("(∩｀-´)⊃━☆ﾟ.*･｡ﾟ") + chalk.blue('\tCreated file: ' + currentFile));
            } else {
                console.log(chalk.blue('File already exists, skipping. ') + currentFile);
            }

            // Create Extension base
            currentFile = srcSharedClassExt + data.CLASSNAME+'Ext.js';
            if (!fs.existsSync(currentFile)){ 
                p.preprocessFileSync(bpSharedExt + 'SharedExt.js', currentFile, data, {type: 'js'});
                console.log(chalk.yellow("(∩｀-´)⊃━☆ﾟ.*･｡ﾟ") + chalk.blue('\tCreated file: ' + currentFile));
            } else {
                console.log(chalk.blue('File already exists, skipping. ') + currentFile);
            }

            // Create Extension native
            currentFile = srcSharedClassExt + data.CLASSNAME+'Ext.native.js';
            if (!fs.existsSync(currentFile)){ 
                p.preprocessFileSync(bpSharedExt + 'SharedExt.native.js', currentFile, data, {type: 'js'});
                console.log(chalk.yellow("(∩｀-´)⊃━☆ﾟ.*･｡ﾟ") + chalk.blue('\tCreated file: ' + currentFile));
            } else {
                console.log(chalk.blue('File already exists, skipping. ') + currentFile);
            }
            console.log(chalk.yellow("ヽ(⌐■_■)ノ♪♬") + chalk.blue('\tBrazos begat a new component ') + chalk.green(className) + chalk.blue(".\n\n"));
            res("success")
        } else {
            rej("Not a valid brazos project")
        }
    })
}

const createBasicComponent = (className, platform) => {
    console.log('Creating a new basic component');
    return new Promise((res, rej) => {
        var pjson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        if (pjson && pjson.brazos) {
            var srcBase = srcShared;

            var data = {
                CLASSNAME: className,
                CLASSNAME_LOWERCASE: className.toLocaleLowerCase,
            };
            var currentFile = '';
            
            // Create Base Component file
            currentFile = srcBase + data.CLASSNAME+'.js';
            if (!fs.existsSync(currentFile)){ 
                var template;
                if (platform == 'native') {
                    template = bpBase + 'Native.js';
                } else {
                    template = bpBase + 'Web.js';
                }
                p.preprocessFileSync(template, currentFile, data, {type: 'js'});
                console.log(chalk.yellow("(∩｀-´)⊃━☆ﾟ.*･｡ﾟ") + chalk.blue('\tCreated file: ' + currentFile));
            } else {
                console.log(chalk.blue('File already exists, skipping. ') + currentFile);
            }
            res("success")
        } else {
            rej("Not a valid project")
        }
    })
}

const createSubComponent = (className, platform) => {
    console.log('Creating a new component');
    return new Promise((res, rej) => {
        var pjson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        if (pjson && pjson.brazos) {
            var srcBase = srcShared;

            var data = {
                CLASSNAME: className,
                CLASSNAME_LOWERCASE: className.toLocaleLowerCase,
            };
            var currentFile = '';

            // Create Base Component file
            if (platform == "web" || platform == "native") {
                var ext = (platform == "web") ? "" : ".native"; 
                currentFile = srcTheme + data.CLASSNAME+ext+'.js';
                if (!fs.existsSync(currentFile)){ 
                    p.preprocessFileSync(bpBase + 'Shared.js', currentFile, data, {type: 'js'});
                    console.log(chalk.yellow("(∩｀-´)⊃━☆ﾟ.*･｡ﾟ") + chalk.blue('\tCreated file: ' + currentFile));
                } else {
                    console.log(chalk.blue('File already exists, skipping. ') + currentFile);
                }
                res("success")
            } else if (platform == "both") {
                currentFile = srcBase + data.CLASSNAME+'.js';
                if (!fs.existsSync(currentFile)){ 
                    p.preprocessFileSync(bpBase + 'Shared.js', currentFile, data, {type: 'js'});
                    console.log(chalk.yellow("(∩｀-´)⊃━☆ﾟ.*･｡ﾟ") + chalk.blue('\tCreated file: ' + currentFile));
                } else {
                    console.log(chalk.blue('File already exists, skipping. ') + currentFile);
                }

                // Create Extensions folder
                var srcSharedClassExt = srcBase + data.CLASSNAME+'Ext/';
                if (!fs.existsSync(srcSharedClassExt)){ fs.mkdirSync(srcSharedClassExt); }

                // Create Extension index
                currentFile = srcSharedClassExt + 'index.js';
                if (!fs.existsSync(currentFile)){ 
                    p.preprocessFileSync(bpSharedExt + 'index.js', currentFile, data, {type: 'js'});
                    console.log(chalk.yellow("(∩｀-´)⊃━☆ﾟ.*･｡ﾟ") + chalk.blue('\tCreated file: ' + currentFile));
                } else {
                    console.log(chalk.blue('File already exists, skipping. ') + currentFile);
                }

                // Create Extension base
                currentFile = srcSharedClassExt + data.CLASSNAME+'Ext.js';
                if (!fs.existsSync(currentFile)){ 
                    p.preprocessFileSync(bpSharedExt + 'SharedExt.js', currentFile, data, {type: 'js'});
                    console.log(chalk.yellow("(∩｀-´)⊃━☆ﾟ.*･｡ﾟ") + chalk.blue('\tCreated file: ' + currentFile));
                } else {
                    console.log(chalk.blue('File already exists, skipping. ') + currentFile);
                }

                // Create Extension native
                currentFile = srcSharedClassExt + data.CLASSNAME+'Ext.native.js';
                if (!fs.existsSync(currentFile)){ 
                    p.preprocessFileSync(bpSharedExt + 'SharedExt.native.js', currentFile, data, {type: 'js'});
                    console.log(chalk.yellow("(∩｀-´)⊃━☆ﾟ.*･｡ﾟ") + chalk.blue('\tCreated file: ' + currentFile));
                } else {
                    console.log(chalk.blue('File already exists, skipping. ') + currentFile);
                }
                console.log(chalk.yellow("ヽ(⌐■_■)ノ♪♬") + chalk.blue('\tBrazos begat a new component ') + chalk.green(className) + chalk.blue(".\n\n"));
                res("success")
            }
        } else {
            rej("Not a brazos project")
        }
    })
}

module.exports.createComponent = createComponent;
module.exports.createBasicComponent = createBasicComponent;
module.exports.createSubComponent = createSubComponent;