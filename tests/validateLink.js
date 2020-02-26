module.exports = validateLinks = () => {
    const validateLinks = (links, names) => {
        let promises = [];
        for (let i = 0; i < links.length; i++) {
            promises.push(
                fetch(links[i]).then(res => {
                    if (res.status >= 400) {
                        notOkLinksCount++;
                        notOkLinks.push(inputPath + links[i] + ' FAIL : ' + res.status + ' ' + 'Name:' + ' ' + names[i]);

                    } else {
                        okLinks.push(links[i] + ' OK : ' + res.status + ' ' + 'Name:' + ' ' + names[i]);
                        okLinksCount++;
                    }
                }).catch((error) => {
                    notOkLinksCount++;
                    notOkLinks.push(links[i] + ' FAIL: FETCH LINK' + ' ' + 'Name:' + ' ' + names[i]);
                }));
        }
        Promise.all(promises).then(() => {

            if (inputOptions.includes('--validate' && '--stats')) {
                console.group('Stats');
                console.log(chalk.magenta('Total: ' + links.length));
                console.log(chalk.cyan('Unique: ' + links.length));
                console.log(chalk.green('Ok: ' + okLinksCount))
                console.log(chalk.red('Broken: ' + notOkLinksCount));
                console.groupEnd('Stats');
            } else if (inputOptions.includes('--validate')) {
                console.group('Broken Links');
                console.table(notOkLinks);
                console.groupEnd('Broken Links');
                console.group('Valid Links');
                console.table(okLinks);
                console.groupEnd('Valid Links');
            } else if (inputOptions.includes('--stats')) {
                console.group('Stats');
                console.log(chalk.magenta('Total: ' + links.length));
                console.log(chalk.cyan('Unique: ' + links.length));
                console.groupEnd('Stats');
            } else {
                console.log(chalk.cyanBright(okLinks + '\n' + notOkLinks));
            }

        });
    }
};