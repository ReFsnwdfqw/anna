const Discord = require('discord.js');
module.exports.run = async(bot, message, args) => {

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

    if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return errorEmb("You don't have the appropriate rights to run this command!");
    let logs = message.guild.channels.find("name", "logs");
    if (!logs) return errorEmb("Could not find a logs channel.");
    let muterole = message.guild.roles.find('name', 'Muted');
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (message.mentions.users.size < 1) return errorEmb("You must select the user you want to unmute!");
    user.removeRole(muterole.id).then(() => {
        const embed = new Discord.RichEmbed()
            .setColor("#f34949")
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription("**Unmuted**\n" + message.mentions.users.first().tag)
            .setThumbnail(message.author.avatarURL)
        message.channel.send({
            embed: embed
        })
        logs.send({
            embed: embed
        })
    });
};
exports.conf = {
    aliases: [
        'un_mute'
    ]
};

exports.help = {
    name: 'unmute',
    description: 'Unmute a user',
    usage: 'a!unmute @user'
};