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

    let setActivity = args.join(" ").slice(0);
    if (!setActivity) return errorEmb("You have to provide an activity !")
    if (message.author.id === '198888158509662218' | '346713523319209994') {
        bot.user.setActivity(setActivity).then(() => {
            const classic_embed = new Discord.RichEmbed()
                .setColor("#f34949")
                .setTimestamp()
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setDescription("**Changed Activity**\n" + setActivity)
                .setThumbnail(message.author.avatarURL)
            message.channel.send({
                embed: classic_embed
            })
            const log_embed = new Discord.RichEmbed()
                .setColor("#f34949")
                .setTimestamp()
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setDescription("**Changed Activity**\n" + setActivity)
                .setThumbnail(message.author.avatarURL)
            bot.guilds.find("id", "479310192195141643").channels.find("id", "479724498724061204").send({
                embed: log_embed
            })
        });
    } else {
        return errorEmb("You don't have the appropriate rights to run this command!")
    }
};
exports.conf = {
    aliases: [
        'setActivitys'
    ]
};

exports.help = {
    name: 'setActivity',
    description: 'Change Bot Game',
    usage: 'a!setActivity example'
};