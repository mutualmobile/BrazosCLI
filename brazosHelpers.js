var chalk = require('chalk');

const memeError = (error) => {
    if (typeof error == "array") {
        console.log(chalk.red("\n\n(╯°□°）╯︵ ┻━┻"));
        for(var i = 0, len = error.length; i < len; i++) {
            console.log(chalk.red(error[i]));
        }
        console.log(chalk.red("\t\tლ(ಠ_ಠლ)\n\n"));
    } else {
        console.log(chalk.red("\n\n(╯°□°）╯︵ ┻━┻"));
        console.log(chalk.red(error));
        console.log(chalk.red("\t\tლ(ಠ_ಠლ)\n\n"));
    }
}

module.exports.memeError = memeError;