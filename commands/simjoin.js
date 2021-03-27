const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

bot.guilds.cache.get(message.guild.id).members.fetch(message.member.id).then(member => {
    bot.emit('guildMemberAdd', member);

    })
}
module.exports.help = {
  name: "simjoin"
}