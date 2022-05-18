const Discord = require("discord.js")
const { MessageButton, MessageEmbed, MessageActionRow } = require("discord-buttons") 
const db = require("croxydb")
const ayarlar = require("../../ayarlar/ayar1.json");


module.exports = {
    conf: {
      aliases: ["yardım"],
      name: "yardım",
      help: "yardım"
    },
  
run: async (client, message, args, prefix) => {
  
  const komut = new MessageButton()
  .setStyle("green")
  .setLabel("Komutları Göster")
  .setEmoji("968909349726593094")
  .setID("1")
  
const b1 = new MessageButton() 
.setStyle("url") 
.setLabel("Davet linkim")
.setEmoji("970561818600800286")
.setURL(`https://discord.com/api/oauth2/authorize?client_id=967400109795061823&permissions=8&scope=bot`)

const b3 = new MessageButton() 
.setStyle("url") 
.setLabel("Destek Sunucum")
.setEmoji("968917148179267586")
.setURL("https://discord.gg/yFXwsCxDDX")

const forever = new MessageButton()
.setStyle("url")
.setLabel("Siteye Yönlendir")
.setEmoji("973274391657984120")
.setURL("https://www.feixbot.tk/")

const gelistirici = new MessageButton()
.setStyle("url")
.setLabel("Geliştirici İle İletişime Geç")
.setEmoji("968917028121477140")
.setURL("https://www.instagram.com/lstyfrvr")

const embed = new Discord.MessageEmbed() 
.setColor("RED")
.setAuthor(`Selam, ${message.author.username}!`, message.author.avatarURL())
.setDescription(`**Bu Sunucudaki Prefix\' im: ${ayarlar.prefix}** \n\n**FEIX TRUST Botu Sizler için geliştirilmiş olan ve gelişmeye devam eden uptime botudur

Botumuz Projelerinizi/Linklerinizi 7/24 Canlı Halde Tutmayı ve Sadece Uptime Botu Olarak Kalmayıp Moderasyon/Koruma Gibi Sistemleri de İçerisin de Barındırmaktadır. \n\nSistemimiz %100 Kesintisiz(Geliştirmeler Hariç) Şekilde Çalışmaktadır.

Ve En Güzel Yanı Sınırsız Proje Ekleme Hakkına Sahip Olmanız
FEIX DAİMA HİZMETİNİZE HAZIR ! **`)


.setFooter("Feix Trust Bot", client.user.displayAvatarURL())
.setImage("https://cdn.discordapp.com/attachments/972875486302720090/973276048814927903/standard.gif")


  

message.channel.send({
embed: embed, 
buttons: [b1, b3, forever, gelistirici, komut] 
})
}}






 
  //(button.id === "1") {
 // await button.reply.edit(`Annen`)
//} else {
  //await button.reply.edit(`Yine Annen`)
//}







