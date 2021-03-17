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
        .setDescription(`**Usage of Saffas Bot** \n__Commands:__ \n-move <channel> -> Used to move tickets.\n-restrict <hs/sh/exec/undo/help> -> Used to restrict tickets.\n-shelp -> Displays this message.\n-serverinfo -> Used to display information about the discord server.\n-saffas -> Used to display information about the network.\n-tag -> Used to mark tickets.`)
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