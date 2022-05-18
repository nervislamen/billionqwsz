const { MessageEmbed } = require("discord.js");
const client = global.client;
let sended = false;
const ayarlar = require("../../ayarlar.json")
const db = require("quick.db")
const settings = require("../ayarlar/ayar1.json")
const conf = require("../ayarlar/ayar2.json")
setInterval(() => {
  client.cooldown.forEach((x, index) => {
    if (Date.now() - x.lastUsage > x.cooldown) client.cooldown.delete(index);
  });
}, 8000);

module.exports = async (message) => {
  var prefix = ayarlar.prefix;
  if (message.author.bot || !message.guild || !prefix) return;
  let args = message.content.substring(prefix.length).trim().split(" ");
  let commandName = args[0].toLowerCase();

  const embed = new MessageEmbed().setFooter(`FEIX TRUST`).setColor(message.member.displayHexColor).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, size: 2048 }));

  args = args.splice(1);
  let cmd = client.commands.has(commandName) ? client.commands.get(commandName) : client.commands.get(client.aliases.get(commandName));
  let komutLog = client.channels.cache.get(conf.komutLog);


  
  if (cmd) {
    if (db.get(`user_${message.author.id}.şartlar`) != 'Kurallar Kabul Edilmiş!') {
      const uyariEmbed = new MessageEmbed()
      .setColor('RED')
      .setDescription(`**Merhaba! Feix Botu kullanabilmek için şartları onaylamanız gerekmektedir.**\n\n**🖨** butonuna basarak botun kullanım şartlarına bakabilirsiniz.`)

      const kurallarembed = new MessageEmbed()
      .setColor('RED')
      .setDescription(`**
      1) Botu Kasten Gereksiz Olarak Zorlamak Yasaktır.
      2) Botu Kullanabilmeniz İçin Rol Kısmından Rolü En Üste Çekiniz.(Sunucular İçindir)
      3) Site Üzerinden Yapılan Uptimeler de Kullanmadığınız Proje Linklerinizi Kaldırınız !
      4) Site Üzerinden Eklenen Projelerinizin İsmi Kufur Barındırıyorsa Sistemden Silinecektir.
      5) Eklediğiniz Projelerden Başka Bir Siteyi Pinglemeyi İstemesi Durumundan Kalıcı Olarak Site ve Bot Üzerinden Banlanacaksınız.
      6) Kısaca Gereksiz Olarak Yapılan Her Türlü İşlem Cezalandırılacaktır.
      **`)
      .setTitle(`${client.user.username} | Kullanım Şartları`);
      

      return message.channel.send(uyariEmbed).then(async phentosarox => {
        await phentosarox.react('🖨');
        await phentosarox.awaitReactions((phentos, arox) => phentos.emoji.name == '🖨' && arox.id == message.author.id, { max: 1 })
        .then(async () => {
          await phentosarox.reactions.removeAll();
          await phentosarox.edit(kurallarembed).then(async pitos => {
            await pitos.react('✅');
            await pitos.awaitReactions((phentos, arox) => phentos.emoji.name == '✅' && arox.id == message.author.id, { max: 1 })
            .then(async () => {
              await pitos.reactions.removeAll();
              await phentosarox.edit(kurallarembed.setDescription('**Kullanım şartlarını kabul ettiniz. Artık botu kullanabilirsiniz!**'));
              await db.set(`user_${message.author.id}.şartlar`, 'Kurallar Kabul Edilmiş!');
            });
          });
        });
      })
    };
    
    if (cmd.conf.owner && !settings.owners.includes(message.author.id)) return;
    const cooldown = cmd.conf.cooldown || 3000;
    const cd = client.cooldown.get(message.author.id);
    if (cd) {
      const diff = Date.now() - cd.lastUsage;
      if (diff < cooldown)
        if (!sended) {
          sended = true;
          return message.channel.send(`${message.author}, Bu komutu tekrar kullanabilmek için **${Number(((cooldown - diff) / 1000).toFixed(2))}** daha beklemelisin!`).then((x) => x.delete({ timeout: (cooldown - diff) }));
        }
    } else client.cooldown.set(message.author.id, { cooldown, lastUsage: Date.now() });
    cmd.run(client, message, args, embed, prefix);
    if(komutLog) komutLog.wsend(new MessageEmbed().setColor("#2f3136").setTimestamp().setFooter(`Lasty Bot | Kullanma Zamanı : `).setDescription(`${message.author} (\`${message.author.id}\`) tarafından ${message.channel} (\`${message.channel.id}\`) kanalında \`${prefix}${commandName}\` komutunu kullandı!\n\nKomut içeriği: \`${message.content}\`!`))
  }
};

module.exports.conf = {
  name: "message",
};
