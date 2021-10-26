const   { Perms } = require("../util/Permissions"),
        { Client } = require("discord.js"),
        { promisify } = require("util"),
        { glob } = require("glob"),
        PG = promisify(glob),
        Ascii = require("ascii-table"),
        config = require("../config")


module.exports = async (client) => {

    const Table = new Ascii("Buttons Loaded");
    ButtonsArray = [];

    (await PG(`${process.cwd()}/src/Buttons/*/*.js`)).map(async (file) => {
        const button = require(file);
        
        if (!button.name)
            return Table.addRow(file.split("/")[7], "🔴 FAILED", "Missing a name.");
        
        if (button.type !== "USER" && !button.description)
            return Table.addRow(button.name, "🔴 FAILED", "Missing a description.");

        if (!button.permission) {
            if (Perms.includes(button.permission))
                button.defaultPermission = false;
            else
                return Table.addRow(button.name, "🔴 FAILED", "Permission is invalid.");
        }

        if (!button.active)
            return Table.addRow(button.name, "⚠️  DESACTIVATED");
        
        client.buttons.set(button.name, button);
        ButtonsArray.push(button);

    await Table.addRow(button.name, "🟢 SUCCESSFUL");
    });

    console.log(Table.toString());

}