const Command = require("../../Structures/Command"),
    MessageEmbed = require("../../Structures/CrimsonEmbed"),
    moment = require("moment");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'verify',
            category: "Utilities",
            ongoing: true
        });
    }

    async run(message) {
        const msg = message,
            client = this.client

        if (message.channel.id != '914935611390034011') {
            return message.channel.send(`It seems like you have already been verifed ${message.author.tag}`)
        }

        const channel = '915027871301525585'

        msg.delete()

        this.client.logger.warn(`${message.author.tag} | ${message.author.id} has ran the verify command in channel ${message.channel.name}`)

        const e = new MessageEmbed()
            .setColor("RANDOM")
            .addField(`Hello ${msg.author.tag} please verify below`, [
                `.    /) /) (\ (\ ⁣    
                    (˝˃͈ ᴗ^)•̤ ᵕ •̤˵) ⁣   ⁣
                  c/⌒ づ⊂⌒ ヽo
                  ————————
                  ➜ Where did you find this server?
                  
                  ➜ Do you know what Systems are?/are you a system?  If not here's a brief description! — systems are someone with d.i.d or osdd, it comes from severe trauma 
                  
                  ➜ What type of system are you? (If you are a system)
                  
                  ➜ Are you nsfw, or SFW? 
                  
                  ➜ How old is your account? If it's 1 week old you can stay, if not please leave and come back when it's 1 week old!!`,

                `➜ Please go to <#${channel}> to see how old your account is`,
                `\u200b`,
            ])

        message.channel.send(e).then(message.delete({ timeout: 300000 }))

        const embed = new MessageEmbed()
            .addField(`Hello ${message.author.tag}`, [
                `Time Created: ${moment(message.author.createdTimestamp).format("LT")} ${moment(message.author.createdTimestamp).format("LL")} ${moment(message.author.createdTimestamp).fromNow()}`,
                `\u200b`,
            ])

        const c = msg.guild.channels.cache.get(channel)

        c.send(embed)

        const loggingChannel = '914961672265957397',
            loggingEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`A user ran the verify command`)
                .addField(`user info`, [
                    `Tag: ${message.author.tag}`,
                    `ID: ${message.author.id}`,
                    `\u200b`,
                    `Time Created: ${moment(message.author.createdTimestamp).format("LT")} ${moment(message.author.createdTimestamp).format("LL")} ${moment(message.author.createdTimestamp).fromNow()}`,
                    `Server Join Date: ${moment(message.author.joinedAt).format("LL LTS")}`
                ])

        this.client.channels.cache.get(loggingChannel).send(loggingEmbed)

    }
}