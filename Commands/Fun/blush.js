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

    async run(message) {
        const embed = new MessageEmbed()
            .setTitle(`${message.author.username} blushes`)
            .setImage(await anime.blush())
            .setColor('RANDOM')
        message.channel.send(embed)
    }
};