const { MessageEmbed } = require("discord.js"),
  Event = require("../../Structures/Event")

module.exports = class extends Event {

  async run(message) {
    if (message.author.bot) return;

    if (message.channel.type === "dm") {
      const dmLog = "893983546325205003",
        lengh = 1024;
      if (message.content.length > lengh) {
        return this.client.logger.warn(`${message.author.tag} (${message.author.id}) sent a message over ${lengh} charactors`);
      }

      this.client.logger.msg([
        `${message.author.tag} (${message.author.id}) has dmed me! they said: ${message.content}`
      ]);

      const e = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${message.author.tag} (${message.author.id})`)
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .addField(`${message.author.tag} has dmed me!`, [
          `tag: ${message.author.tag}`,
          `ID: ${message.author.id}`,
          `Message: ${message.content}`
        ]);

      this.client.channels.cache.get(dmLog).send(e);
    }

    const mentionRegex = new RegExp(`^<@!?${this.client.user.id}>$`),
      mentionRegexPrefix = new RegExp(`^<@!?${this.client.user.id}> `);

    if (message.author.bot) return;

    if (message.content.match(mentionRegex)) {
      return message.channel.send(`My prefix for ${message.guild.name} is \`${this.client.prefix}\`.`);
    }



    const prefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : this.client.prefix;

    if (!message.content.startsWith(prefix)) return;

    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g),
      command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));

    if (command) {
      if (command.ownerOnly && !this.client.utils.checkOwner(message.author.id)) {
        return message.reply("Sorry, this command can only be used by the bot owners.");
      }

      if (command.ongoing && !command.ongoing) {
        return message.reply("This command cannot currently be used");
      }

      if (command.guildOnly && !message.guild) {
        return message.reply("Sorry, this command can only be used in a discord server.");
      }

      if (command.nsfw && !message.channel.nsfw) {
        return message.reply("Sorry, this command can only be ran in a NSFW marked channel.");
      }

      if (command.args && !args.length) {
        return message.reply(`Sorry, this command requires arguments to function. Usage: ${command.usage ? `${this.client.prefix + command.name} ${command.usage}` : "This command doesn't have a usage format"}`);
      }

      if (message.guild) {
        const userPermCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms;
        if (userPermCheck) {
          const missing = message.channel.permissionsFor(message.member).missing(userPermCheck);
          if (missing.length) {
            return message.reply(`You are missing ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permissions, you need them to use this command!`);
          }
        }

        const botPermCheck = command.botPerms ? this.client.defaultPerms.add(command.botPerms) : this.client.defaultPerms;
        if (botPermCheck) {
          const missing = message.channel.permissionsFor(this.client.user).missing(botPermCheck);
          if (missing.length) {
            return message.reply(`I am missing ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permissions, I need them to run this command!`);
          }
        }
      }

      /**const guild = "866337462079193099";
      if (!guild) return;
*/
      this.client.logger.cmd(`${message.author.tag} (${message.author.id}) ran the ${command.name} command.`);

      /**
       * tags for blocked users
       * id :  | tag :  | reason: 
       */

      const blockedUsers = ['']

      if (blockedUsers.includes(message.author.id)) {
        return await message.channel.send([
          `you are blocked from using ${this.client.user.username}`,
          `if you think this is a mistake please contact my developer`
        ]).then(this.client.logger.warn(`blocked user : ${message.author.id} tried to run a command`))
      }

      const maintenance = false

      if (maintenance === true) {
        return message.channel.send([
          `${message.client.user.tag} is down due to an unknown error`,
          `Please bare with us *staff is aware of this so please do not ping staff*`
        ])
      }

      command.run(message, args).catch(error => {

        this.client.logger.error(error.stack);
        const errorEmbed = new MessageEmbed()
          .setColor("RED")
          .addField(`Command ${command.name} raised an error:`, "```js\n" + error.stack.replace(new RegExp(process.env.PWD, "g"), ".") + "\n```");
        message.channel.send([
          "An unexpected error has occured! The developer has been made aware, so hopefully it should be fixed soon!",
          `Please give this error to my developer (╴Sleepy.Kitten#3689) as an extra layer of help to make sure it is fixed \`\`\`js\n${error}\`\`\``,
          `If your error shows "Cannot dm this user" please ignore it`,
          `it simply means what it says on the tin, the user cant be dmed because of their settings`
        ].join("\n"));

        const errorChannel = "893983546325205003";
        return this.client.channels.cache.get(errorChannel).send(`<@911996341582962699>`, errorEmbed);
      });
    }
  }
};