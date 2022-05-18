const afk = require("../../schemas/afk");
const { green, red} = require("../../ayarlar/emojiler.json")
module.exports = {
    conf: {
      aliases: ["afk"],
      name: "afk",
      help: "afk"
    },
  
run: async (client, message, args, embed, prefix) => {
if (message.member.displayName.includes("[AFK]")) return
const reason = args.join(" ") || "Belirtilmedi";
await afk.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $set: { reason, date: Date.now() } }, { upsert: true });
message.react(green)
message.channel.send(embed.setDescription(`Başarıyla AFK Moduna Geçiş Yaptınız AFK Olma Nedeniniz : ${reason}.`)).then((x) => x.delete({ timeout: 5000 }));
if (message.member.manageable) message.member.setNickname(`[AFK] ${message.member.displayName}`);
}
  };
  
