"use strict";

const Command = require("../../Structures/Command"),
    { MessageEmbed } = require("discord.js"),
    anime = require('anime-actions');


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            category: "Fun",
        });
    }
    // eslint-disable-next-line no-unused-vars

    async run(message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) {
            return message.channel.send(`please supply an @mention or ID`)
        }

        const embed = new MessageEmbed()
            .setTitle(`${message.author.tag} hugs ${member.user.tag}`)
            .setImage(await anime.hug())
            .setColor('RANDOM')
        message.channel.send(embed)
    }
};