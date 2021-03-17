const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  try{
    const content = args.slice(1).join(' ')
    message.delete();

    message.channel.messages.fetch({around: args[0], limit: 1})
        .then(msg => {
        const fetchedMsg = msg.first();
        if(fetchedMsg.author.bot || message.member.roles.cache.some(role => role.name === 'Staff')){
        const embed1 = new Discord.MessageEmbed()
        embed1.setAuthor(message.member.displayName, message.author.avatarURL())
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
      }

module.exports.help = {
    name:"aedit"
  }