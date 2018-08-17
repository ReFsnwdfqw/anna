const superagent = require("superagent");
const Discord = require('discord.js');
module.exports.run = async(bot, message, args) => {

    const { body } = await superagent
        .get(`https://nekos.life/api/v2/img/kiss`);

    if (!args[0]) {
        const ghembed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`${bot.user.username} gave ${message.author.username} a kiss :heart: :heart:! `)
            .setImage(body.url)
        message.channel.send({
            embed: ghembed
        })
        return;
    }
    if (!message.mentions.members.first().user.username === message.isMentioned(message.author)) {
        const hembed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`${message.author.username} gave ${message.mentions.members.first().user.username} a kiss! :heart:`)
            .setImage(body.url)
        message.channel.send({
            embed: hembed
        })
    }
};
exports.conf = {
    aliases: [
        'kiss'
    ]
};

exports.help = {
    name: 'kis',
    description: 'list of commands',
    usage: 'a!kiss @user'
};