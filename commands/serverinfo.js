const Discord = module.require('discord.js');
const client = new Discord.Client();

module.exports.run = async (bot, message, args) => {

    let role = message.author.role;
if (message.member.roles.cache.some(role => role.name === 'Staff')) {
		const infoEmbed = new Discord.MessageEmbed()
		.setColor('#00FFFF')
		.setTitle(`Server Information of ${message.guild.name}`)
		.setAuthor(message.client.user.username, message.client.user.displayAvatarURL)
		
		.addField('Member Count:', message.guild.memberCount)
		.addField('Server created at:', message.guild.createdAt.toLocaleString('en-US'))
		.addField('Nitro Boost Level :', message.guild.premiumTier)
		.addField('Roles:', message.guild.roles.cache.map(r => `${r}`).join(' | '))
		.setFooter('Saffas Bot | play.saffas.xyz')
		
		message.channel.send(infoEmbed);
		message.delete();
	}
}

module.exports.help = {
  name:"serverinfo",
  aliases:['info']
}