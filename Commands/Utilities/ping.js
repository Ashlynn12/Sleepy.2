const { MessageEmbed } = require("discord.js"),
  Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["pong"],
      description: "This provides the ping of the bot",
      category: "Utilities",
      cooldown: 10
    });
  }

  async run(message) {
    const msg = await message.channel.send("Pinging..."),
      latency = msg.createdTimestamp - message.createdTimestamp

    let i = 0,
      s = Date.now();
    while (Date.now() - s <= 1) i++;


    const e = new MessageEmbed()
      .setColor("RANDOM")
      .addField("Bot Latency:", [
        `${(latency).toLocaleString()}ms`
      ])

      .addField("API Latency:", [
        `${Math.round(this.client.ws.ping).toLocaleString()}ms`
      ])

      .addField(`Server TPS`, [
        `${i.toLocaleString()}TPS`
      ])

      .setTimestamp();

    await msg.edit("", e);
  }
};