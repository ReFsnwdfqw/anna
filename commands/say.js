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

    let sayBot = args.join(" ").slice(0);
    if (!sayBot) return errorEmb("You have to provide a message for me to say!")
    message.channel.send(sayBot);
};
exports.conf = {
    aliases: [
        'says'
    ]
};

exports.help = {
    name: 'say',
    description: 'Make The Bot Say Something',
    usage: 'a!say example'
};