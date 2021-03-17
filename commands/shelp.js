const Discord = module.require('discord.js');
const client = new Discord.Client();

module.exports.run = async (bot, message, args) => {

    let role = message.author.role;
if (message.member.roles.cache.some(role => role.name === 'Staff') || message.member.roles.cache.some(role => role.name === 'High Staff') || message.member.roles.cache.some(role => role.name === 'Discord Staff')) {
	try	
	{
		const infoEmbed = new Discord.MessageEmbed()
		.setColor('#00FFFF')
		.setAuthor(message.client.user.username, message.client.user.displayAvatarURL)
        .setDescription(`**Usage of Saffas Bot** \n**__Slash Commands:__** \n/log <type> <ign> <reason> <duration/quantity> <details>\n/move <tickets/survival/closed> -> Used to move channels.\n/restrict <hs/sh/exec/undo/help> -> Work in progress, currently disabled.\n/shelp -> Displays this message.\n/saffas -> Used to display information about the network.\n/tag -> Used to tag/leave a note to channels.\n**__Commands:__**\n-serverinfo -> Used to display information about the discord server.\n-move <tickets/survival/closed> -> Used to move channels.\n-restrict <hs/sh/exec/undo/help> -> Used to restrict channels.\n-shelp -> Displays this message.\n-saffas -> Used to display information about the network.\n-tag -> Used to tag/leave a note to channels.`)
        .setFooter('Saffas Bot | play.saffas.xyz')
		
		message.channel.send(infoEmbed);
		message.delete();
	} catch (error) {
		console.error(error)
	}}
}

module.exports.help = {
  name: "shelp",
  aliases: ['saffasbothelp', 'saffashelp']
}