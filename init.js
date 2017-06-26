
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var chalk = require('chalk');
var npm = require('npm');
var ansi = require('ansi');
var cursor = ansi(process.stdout);

var unzipBrazos = () => {
    return new Promise(function(resolve, reject) {
        // console.log(chalk.yellow("\n(　＾∇＾)") + chalk.blue("\t\tMoving in "))
        var unzip = spawn("unzip", ["brazos.zip"]);
        var dots = "";
        var wizard = 0;
        unzip.stdout.on('data', (data) => {
            process.stdout.clearLine()
            process.stdout.cursorTo(0)
            process.stdout.write(doingMagic(wizard) + chalk.blue("\tMoving in - Download and Unpacking Brazos "))
            // process.stdout.write(chalk.blue(dots)+chalk.red("."));
            if (wizard == 4) {
                wizard = 0;
            } else {
                wizard++;
            }
            dots += ".";
            //console.log(chalk.blue(data.toString()));
        })
        unzip.stderr.on('data', (data) => {
            console.log(chalk.red("\n\n(╯°□°）╯︵ ┻━┻"));
            console.log(chalk.red(data));
            console.log(chalk.red("\t\tლ(ಠ_ಠლ)"));
        })
        unzip.on("close", function(code) {
            process.stdout.clearLine()
            process.stdout.cursorTo(0)
            process.stdout.write(chalk.green("\n(　＾∇＾)") + chalk.blue("\tMoved in \n\n"));
            var removeZip = exec("rm brazos.zip");
            removeZip.on("close", (code) => {
                resolve(code)
            })
        })
    })
}

var updateBrazos = (projectName) => {
    return new Promise(function(resolve, reject) {
        cursor.hide();
        // console.log(chalk.yellow("\n\n(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧") + chalk.blue("\t\tDoing fung shui "))
        fs.rename('./Brazos-0.1.2-alpha', "./" + projectName, (err) => {
            var updateProject = exec("(cd " + projectName + " && react-native-rename " + projectName + ")");
            var dots = "";
            var wizard = 0;
            updateProject.stdout.on('data', (data) => {
                process.stdout.clearLine()
                process.stdout.cursorTo(0)
                // process.stdout.write(chalk.blue(dots)+chalk.red("."));
                process.stdout.write(chalk.yellow(doingMagic(wizard)) + chalk.blue("\tDoing Fung Shui - Setting Up Project"))
                if (wizard == 4) {
                    wizard = 0;
                } else {
                    wizard++;
                }
                dots += ".";
                //console.log(chalk.blue(data.toString()));
            })
            updateProject.stderr.on('data', (data) => {
                process.stdout.clearLine()
                process.stdout.cursorTo(0)
                console.log(chalk.red("\n\nn(」ﾟﾛﾟ)｣"));
                console.log(chalk.red(data));
                console.log(chalk.red("\t\tლ(ಠ_ಠლ)"));
                reject("Error expanding")
            })
            updateProject.on("close", (code) => {
                process.stdout.clearLine()
                process.stdout.cursorTo(0)
            process.stdout.write(chalk.green("(　＾∇＾)") + chalk.blue("\tFung Shui'd "));
                var removeZip = exec("rm brazos.zip");
                removeZip.on("close", (code) => {
                    console.log(chalk.green.bold("\n\n(•̀ᴗ•́)و ̑̑") + chalk.blue("\t\tBrazos project " + chalk.green(projectName) + chalk.blue(" has been created.\n\n " )))
                    cursor.show();
                    resolve(code)
                })
            })
        })
    })
}

var npmInstall = (projectName) => {
    return new Promise((resolve, reject) => {
        cursor.hide()
        console.log(chalk.yellow("(☞ﾟヮﾟ)☞") + chalk.blue("\t\tDownloading the internet\n"))
        var magicStage = 0;
        var spinnerFrame = 0;
        var npmExec;
        try {
            npmExec = exec("(cd " + projectName + " && npm install)");
        } catch (e) {
            console.log(chalk.yellow("༼ つ ◕_◕ ༽つ"))
            console.log(chalk.red(e))
        }
        var waiting = setInterval(()=> {
            process.stdout.clearLine()
            process.stdout.cursorTo(0)
            process.stdout.write(chalk.yellow(doingMagic(magicStage)) + chalk.blue('\tInstalling packages. This will take a minute.') + chalk.green(spinning(spinnerFrame)));
            if (magicStage == 4) {
                magicStage = 0;
            } else {
                magicStage++;
            }
            if (spinnerFrame == 9) {
                spinnerFrame = 0;
            } else {
                spinnerFrame++;
            }
        }, 250);
        npmExec.stdout.on('data', (data) => {
        })
        npmExec.stderr.on('data', (data) => {
            //console.log(chalk.red(data))
        })
        npmExec.on('close', ()=> {
            clearInterval(waiting)
            cursor.show();
            process.stdout.clearLine()
            process.stdout.cursorTo(0)
            console.log(chalk.green.bold("(•̀ᴗ•́)و ̑̑") + chalk.blue("\t The internet has been downloaded.\n"))
        })
    })
}

var doingMagic = (num) => {
    var magic = [
        "(∩｀-´)⊃━☆ﾟ.*･｡ﾟ",
        "(∩｀-´)⊃━☆ﾟﾟ.*･｡",
        "(∩｀-´)⊃━☆ﾟ｡ﾟ.*･",
        "(∩｀-´)⊃━☆ﾟ･｡ﾟ.*",
        "(∩｀-´)⊃━☆ﾟ*･｡ﾟ."
    ]
    if (num > 4 || num < 0) {
        num = 0
    }
    return magic[num];
}

var spinning = (num) => {
    var spinner = [
        "⠋",
        "⠙",
        "⠚",
        "⠞",
        "⠖",
        "⠦",
        "⠴",
        "⠲",
        "⠳",
        "⠓"
    ]
    if (num > 9 || num < 0) {
        num = 0;
    }
    return spinner[num];
}

module.exports.unzipBrazos = unzipBrazos;
module.exports.updateBrazos = updateBrazos;
module.exports.npmInstall = npmInstall;