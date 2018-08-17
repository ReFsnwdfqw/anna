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
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (message.mentions.users.size < 1) return errorEmb("You must select the user you want to add role!");
    let muteRoleName = args.slice(1).join(' ');
    if (!muteRoleName) return errorEmb("You must specify a role name!");
    let muterole = message.guild.roles.find('name', muteRoleName);
    if (!muterole) return errorEmb("You must provide a valid role");
    user.addRole(muterole.id).then(() => {
        const embed = new Discord.RichEmbed()
            .setColor("#f34949")
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription("**Add Role**\n" + message.mentions.users.first().tag + "\n**Role Name**\n" + muteRoleName)
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
        'add_role'
    ]
};

exports.help = {
    name: 'addRole',
    description: 'addRole to a user',
    usage: 'a!addRole @user <role name>'
};