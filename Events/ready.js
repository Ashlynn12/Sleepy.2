const Event = require("../Structures/Event"),
  { MessageEmbed } = require("discord.js"),
  moment = require("moment")


module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: true,
    });
  }

  async run() {
    const client = this.client,
      bot = client

    /**const guild = '885098457893851146',
      channel = '910641225227448351',
      user = '913486391093121164'

    setInterval(() => {
      this.client.guilds.cache.get(guild).channels.cache.get(channel).send(`<@${user}> \n Road to 1k pings`)

    }, 2000);
    /*



    /**this.client.once("message", async message => {

      if (message.author.bot) {
        return
      } else if (message.content.startsWith('welcy')) {
        await message.channel.send(`Welcome, hope you enjoy your stay!`)
      }

      if (message.author.bot) {
        return
      } else if (message.content.startsWith('Welcy')) {
        await message.channel.send(`Welcome, hope you enjoy your stay!`)
      }


      const badLinks = [
        'https://'
      ]

      if (message.author.bot) {
        return
      } else if (message.channel.id === '906618508413136968') {
        return
      }
      if (message.member.hasPermission("ADMINISTRATOR")) {
        return
      } else if (message.content.includes(badLinks)) {
        this.client.logger.warn(`${message.author.tag} | ${message.author.id} sent a link : ${message.content}`)
        await message.delete().then(await message.channel.send([
          `Hey ${message.author.tag} | ${message.author.id} your message was deleted as we do not allow link to be sent in this chat please go to <#906618508413136968>`
        ]))
      }
    })


     const welcome = '906293197184049182',
       goodbye = '906598756982587433';
 

    /**client.on('messageDelete', (message) => {
      this.client.logger.msg([
        `Message sent in ${message.channel.name}`,
        `\u200b`,
        `Tag ${message.author.tag}`,
        `ID: ${message.author.id}`,
        `Message: ${message.content}`
      ])
    })
*/


    //shard error handling 
    this.client.once('shardError', (error) => {
      console.error('A websocket connection encountered an error:', error);
    });


    client.once('interactionCreate', async (interaction) => {
      this.client.logger.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
    });

    this.client.once("guildCreate", async (guild) => {
      this.client.logger.log(`\n---------\nI have been added to '${guild.name}' (${guild.id}) with ${guild.memberCount} members!`);
    });

    this.client.once("guildDelete", async (guild) => {
      this.client.logger.log(`\n---------\nI have been removed from '${guild.name}' (${guild.id}) with ${guild.memberCount} members!`);
    });

    this.client.once("guildMemberAdd", async (member) => {
      this.client.channels.cache.get('914889465900699649').send([
        `︵︵Hello!〃🍯꒦꒷・‹3
        🥐﹒﹒﹗Welcome <@${member.user.id}> to Pan Cafe! 
        We hope you enjoy your stay <3`
      ])

      this.client.logger.warn([
        `Welcome ${member.user.tag} | ${member.user.id} to Pan Cafe!`
      ])

    })


    this.client.once("guildMemberRemove", async (member) => {
      this.client.channels.cache.get('914906653520965682').send([
        `︵︵Bye!〃꒦꒷・‹3
        ﹒﹒﹗Awh.. you left the cafe ${member.user.tag} :( We hope you had a good stay!`
      ])

      this.client.logger.warn([
        `﹒﹒﹗Awh.. you left the cafe ${member.user.tag} | ${member.user.id} :( We hope you had a good stay!`
      ])

    })

    const activities = [
      `${this.client.guilds.cache.size.toLocaleString()} servers!`,
      `${this.client.channels.cache.size.toLocaleString()} channels!`,
      `${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users!`,
    ];

    let i = 0;
    setInterval(() => this.client.user.setActivity(`${this.client.prefix}help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000);

    this.client.logger.log([
      `Logged in as ${this.client.user.tag}`,
      `Loaded ${this.client.commands.size} commands!`,
      `Loaded ${this.client.events.size} events!`,
      `Serving ${this.client.users.cache.size.toLocaleString()} members!`,
      `Serving ${this.client.guilds.cache.size.toLocaleString()} guilds!`,
      `Client ID: ${this.client.user.id}`,
      `invite: https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=8`,
    ].join("\n"));

    this.client.logger.log(`\nServers[${this.client.guilds.cache.size.toLocaleString()}]: \n---------\n${this.client.guilds.cache.map((guild) => `${guild.id + "\t" + guild.name + "   |   " + guild.memberCount.toLocaleString()} mem\'s`).join("\n")}`);
  }
}