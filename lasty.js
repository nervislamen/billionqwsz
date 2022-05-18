const { Client, Collection, Discord, MessageEmbed } = require("discord.js");
require('discord-reply');
const client = (global.client = new Client({ fetchAllMembers: true }));
require('discord-buttons')(client)
const settings = require("./src/ayarlar/ayar1.json");
const ayarlar = require("./ayarlar.json");
const conf = require("./src/ayarlar/ayar2.json");
const { Mute2, Unmute} = require("./src/ayarlar/emojiler.json");
const fs = require("fs");
const moment = require("moment")
const db = require("quick.db");
const chalk = require("chalk");
client.commands = new Collection();
client.aliases = new Collection();
client.invites = new Collection();
client.cooldown = new Map();

client.login("OTY3NDAwMTA5Nzk1MDYxODIz.GmCKLz.0y7O39gU_C3VdJv3J362yFuyBTSQ3nAwQTq0D0")
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

const map = new Map();
const lımıt = 4;
const TIME = 180000;
const DIFF = 2000;


//KOMUTLAR
fs.readdir('./src/commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`[FEIX KOMUT] ${files.length} komut yüklenecek.`);
  files.forEach(f => {
    fs.readdir("./src/commands/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./src/commands/${f}/` + file);
        console.log(`[FEIX KOMUT] ${props.conf.name} komutu yüklendi!`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.conf.name);
        });
      })
    })
  });
});
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);


  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
    process.exit(1);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
  });

client.on('ready', () => {
  client.channels.cache.get('972774795886329870').join()
});

client.on("ready", () => {
    console.log(chalk.green(client.user.tag))
});

require("./dashboard/server.js")(client)

client.on("message", async message => {
  const a = message.content.toLowerCase();
  if (
    a === "slam" ||
    a === "sa" ||
    a === "selamun aleyküm" ||
    a === "selamın aleyküm" ||
    a === "selam" ||
    a === "slm" ||
    a === "Sa"
  ) {
    let i = await db.fetch(`saas_${message.guild.id}`);
    if(!i) return;
    if (i === "acik") {

        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Seni Görmek Ne Güzel ")
        .setDescription(`**Aleyküm Selam, Hoşgeldin!** ${message.author}`)
        .setFooter("FEIX TRUST", message.author.avatarURL({ dynamic: true }));
      message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
      
      
    }
  }
});

//////////
client.on("message", async message => {
  if (message.author.bot) return;
   let yazılar = db.fetch(`${message.guild.id}.otocevap.yazılar`)
   let cevaplar = db.fetch(`${message.guild.id}.otocevap.cevaplar`)
  var efe = ""
  let sunucuadı = message.guild.name
  let üyesayı = message.guild.members.cache.size
  let roller =  message.guild.roles.cache.map(role => role.name).join(", ")
  let sunucuid = message.guild.id
  let sunucubolge = message.guild.region
  let olusturulma = message.guild.createdAt
      for (var i = 0; i < (db.fetch(`${message.guild.id}.otocevap.yazılar`) ? db.fetch(`${message.guild.id}.otocevap.yazılar`).length : 0); i++) {
    if (message.content.toLowerCase() == yazılar[i].toLowerCase()) {
        efe += `${cevaplar[i]
          .replace("{sunucuadı}", `${sunucuadı}`)
          .replace("{üyesayı}", `${üyesayı}`)
          .replace("{roller}", `${roller}`)
          .replace("{sunucuid}", `${sunucuid}`)
          .replace("{sunucubölge}", `${sunucubolge}`)
          .replace("{sunucutarih}", `${olusturulma}`)}`
          var embed = new MessageEmbed()
          .setDescription(`${efe}`)
          return message.channel.send({embed: embed})
          }
      }
    })


