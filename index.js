//Import all libraries or dependecies
const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const WOKCommands = require('wokcommands')
const ping = require("minecraft-server-util")
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const interactions = require("discord-slash-commands-client");
bot.commands = new Discord.Collection();

const guildId = '814607392687390720'


//Check for any files in the commands folders (aka checking if the bot has the following commands or not)
fs.readdir("./commands/", (err, files) => {

//If there's a command file that ends with .js then proceed as normal otherwise, console will say "Couldn't find commands."
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

//To get output in console 
//>...[1:20:56 AM INFO]: [discord.js] - JS:tag.js
  jsfile.forEach((f, i) =>{
    var d = new Date().toLocaleTimeString();
    let props = require(`./commands/${f}`);
//Displays all files that are found in the commands folder
    console.log(`>...[${d} INFO]: [discord.js] - JS:${f}`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
	console.log(`\n${bot.user.username} is online!`);
	bot.user.setActivity('in play.saffas.xyz', { type: 'PLAYING' });
  new WOKCommands(bot, {
    commandsDir: 'slashcommands',
    testServers: [guildId],
    showWarns: false,
  })
})

const getApp = (guildId) => {
    const app = bot.api.applications(bot.user.id)
    if (guildId) {
      app.guilds(guildId)
    }
    return app
  }


bot.on("message", async message => {
//Checks for if the channel name in lower case includes "announcements" OR "updates"
if (message.channel.name.includes("announcements") || message.channel.name.includes("updates") || 
	message.channel.name.includes("events") || message.channel.name.includes("competitions") ||
	message.channel.name.includes("staff-applications")){
    let user = message.author;
    let role = message.author.role;
    let channel = message.channel.name;
    if (!message.content.startsWith('-edit')){
    if (user.bot) return;
        try {
            const name = message.member.displayName;
            //If the message is bigger than size 0 (0 = message only) (>1 = message + GIF/picture)
            if (message.attachments.size > 0) {
                var Attachment = (message.attachments).array();
                const storedimage = await message.guild.channels.cache.find(ch => ch.name === 'image-storage').send(Attachment[0])
                const storei = await (storedimage.attachments).array();
                const [ { proxyURL } ] = await storei
                const embed = new Discord.MessageEmbed()
                .setDescription(message.content) 
                .setAuthor(name, message.author.avatarURL())
                .setFooter('Saffas Bot | play.saffas.xyz')
                .setColor('#00FFFF')
                .setImage(proxyURL)
        		const sentEmbed = await message.channel.send(embed);
                await message.delete({ timeout: 1000 });
                //Logs to console an announcement was made.
                console.log(`\nAn image-inclusive announcement was made in #${channel}, by ${user.tag}`)  
                await sentEmbed.react('🎉');
        		await sentEmbed.react('❤️');

            }else if(message.attachments.size < 1) {
                //Does the same thing but if message doesn't include picture/GIF
                const name = message.member.displayName;
                const embed = new Discord.MessageEmbed()
                .setDescription(message.content)
                .setAuthor(name, message.author.avatarURL())
                .setFooter('Saffas Bot | play.saffas.xyz')
                .setColor('#00FFFF')
        		const sentEmbed = await message.channel.send(embed);
                await message.delete();
                //Logs to console an announcement was made.
                console.log(`\nAn announcement was made in #${channel}, by ${user.tag}`)
                await sentEmbed.react('🎉');
        		await sentEmbed.react('❤️');
            }
        } catch (error) {
            //Logs to console any errors.
            console.error(error)
        }
    }}
 
//Checks for if the channel name in lower case includes "polls" or "suggestions"
if (message.channel.name.toLowerCase().includes('polls')|| message.channel.name.toLowerCase().includes('suggestions') || message.channel.name.toLowerCase().includes('poll')) {
    let user = message.author;
    let role = message.author.role;
    let channel = message.channel.name;
    if (user.bot) return;
    try {
        const name = message.member.displayName;
        const embed = new Discord.MessageEmbed()
        .setDescription(message.content)
        .setAuthor(name, message.author.avatarURL())
        .setFooter('Saffas Bot | play.saffas.xyz')
        .setColor('#00FFFF')
 
        const sentEmbed = await message.channel.send(embed);
        await message.delete();
        await sentEmbed.react('👍');
        await sentEmbed.react('👎');
    } catch (error) {
            console.error(error)
        }
}

//Alert System
if (message.content.includes("op")) {
if (message.channel.name.includes("console")){ 
    if (message.content.includes("a server operator")) {
    	//Channel ID for staff = 701520308976353421
        //Channel ID for alerts = 689768738890973213
        const staff = '814607392687390723';
        const alerts = '821008539845656616';
        let channel = message.channel.name;
        var messageSplitted = message.content.split("\n");
        var substring = "a server operator";
        filtered = messageSplitted.filter(function (str) { return str.includes(substring); });
        //bot.channels.cache.get(staff).send(`**WARNING!** \`/op\` or \`/deop\` was used. Check \<#701629915296170046>\ for more info`);
        bot.channels.cache.get(alerts).send(`\`\`\`${filtered}\`\`\` It originated from ${channel}!`);
    }
}
}

if (message.channel.name.includes("console-lobby")) {
if (message.content.includes("[LP] Set * to true for ")) {
    if(message.content.includes("[Messaging] Sending log with id:")){
        //Channel ID for staff = 701520308976353421
        //Channel ID for lp = 701630251666767952
        const staff = '701520308976353421';
        const lp = '821008608979845141';
        let channel = message.channel.name;
        var messageSplitted = message.content.split("\n");
        var substring = " [LP]";
        filtered = messageSplitted.filter(function (str) { return str.includes(substring); });
      	bot.channels.cache.get(lp).send(`\`\`\`${filtered}\`\`\` It originated from ${channel}!`);
	}
}
}
//Guarantees no duplicate of message because it will only be from console-lobby
if (message.channel.name.includes("console-lobby")) {
    if (message.content.includes("now inherits permissions from")) {
        if(message.content.includes("for a duration of")) {
            return
        }else{
        if(message.content.includes("[Messaging] Sending log with id:")){
        //Channel ID for staff = 701520308976353421
        //Channel ID for alerts = 701629915296170046     
        const staff = '701520308976353421';
        const lp = '821008608979845141';
        let channel = message.channel.name;
        var messageSplitted = message.content.split("\n");
        var substring = "now inherits permissions from";
        filtered = messageSplitted.filter(function (str) { return str.includes(substring); });
        bot.channels.cache.get(lp).send(`\`\`\`${filtered}\`\`\` It originated from ${channel}!`);
        }
    }
}
}
if (message.channel.name.includes("console-lobby")) {
    if (message.content.includes("no longer inherits permissions from")) {
        if(message.content.includes("for a duration of")) {
            return
        }else{
        if(message.content.includes("[Messaging] Sending log with id:")){
        //Channel ID for staff = 701520308976353421
        //Channel ID for alerts = 701629915296170046     
        const staff = '701520308976353421';
        const lp = '821008608979845141';
        let channel = message.channel.name;
        var messageSplitted = message.content.split("\n");
        var substring = "no longer inherits permissions from";
        filtered = messageSplitted.filter(function (str) { return str.includes(substring); });
            bot.channels.cache.get(lp).send(`\`\`\`${filtered}\`\`\` It originated from ${channel}!`);        }
    }
}
}
if (message.channel.name.includes("console-lobby")) {   
    if (message.content.includes("[LP] Demoting")) {
        if(message.content.includes("[Messaging] Sending log with id:")){
        //Channel ID for staff = 701520308976353421
        //Channel ID for alerts = 701629915296170046        
        const staff = '701520308976353421';
        const lp = '821008608979845141';
        let channel = message.channel.name;
        var messageSplitted = message.content.split("\n");
        var substring = "[LP] Demoting";
        filtered = messageSplitted.filter(function (str) { return str.includes(substring); });
        bot.channels.cache.get(lp).send(`\`\`\`${filtered}\`\`\` It originated from ${channel}!`);
    }
}
}
if (message.channel.name.includes("console-lobby")) {
    if (message.content.includes("[LP] Promoting")) {
        if(message.content.includes("[Messaging] Sending log with id:")){
        //Channel ID for staff = 701520308976353421
        //Channel ID for alerts = 701629915296170046     
        const staff = '701520308976353421';
        const lp = '821008608979845141';
        let channel = message.channel.name;
        var messageSplitted = message.content.split("\n");
        var substring = "[LP] Promoting";
        filtered = messageSplitted.filter(function (str) { return str.includes(substring); });
        bot.channels.cache.get(lp).send(`\`\`\`${filtered}\`\`\` It originated from ${channel}!`);
    }
}
}
//Ham5teak Server Assistance

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
 
})


  bot.on('ready', async () => {
	bot.user.setActivity('in play.saffas.xyz', { type: 'PLAYING' });
    const client = new interactions.Client(
        tokenfile.token,
        "820369706933813258"
      );
	console.log(`\n${bot.user.username} is online!`);
    console.log(bot.api.applications(bot.user.id).commands.get())

    const commands = await getApp(guildId).commands.get()
    console.log(commands)
      
    await getApp(guildId).commands.post({
        data: {
          name: 'shelp',
          description: 'View usage and command guide of Saffas Bot',
        },
      })
    await getApp(guildId).commands.post({
        data: {
          name: 'saffas',
          description: 'View Saffas Network status',
        },
      })
  
      await getApp(guildId).commands.post({
        data: {
            name: 'tag',
            description: 'Tag a channel with a not',
            options: [
              {
                name: 'Note',
                description: 'Note',
                required: true,
                type: 3,   //string
              },
            ],
          },
        })

        await getApp(guildId).commands.post({
          data: {
              name: 'edit',
              description: 'Edit an announcement',
              options: [
                {
                  name: 'id',
                  description: 'ID of the message that will be edited',
                  required: true,
                  type: 3,   //string
                },
                {
                  name: 'new',
                  description: 'New content of the message',
                  required: true,
                  type: 3,   //string
                },
              ],
            },
          })

        await getApp(guildId).commands.post({
            data: {
                name: 'log',
                description: 'Fill a log',
                options: [
                  {
                    name: 'Type',
                    description: 'What type is the log?',
                    required: true,
                    type: 3,   //string
                    choices: [
                        {
                            name: "Absence",
                            value: "absence"
                        },
                        {
                            name: "Action",
                            value: "action"
                        },
                        {
                            name: "Punishment",
                            value: "punishment"
                        },
                    ],
                  },
                  {
                        name: 'IGN',
                        description: 'In game name',
                        required: true,
                        type: 3,   //string
                  },
                  {
                        name: 'Reason',
                        description: 'Reason',
                        required: true,
                        type: 3,   //string
                  },
                  {
                        name: 'Duration',
                        description: 'Duration or Quantity',
                        required: true,
                        type: 3,   //string
                  },
                  {
                    name: 'Detail',
                    description: 'Details',
                    required: true,
                    type: 3,   //string
                  },
                ],
              },
            })

    await getApp(guildId).commands.post({
        data: {
            name: 'move',
            description: 'Move channel to a category',
            options: [
              {
                name: 'Category',
                description: 'Category that the channel will be moved to',
                required: true,
                type: 3,   //string
                choices: [
                    {
                        name: "tickets",
                        value: "tickets"
                    },
                    {
                        name: "survival",
                        value: "sv"
                    },
                    {
                        name: "closed",
                        value: "c"
                    },
                ],
              },
            ],
          },
        })

        await getApp(guildId).commands.post({
            data: {
                name: 'restrict',
                description: 'Restrict channel to specified role - Work in progress',
                options: [
                  {
                    name: 'Role',
                    description: 'Which roles should be able to view channel',
                    required: true,
                    type: 3,   //string
                    choices: [
                        {
                            name: "Executive",
                            value: "exec"
                        },
                        {
                            name: "High Staff",
                            value: "hs"
                        },
                        {
                            name: "Staff",
                            value: "staff"
                        },
                        {
                            name: "Everyone",
                            value: "all"
                        },
                    ],
                  },
                ],
              },
            })

    bot.ws.on('INTERACTION_CREATE', async (interaction) => {
      const { name, options } = interaction.data

      const command = name.toLowerCase()

      const args = interaction.data.options

      if (options) {
        for (const option of options) {
          const { name, value } = option
          args[name] = value
        }
      }

      if(command === 'move'){
        const cat = args.find(arg => arg.name.toLowerCase() == 'category').value;
            if(cat === "t" || cat === "tickets"){
            bot.channels.resolve(interaction.channel_id).setParent("814747906341863484")
            }else if (cat === "sv" || cat === "survival"){
                bot.channels.resolve(interaction.channel_id).setParent("820975638763929631")
                }else if (cat === "c" || cat === "closed"){
                    bot.channels.resolve(interaction.channel_id).setParent("814748107920244747")
                    }
            const embed = new Discord.MessageEmbed()

            const userobject = await bot.users.fetch(interaction.member.user.id)
            embed.setAuthor(interaction.member.user.username, userobject.avatarURL())
            embed.setColor('#00FFFF')
            embed.setDescription('Channel has been moved to '+ cat + ' category.')
            reply(interaction, embed)
            console.log(interaction.member.user.username + " has moved " + channel.name + " to " + cat)
      }else if(command === 'log'){
          const logtype = args.find(arg => arg.name.toLowerCase() == 'type').value;
          const ign = args.find(arg => arg.name.toLowerCase() == 'ign').value;
          const reason = args.find(arg => arg.name.toLowerCase() == 'reason').value;
          const duration = args.find(arg => arg.name.toLowerCase() == 'duration').value;
          const details = args.find(arg => arg.name.toLowerCase() == 'detail').value;
            if(logtype === 'punishment'){

            const embed = new Discord.MessageEmbed()
            const userobject = await bot.users.fetch(interaction.member.user.id)
            embed.setAuthor(interaction.member.user.username, userobject.avatarURL())
            embed.setColor('#00FFFF')
            embed.setDescription("```\n" + "IGN: " + ign + "\nAction Taken: " + details + "\nReason: " + reason + "\nDuration: " + duration + "```\n")
            reply(interaction, embed)
            console.log(interaction.member.user.username + " has filled in an " +  logtype + " log.")

            }else if(logtype === 'absence'){

              const embed = new Discord.MessageEmbed()
              const userobject = await bot.users.fetch(interaction.member.user.id)
              embed.setAuthor(interaction.member.user.username, userobject.avatarURL())
              embed.setColor('#00FFFF')
              embed.setDescription("```\n" + "IGN: " + ign + "\nDetails: " + details +  "\nReason: " + reason + "\nDuration: " + duration + "```\n")
              reply(interaction, embed)
              console.log(interaction.member.user.username + " has filled in an " +  logtype + " log.")

            }else if(logtype === 'action'){

              const embed = new Discord.MessageEmbed()
              const userobject = await bot.users.fetch(interaction.member.user.id)
              embed.setAuthor(interaction.member.user.username, userobject.avatarURL())
              embed.setColor('#00FFFF')
              embed.setDescription("```\n" + "IGN: " + ign + "\nAction: " + details +  "\nReason: " + reason + "\nQuantity: " +  duration + "```\n")
              reply(interaction, embed)
              console.log(interaction.member.user.username + " has filled in an " +  logtype + " log.")

            }
      }else if (command === 'edit'){
        const id = args.find(arg => arg.name.toLowerCase() == 'id').value;
        const content = args.find(arg => arg.name.toLowerCase() == 'new').value;
        const userobject = await bot.users.fetch(interaction.member.user.id)
        const channel = await bot.channels.fetch(interaction.channel_id)

        try{      
          channel.messages.fetch({around: id, limit: 1})
              .then(msg => {
              const fetchedMsg = msg.first();
              if(fetchedMsg.author.bot){
              const embed1 = new Discord.MessageEmbed()
              embed1.setAuthor(interaction.member.user.username, userobject.avatarURL())
              embed1.setColor('#00FFFF')
              embed1.setDescription(content)
              embed1.setFooter('Saffas Bot | play.saffas.xyz') 
              fetchedMsg.edit(embed1);
              }else {return}
              })
                .catch(console.error);   
            }
              catch (error) {
                console.error(error)
            }
      }else if (command === 'shelp'){
        const embed = new Discord.MessageEmbed()
        embed.setAuthor('Saffas Bot Usage', 'https://cdn.discordapp.com/icons/814607392687390720/531aedf8b285fd14e4d8c2bb5a85bcdd.webp?size=128')
        embed.setColor('#00FFFF')
        embed.setDescription(`**Usage of Saffas Bot** \n**__Slash Commands:__** \n/log <type> <ign> <reason> <duration/quantity> <details>\n/move <tickets/survival/closed> -> Used to move channels.\n/restrict <hs/sh/exec/undo/help> -> Work in progress, currently disabled.\n/shelp -> Displays this message.\n/saffas -> Used to display information about the network.\n/tag -> Used to tag/leave a note to channels.\n**__Commands:__**\n-serverinfo -> Used to display information about the discord server.\n-move <tickets/survival/closed> -> Used to move channels.\n-restrict <hs/sh/exec/undo/help> -> Used to restrict channels.\n-shelp -> Displays this message.\n-saffas -> Used to display information about the network.\n-tag -> Used to tag/leave a note to channels.`)
        embed.setFooter('Saffas Bot | play.saffas.xyz')
        reply(interaction, embed)
      }else if (command === 'tag'){
        const channel = await bot.channels.fetch(interaction.channel_id);
        const tag = args.find(arg => arg.name.toLowerCase() == 'note').value;
        const embed = new Discord.MessageEmbed()
        const userobject = await bot.users.fetch(interaction.member.user.id)
        embed.setAuthor(interaction.member.user.username, userobject.avatarURL())
        embed.setColor('#00FFFF')
        embed.setDescription(interaction.member.user.username + ` has tagged the channel as \` ` + tag +` \``)
        embed.setFooter('Saffas Bot | play.saffas.xyz')
        reply(interaction, embed)
        console.log(interaction.member.user.username + " has tagged " + channel.name + " as " + tag)
    }else if (command === 'saffas'){
        const util = require('minecraft-server-util');
        const pingembed = new Discord.MessageEmbed()
        const channel = await bot.channels.fetch(interaction.channel_id);

util.status('play.saffas.xyz') // port is default 25565
    .then((response) => {
        pingembed.setAuthor('Saffas Network Status', 'https://cdn.discordapp.com/icons/814607392687390720/531aedf8b285fd14e4d8c2bb5a85bcdd.webp?size=128')
    		pingembed.setColor('#00FFFF')
    		pingembed.addField('Server IP:', response.host)
    		pingembed.addField('Server Version: ', response.version)
    		pingembed.addField('Online Players:', response.onlinePlayers)
    		pingembed.addField('Max Players:', response.maxPlayers)
        reply(interaction, pingembed)
        console.log("Saffas Network status has been sent to " + interaction.member.user.username + " in "  + channel.name)
    })
      }
    })
  })

  const reply = async (interaction, response) => {
    let data = {
      content: response,
    }

     // Check for embeds
    if (typeof response === 'object') {
      data = await createAPIMessage(interaction, response)
    }

    bot.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data,
      },
    })
  }

  const createAPIMessage = async (interaction, content) => {
    const { data, files } = await Discord.APIMessage.create(
      bot.channels.resolve(interaction.channel_id),
      content
    )
      .resolveData()
      .resolveFiles()

    return { ...data, files }
  }


bot.login(tokenfile.token);