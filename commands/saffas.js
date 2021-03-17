const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    let role = message.author.role;
if (message.member.roles.cache.some(role => role.name === 'Staff') || message.member.roles.cache.some(role => role.name === 'Discord Staff')) {
    let user = message.author;
    let channel = message.channel.name;
if(message.member.roles.cache.some(role => role.name === 'High Staff') || message.channel.name.includes("bot") || message.channel.name.includes("bots") ||  message.channel.name.includes("staff") || message.channel.name.includes("off-topic") || message.channel.name.includes("high-staff")) {
	try{
		const util = require('minecraft-server-util');
util.status('play.saffas.xyz') // port is default 25565
    .then((response) => {
		console.log(response)
        let pingembed = new Discord.MessageEmbed()
    		.setTitle('Saffas Network Status')
    		.setColor('#00FFFF')
    		.addField('Server IP:', response.host)
    		.addField('Server Version: ', response.version)
    		.addField('Online Players:', response.onlinePlayers)
    		.addField('Max Players:', response.maxPlayers)
    		.setFooter('Saffas Bot | play.saffas.xyz')
    	message.channel.send(pingembed);
    	message.delete();
    	console.log(`Server status has been sent to ${user.tag}, requested in ${channel}.`);
    })
    .catch((error) => {
        throw error;
    });
      } catch (e) {
    console.log(e.stack);
  }
}
}
}

module.exports.help = {
  name:"saffas",
  aliases:['safstats','saffasstatus','status','serverstatus','saffastus']
}