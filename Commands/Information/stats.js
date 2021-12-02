const Command = require("../../Structures/Command"),
    CrimsonEmbed = require("../../Structures/CrimsonEmbed");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "stats",
            category: "Information",
        });
    }
    async run(message) {
        const msg = message,
            client = this.client

        const e = new CrimsonEmbed()
            .setThumbnail(`${client.user.displayAvatarURL()}`)
            .setTitle(`${client.user.username}\'s Global Stats`)
            .setColor("RANDOM")
            .addField(`Guilds`, [
                `\`${client.guilds.cache.size.toLocaleString()}\``
            ])

            .addField(`Members`, [
                `\`${client.users.cache.size.toLocaleString()}\``
            ])
        msg.channel.send(e)
    }
};