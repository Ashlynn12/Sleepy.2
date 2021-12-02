const Command = require("../../Structures/Command"),
    { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "suggest",
            category: "Utilities",
        });
    }
    async run(message, args) {
        const msg = message,
            neededChannel = "893983546325205003",
            channel = this.client.channels.cache.get(neededChannel);

        if (!neededChannel || !channel) {
            return;
        }

        if (!args[0]) {
            return message.channel.send("You need to enter a Suggestion");
        }

        message.channel.send([
            `Thank you ${message.author.username} for giving your suggestion`
        ]);

        const embed = new MessageEmbed()
            .setTitle(`New Suggestion`)
            .setColor("RANDOM")
            .setThumbnail(msg.author.avatarURL({ dynamic: true }))
            .setTimestamp()
            .addField(`User Information`, [
                `Username: ${message.author.tag}`,
                `ID: ${message.author.id}`
            ])
            .addField(`Suggestion:`, [
                `${args.join(" ")}`
            ])
            .setTimestamp();

        channel.send(embed);

    }
};
