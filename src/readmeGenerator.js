const fs = require("fs");

const commandsFolder = fs.readdirSync("./Commands");

fs.appendFile(
    "../README.md",
    `# La Solitude Discord Bot\n\nDepuis la disparition de Rythm et de Groovy,\nj'ai décidé de créer mon propre bot discord afin de répondre au besoin du serveur mon serveur.\n\n## Author\n\n-   [@Ayrox](https://github.com/Ayrox)\n\n## Contributors\n\n-   [@Syns369](https://github.com/Syns369)\n-   [@MightyPotatoast](https://github.com/MightyPotatoast)\n\n## Commands\n`,
    function (err) {
        if (err) {
            console.log(`${folder} failed to be added to the README.md`);
        } else {
            console.log(`ajout du titre ${folder}`);
        }
    }
);

for (folder of commandsFolder) {
    const commandFiles = fs
        .readdirSync(`./Commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
    fs.appendFile("../README.md", `\n## ${folder}\n`, function (err) {
        if (err) {
            console.log(`${folder} failed to be added to the README.md`);
        } else {
            console.log(`ajout du titre ${folder}`);
        }
    });
    for (file of commandFiles) {
        const command = require(`./Commands/${folder}/${file}`);
        console.info(command);
        // fs.appendFile(
        //     "README.md",
        //     `\n | name | Description | \n | :------ | :------ | \n | \`${command.data.name}\` | \`${command.data.description}\` |`,
        //     function (err) {
        //         if (err) {
        //             // append failed
        //         } else {
        //             console.log(`ajout de la commande ${command.data.name}`);
        //         }
        //     }
        // );
    }
}
