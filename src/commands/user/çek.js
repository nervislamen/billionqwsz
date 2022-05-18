const { MessageEmbed } = require("discord.js");
const { MessageButton,MessageActionRow } = require('discord-buttons');
const moment = require("moment");
moment.locale("tr");
const feixayarlar = require('../../ayarlar/ayar1.json')
const { green, red } = require("../../ayarlar/emojiler.json")

module.exports = {
    conf: {
      aliases: ["çek"],
      name: "çek",
      help: "çek"
    },
  
run: async (client, message, args, embed, prefix) => {

  if (!message.member.voice.channelID) return message.lineReply("<:demesneok:969877903363944488> Herhangi Bir Ses Kanalına Bağlı Değilsiniz", message.author, message.channel);
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  if (!member) return  message.lineReply("<:demesneok:969877903363944488> Lütfen Bir Üye Etiketleyip Tekrardan Denermisiniz.", message.author, message.channel);
  if (!member.voice.channelID) return message.lineReply("<:demesneok:969877903363944488> Etiketlediğiniz Kullanıcı Herhangi Bir Ses Kanalında Bulunmuyor", message.author, message.channel);
  if (message.member.voice.channelID === member.voice.channelID) return message.lineReply("<:demesneok:969877903363944488> Herhangi Birini Etiketlemediniz veya Etiketlediğiniz Kişiyle Aynı Kanalda Bulunuyorsunuz.", message.author, message.channel);

   var onaylaa = new MessageButton()
      .setID("onay")
      .setLabel("Kişinin İsteğini Kabul Et")
      .setStyle("green")
      .setEmoji("915754671728132126")

      var reddett = new MessageButton()
      .setID("red")
      .setLabel("Kişinin İsteğini Reddet")
      .setStyle("red")
      .setEmoji("920412153712889877")
      
      var musait = new MessageButton()
      .setID("musait")
      .setLabel("Müsait Olmadığını Bildir")
      .setStyle("blue")
      .setEmoji("970561822652506152")

      var işlembaşarılı = new MessageButton()
      .setID("başarılı")
      .setLabel("İşlem Başarılı")
      .setStyle("green")
      .setDisabled(true);

      var işlembaşarısız = new MessageButton()
      .setID("başarısız")
      .setLabel("İşlem Başarısız")
      .setStyle("red")
      .setDisabled(true);

      const row = new MessageActionRow()
      .addComponent(onaylaa)
      .addComponent(reddett)

      const row2 = new MessageActionRow()
      .addComponent(işlembaşarılı)

      const row3 = new MessageActionRow()
      .addComponent(işlembaşarısız)

  if (message.member.permissions.has("ADMINISTRATOR")) {
      member.voice.setChannel(message.member.voice.channelID);
      message.react(green)
      message.lineReply(embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author}, ${member} kişisini yanınıza taşıdınız.`))
      const log = embed
      .setColor("#2f3136")
      .setDescription(`
      Bir Transport işlemi gerçekleşti.
    
      Odaya Taşınan Kullanıcı: ${member} - \`${member.id}\`
      Odasına Taşıyan Yetkili: ${message.author} - \`${message.author.id}\`
      `)
      .setFooter(`${moment(Date.now()).format("LLL")}`)
    message.guild.channels.cache.get().wsend(log);
} else {

let feix = new MessageEmbed()
.setDescription(`${member}, ${message.author} \`${message.member.voice.channel.name}\` seni odasına çekmek istiyor. Kabul ediyor musun?`)
.setFooter(`Lütfen 30 saniye içerisinde işlem iptal edilecektir.`)
.setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true }))
 
let msg = await message.channel.send((member.toString()), { components : [ row ], embed: feix})

    var filter = (button) => button.clicker.user.id === member.user.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 30000 })

      collector.on("collect", async (button) => {

if(button.id == "onay") {

await button.reply.defer()

const embeds = new MessageEmbed() 

    .setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setTimestamp()
    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setDescription(`${message.author}, ${member} kişisini yanınıza taşıdınız.`)
    member.voice.setChannel(message.member.voice.channelID);

msg.edit({
embed: embeds,
components : row2
})

}

if(button.id == "red") {

await button.reply.defer()

const embedss = new MessageEmbed() 
.setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setTimestamp()
.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
.setDescription(`${message.author}, ${member} yanına taşıma işlemi iptal edildi.`)

msg.edit({
embed: embedss,
components : row3
})
    }
 });

}
}
}
