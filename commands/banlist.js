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
    message.guild.fetchBans().then(bans => {
        if (bans.size < 1) {
            return errorEmb("No Bans in this server")
        } else {
            bans.filter((x) => {
                const embed = new Discord.RichEmbed()
                    .setColor("#f34949")
                    .setTimestamp()
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setDescription("**Ban List**\n" + bans.size + "\n**Users**\n" + x.tag)
                    .setThumbnail(message.author.avatarURL)
                message.channel.send({
                    embed: embed
                })
            })
        }
    });

};
exports.conf = {
    aliases: [
        "ban_list"
    ]
};
exports.help = {
    name: 'banlist',
    description: 'Get The Ban List of your server',
    usage: 'a!banlist'
}