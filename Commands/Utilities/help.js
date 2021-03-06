const vortexMusicEmbed = require("../../Structures/CrimsonEmbed"),
  Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["halp", "h"],
      description: "Displays all the commands in the bot",
      category: "Utilities",
      usage: "[command]",
      guildOnly: true,
      cooldown: 10

    });
  }

  async run(message, [command]) {
    const embed = new vortexMusicEmbed()
      .setColor("RANDOM")
      .setAuthor(`${message.guild.name} Help Menu`, message.guild.iconURL({ dynamic: true }))
      .setThumbnail(this.client.user.displayAvatarURL())
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    if (command) {
      const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

      if (!cmd) {
        return
      };

      embed.setAuthor(`${this.client.utils.capitalise(cmd.name)} Command Help`, this.client.user.displayAvatarURL());

      embed.setDescription([
        `Aliases: ${cmd.aliases.length ? cmd.aliases.map((alias) => `\`${alias}\``).join(" ") : "No Aliases"}`,
        `Description: ${cmd.description}`,
        `Category: ${cmd.category}`,
        `Usage: ${cmd.usage}`
      ].join("\n"));

      return message.channel.send(embed);
    } else {
      let categories;
      if (!this.client.owners.includes(message.author.id)) {
        categories = this.client.utils.removeDuplicates(this.client.commands.filter((cmd) => cmd.category !== "Owner").map((cmd) => cmd.category));
      } else {
        categories = this.client.utils.removeDuplicates(this.client.commands.map((cmd) => cmd.category));
      }

      for (const category of categories) {
        embed.addField(`**${this.client.utils.capitalise(category)}**`, this.client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``).join(" "));
      }
      return message.channel.send(embed);
    }
  }
};
