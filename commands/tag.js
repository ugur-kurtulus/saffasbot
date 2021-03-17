const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let role = message.author.role;
if (message.member.roles.cache.some(role => role.name === 'Staff') || message.member.roles.cache.some(role => role.name === 'Discord Staff')) {
    let user = message.author;
    let channel = message.channel.name;
    if (user.bot) return;
        try {
            const embed = new Discord.MessageEmbed()
                .setDescription(`${user} has marked this issue as \`${message.content.toString().toUpperCase().slice(5)}\``)
                .setFooter('Saffas Bot | play.saffas.xyz')
                .setColor('#00FFFF')
            await message.channel.send(embed);
            await message.delete();
            console.log(`\nTag command was used in #${channel}, ${user.tag} has marked this issue as \`${message.content.toString().toUpperCase().slice(5)}\``)
        } catch (error) {
            console.error(error)
    }
}
}

module.exports.help = {
  name:"tag"
}