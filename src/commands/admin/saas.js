const Discord = require("discord.js")
const db = require('quick.db')
const ayarlar = require('../../ayarlar/ayar1.json')
module.exports = {
    conf: {
      aliases: ["saas"],
      name: "saas",
      help: "saas"
    },
  
run: async (client, message, args, embed, prefix) => {
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanmak için gerekli yetkin yok! gereken yetki: `YÖNETİCİ`")
  if(!args[0]){
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${ayarlar.botnick} Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Hata! Lütfen bir değer belirt! **${prefix}saas aç** veya **${prefix}saas kapat**`)
      .setColor("RANDOM")
      .setFooter(`Komutu Kullanan Yetkili: ${client.user.username}`, message.author.avatarURL({ dynamic: true }))
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);    
    }
  
  
  if(args[0] == "aç"){
    if(db.has(`saas_${message.guild.id}`) === "acik"){
      const embed = new Discord.MessageEmbed()
      .setAuthor(`FEIX TRUST Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Hata! Sa-As sistemi zaten aktif! kapatmak için: ${prefix}saas kapat`)
      .setColor("RANDOM")
      .setFooter(`Komutu Kullanan Yetkili: ${message.author}`, message.author.avatarURL({ dynamic: true }))
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
    }
    
      db.set(`saas_${message.guild.id}`, "acik")
      
      const embed = new Discord.MessageEmbed()
      .setAuthor(`FEIX TRUST Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Başarılı! Başarılı bir şekilde Sa-As sistemi **Aktifleştirildi!**`)
      .setColor("RANDOM")
      .setFooter(`Komutu Kullanan Yetkili: ${message.author}`, message.author.avatarURL({ dynamic: true }))
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
  }
  
  if(args[0] == "kapat"){
    if(!db.has(`saas_${message.guild.id}`) === "acik"){
      const embed = new Discord.MessageEmbed()
      .setAuthor(`FEIX TRUST Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Hata! Sa-As sistemi zaten kapalı! açmak için: ${prefix}saas aç`)
      .setColor("RANDOM")
      .setFooter("FEIX TRUST", message.author.avatarURL({ dynamic: true }))
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
    }
    db.delete(`saas_${message.guild.id}`)
    const embed = new Discord.MessageEmbed()
      .setAuthor(`FEIX TRUST Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Başarılı! Başarılı bir şekilde Sa-As sistemi **Kapatıldı!**`)
      .setColor("RANDOM")
      .setFooter("FEIX TRUST", message.author.avatarURL({ dynamic: true }))
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);    
  }
}
}


