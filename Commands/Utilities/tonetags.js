const { MessageEmbed } = require("discord.js"),
    Command = require("../../Structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'tonetags',
            category: "Utilities",

        });
    }

    async run(message) {

        const e = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`[tone tags](https://tonetags.carrd.co/)`)
        message.channel.send(e)
    }
};