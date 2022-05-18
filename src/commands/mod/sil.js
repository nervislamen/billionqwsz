const Discord = require('discord.js');
const ayarlar = require('../../ayarlar/ayar1.json');


module.exports = {
    conf: {
      aliases: ["sil"],
      name: "sil",
      help: "sil"
    }
,
  
run: async (client, message, args, prefix) => {

    
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`));

if(isNaN(args[0])) {
  var embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField(`<:demesneengel:968917163748507739> Hatalı Argüman !`, `Silinecek Mesaj Miktarını Yazmalısınız.`)
    .addField(`<:demesneok:969877903363944488> Doğru Kullanım:`, `Örn: ${ayarlar.prefix}sil 50`)
  .setAuthor(client.user.username, client.user.avatarURL({dynamic: true}))
  .setFooter(`Komutu Kullanan Yetkili: ${message.author.tag} `)
return message.channel.send(embed);
}

if (args[0] < 1) return message.reply("**1** adetten az mesaj silemem.")
if (args[0] > 100) return message.reply("**100** adetten fazla mesaj silemem!.")

message.channel.bulkDelete(args[0]).then(deletedMessages => {
if (deletedMessages.size < 1) return message.reply("Hiç mesaj silemedim . **14** günden önceki mesajları silemem!**");
})
message.channel.send(new Discord.MessageEmbed().setDescription(`<:demesneonay:968917131943092264> Başarıyla **${args[0]}** Tane Mesaj Silindi !`)
)}
};
