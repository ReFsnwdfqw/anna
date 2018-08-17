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

    if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return errorEmb("You don't have the appropriate rights to run this command!")
    let logs = message.guild.channels.find("name", "logs");
    if (!logs) return errorEmb("Could not find a logs channel.");
    let ammout = args.join(' ');
    let match = ammout.match(/[a-zA-Z]/);
    if (match) return errorEmb("Only Numbers");
    if (!ammout) return errorEmb("You Need To Specify an ammout");
    message.channel.fetchMessages({
        limit: ammout
    }).then((messages) => {
        message.channel.bulkDelete(messages)
    });
    const purgeEmb = new Discord.RichEmbed()
        .setColor("#f34949")
        .setTimestamp()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription("**Cleared**\n" + ammout + " messages")
        .setThumbnail(message.author.avatarURL)
    message.channel.send({
        embed: purgeEmb
    })
    logs.send({
        embed: purgeEmb
    })
};
exports.conf = {
    aliases: [
        'clear'
    ]
};

exports.help = {
    name: 'purge',
    description: 'list of commands',
    usage: 'a!purge [ammount]'
};