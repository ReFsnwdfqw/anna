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

    if (!message.member.hasPermission(["MANAGE_ROLES"])) return errorEmb("You don't have the appropriate rights to run this command!");
    let logs = message.guild.channels.find("name", "logs");
    if (!logs) return errorEmb("Could not find a logs channel.");
    let RoleName = args.slice(0).join(' ');
    if (!RoleName) return errorEmb("You must specify a role name!");
    message.guild.createRole({
        name: RoleName,
        color: "#f34949",
        permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL']
    });
    const embed = new Discord.RichEmbed()
        .setColor("#f34949")
        .setTimestamp()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription("**Create Role**\n" + RoleName)
        .setThumbnail(message.author.avatarURL)
    message.channel.send({
        embed: embed
    })
    logs.send({
        embed: embed
    })
};
exports.conf = {
    aliases: [
        'create_role'
    ]
};

exports.help = {
    name: 'createRole',
    description: 'create a Role',
    usage: 'a!createRole <role name>'
};