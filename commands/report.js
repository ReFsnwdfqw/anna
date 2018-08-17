const Discord = require('discord.js');
module.exports.run = (bot, message, args) => {

    errorEmb = (errore) => {
        const error_embed = new Discord.RichEmbed()
            .setColor("#f34949")
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription("**Error**\n" + errore)
            .setThumbnail(message.author.avatarURL)
        message.channel.send({
            embed: error_embed
        })
    };

    let report = args.join(" ").slice(0);
    if (!report) return errorEmb("You have to provide a report message for me!")
    message.channel.send("Thanks For Reporting this bug ! :heart: ")
    const reporte = new Discord.RichEmbed()
        .setColor("#f34949")
        .setTimestamp()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription("**Reported**\n" + report)
        .setThumbnail(message.author.avatarURL)
    bot.guilds.find("id", "479310192195141643").channels.find("id", "479724498724061204").send({
        embed: reporte
    })
};
exports.conf = {
    aliases: [
        'reports'
    ]
};

exports.help = {
    name: 'report',
    description: 'Make The Bot Say Something',
    usage: 'a!report example'
};