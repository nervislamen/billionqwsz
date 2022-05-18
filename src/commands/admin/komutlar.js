const Discord = require('discord.js')
let pages = ['`!info` = Kullanıcı Bilgisini Gösterir\n `!ping` = Botun Bilgilerini Gösterir', '`!password` = Size Özel Parola Oluşturur', '``!komutlar`` = Botun Komut sayısını Gösterir']
let page = 1


module.exports = {
    conf: {
      aliases: ["help"],
      name: "help",
      help: "help"
    },
  
run: async (client, message, args, prefix) => {
    const embed = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setThumbnail(client.user.avatarURL({ dynamic: true }))
        .setFooter(`${pages.length} sayfadan ${page}. sayfa`)
        .setDescription(pages[page - 1])

    message.channel.send({ embed }).then(msg => {
        msg.react('⬅').then(r => {
            msg.react('➡')

            const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id
            const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id

            const backwards = msg.createReactionCollector(backwardsFilter, { timer: 6000 })
            const forwards = msg.createReactionCollector(forwardsFilter, { timer: 6000 })

            backwards.on('collect', (r, u) => {
                if (page === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                page--
                embed.setDescription(pages[page - 1])
                embed.setFooter(`${pages.length} sayfadan ${page}. sayfa`)
                msg.edit(embed)
                r.users.remove(r.users.cache.filter(u => u === message.author).first())
            })

            forwards.on('collect', (r, u) => {
                if (page === pages.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                page++
                embed.setDescription(pages[page - 1])
                embed.setFooter(`${pages.length} sayfadan ${page}. sayfa`)
                msg.edit(embed)
                r.users.remove(r.users.cache.filter(u => u === message.author).first())
            })
        })
    })
}}