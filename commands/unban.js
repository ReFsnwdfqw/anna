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

    if (!message.member.hasPermission(["BAN_MEMBERS"])) return errorEmb("You don't have the appropriate rights to run this command!")
    let logs = message.guild.channels.find("name", "logs");
    if (!logs) return errorEmb("Could not find a logs channel.");
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return errorEmb("You must select the user you want to unban!");
    if (reason.length < 1) return errorEmb("You must specify a reason for the unban!")
    let member = await message.guild.unban(user.id);


    const embed = new Discord.RichEmbed()
        .setColor("#f34949")
        .setTimestamp()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription("**Unbanned**\n" + user.tag + "\n**Reason**\n" + reason)
        .setThumbnail(message.author.avatarURL)
    message.channel.send({
        embed: embed
    })
};
exports.conf = {
    aliases: [
        "un_ban"
    ]
};
exports.help = {
    name: 'unban',
    description: 'ban a user from your server',
    usage: 'a!ban user'
}