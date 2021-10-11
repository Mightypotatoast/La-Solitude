const   { Events } = require("../util/EventNames"),
        { promisify } = require("util"),
        { glob } = require("glob"),
        PG = promisify(glob),
        Ascii = require("ascii-table")

module.exports = async (client) => {

    const Table = new Ascii("Event Loaded");

    (await PG(`${process.cwd()}/src/Events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if (!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            await Table.addRow(`${event.name || "MISSING"}`, `⛔ Event name is invalid or missing : ${L[6] + '/' + L[7]}`);
            return;
        }

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }

        await Table.addRow(event.name, "✔️   SUCCESSFUL");
    });

    console.log(Table.toString());
}