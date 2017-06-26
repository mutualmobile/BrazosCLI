#!/usr/bin/env node --harmony

/*
*
*    Brazos CLI
*
*       This is very rough and needs to be cleaned up.
*
*           ..like a lot.
*
*/

var program = require('commander');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var request = require('request');
var progressBar = require('progress');
var chalk = require('chalk');
var ora = require('ora');
var brazos = "https://github.com/mutualmobile/Brazos/archive/0.1.2-alpha.zip";
var ansi = require('ansi');
var cursor = ansi(process.stdout);

var blueprint = require('./blueprint');
var init = require('./init');
var brazosHelpers = require('./brazosHelpers');

console.log(chalk.red('¯\\_(ツ)_/¯ This is an alpha version of Brazos CLI. Except the unexpected. ¯\\_(ツ)_/¯'))

program.version('1.0.0')
    // .option('-i, --init [project_name]', "init new Brazos project")
    // .option('-bp, --blueprint [component_name]', "create a new component")
    // .option('-cd, --changedir', "Change to new project directory.")

program
    .command('init <project_name>')
    .description('Setup a new (ﾉ◕ヮ◕)ﾉ*Brazos・ﾟ✧ project.')
    .option('-i, --install', 'Automatically run npm install after setup.')
    .action((env, options) => {
        cursor.hide();
        var npmInstall = options.install || false;
        process.stdout.write(chalk.blue('Setting up project with (ﾉ◕ヮ◕)ﾉ*'+chalk.white("Brazos")+'・ﾟ✧ 0.1.1-alpha'));
        if (program.changedir) {
            console.log(chalk.green("change into project directory"))
        }
        var projectName = program.args[0];
        if (fs.existsSync("./" + projectName)) {
            brazosHelpers.memeError("A directory by that name already exists!");
        } else {
            request(brazos)
            .pipe(fs.createWriteStream('brazos.zip'))
            .on('data', function(data) {
                process.stdout.write(chalk.blue('.'));
            })
            .on('close', function () {
                console.log("\n")
                init.unzipBrazos().then(function(res) {
                    //console.log(res);
                    init.updateBrazos(projectName).then(function(ress) {
                        //console.log(ress)
                        if (npmInstall) {
                            init.npmInstall(projectName).then(function(resss) {
                                //console.log(resss)
                                cursor.show();
                            })
                        } else {
                            cursor.show();
                        }
                    })
                })
            });
        }
    })

program
    .command('blueprint <component_name>')
    .description('Create a new component, defaults to multiplatform with Ext structure.')
    .option('-b, --basic', 'Add a basic component.')
    .option('-w, --web', 'Add a web only component. Use with basic and subcomponents only.')
    .option('-n, --native', 'Add a native only component. Use with basic and subcomponents only.')
    .option('-s, --sub', 'Create a sub-component.')
    .action((env, options) => {
        cursor.hide()
        var className = program.args[0];
        var basic = options.basic || false;
        var web = options.web || false;
        var native = options.native || false;
        var sub = options.sub || false;
        var platform;
        if (web && native) {
            platform = "both"
        } else if (web) {
            platform = "web"
        } else if (native) {
            platform = "native"
        }
        if ((web && native) && basic) {
            brazosHelpers.memeError("Only use a single platform with basic components.")
        }
        if (basic) {
            blueprint.createBasicComponent(className, platform).then((res) => {
                if (res != "success") {
                    brazosHelpers.memeError(["This doesn't appear to be a Brazos project!","Please ensure your package.json has \"brazos\": true"])
                }
                cursor.show();                
            })
        } else if (sub) {
            blueprint.createSubComponent(className, platform).then(() => {
                if (res != "success") {
                    brazosHelpers.memeError(["This doesn't appear to be a Brazos project!","Please ensure your package.json has \"brazos\": true"])
                }
                cursor.show();
            })
        } else {
            blueprint.createComponent(className).then((res)=>{
                if (res != "success") {
                    brazosHelpers.memeError(["This doesn't appear to be a Brazos project!","Please ensure your package.json has \"brazos\": true"])
                }
                cursor.show();
            });  
        }     
    })

program.parse(process.argv);
