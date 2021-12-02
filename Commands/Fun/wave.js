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

        const e = new MessageEmbed()
            .setTitle(`${message.author.tag} waves`)
            .setImage(await anime.wave())
            .setColor('RANDOM')
        message.channel.send(e)
    }
};