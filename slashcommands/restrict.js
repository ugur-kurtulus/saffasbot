const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
module.exports ={

    slash: true,
    testOnly:true, 
    description: 'test',
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
    callback:({ interaction })=>{
            const { name, options } = interaction.data
      
            const command = name.toLowerCase()
      
            const args = interaction.data.options
      
            if (options) {
              for (const option of options) {
                const { name, value } = option
                args[name] = value
              }
            }
      
    if(command === 'restrict'){
    const guild = bot.guilds.fetch(interaction.guild_id)
    const role = guild.roles.cache.find(role => role.name === 'High Staff')
    const checkrole = role.members.find(m=>m.user.id === interaction.member.user.id)
    if(!checkrole){return}
    const id = args.find(arg => arg.name.toLowerCase() == 'id').value;
    const content = args.find(arg => arg.name.toLowerCase() == 'new').value;
    const userobject = bot.users.fetch(interaction.member.user.id)
    const channel = bot.channels.fetch(interaction.channel_id)

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
    }
}

}
