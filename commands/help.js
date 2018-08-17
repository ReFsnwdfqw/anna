const Discord = require('discord.js');
module.exports.run = (bot, message, args) => {

    const helpEmb = new Discord.RichEmbed()
        .setColor("#f34949")
        .setTimestamp()
        .setFooter("a!help <command>")
        .setAuthor(bot.user.username + " commands", 'https://i.imgur.com/Lz0PBCk.png')
        .setDescription("**Mod**\na!ban, a!unban, a!banlist, a!kick, a!createRole, a!addRole, a!removeRole, a!mute, a!unmute, a!tempmute, a!purge, a!announcament\n**Fun**\na!say, a!kiss, a!hug\n**help us**\na!report [bug]")
        .setThumbnail('https://i.imgur.com/Lz0PBCk.png')
    message.channel.send({
        embed: helpEmb
    })
};
exports.conf = {
    aliases: [
        'commands'
    ]
};

exports.help = {
    name: 'help',
    description: 'list of commands',
    usage: 'a!help'
};