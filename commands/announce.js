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

    if (!message.member.hasPermission(["ADMINISTRATOR"])) return errorEmb("You don't have the appropriate rights to run this command!")
    let logs = message.guild.channels.find("name", "logs");
    if (!logs) return errorEmb("Could not find a logs channel.");
    let announcament = args[0];
    if (!announcament) return errorEmb("You must specify an announcament channel!")
    let ann_logs = message.guild.channels.find("name", announcament);
    if (!ann_logs) return errorEmb("Could not find a announcament channel.");
    let text = args.slice(1).join(" ");
    if (!text) return errorEmb("You must specify an announcament message!")
    const annembed = new Discord.RichEmbed()
        .setColor("#f34949")
        .setTimestamp()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription("**:tada: Annoucament :tada:**\n" + text)
    ann_logs.send({
        embed: annembed
    })
    message.channel.send("Announcament has been setted")
    const embed = new Discord.RichEmbed()
        .setColor("#f34949")
        .setTimestamp()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription("**Annoucament**\n" + text)
        .setThumbnail(message.author.avatarURL)
    logs.send({
        embed: embed
    })
};
exports.conf = {
    aliases: [
        "ann"
    ]
};
exports.help = {
    name: 'announcament',
    description: 'ban a user from your server',
    usage: 'a!announcament'
}