const Discord = require('discord.js');

module.exports = {
    conf: {
      aliases: ["yaz"],
      name: "yaz",
      help: "yaz"
    },
  
run: async (client, message, args, embed, prefix) => {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(
      new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setFooter(`Komutu Kullanan Yetkili: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
      .setImage('https://cdn.discordapp.com/attachments/972875486302720090/973979544828661780/untitled.PNG')
      .setAuthor(`FEIX TRUST Yaz Komutu Kullanımı`)
      .setDescription('Komutu Kullanabilmek İçin Aşağıdaki Örneğe Bakabilirsiniz.'));
      
  
  message.delete();
  message.channel.send(mesaj);
}
}

