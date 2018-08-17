const Discord = require('discord.js');
const fs = require('fs');
const config = require('./configs/config.json');
const bot = new Discord.Client();

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.on('ready', () => {
    console.log(`${bot.user.username} is now ready :3 \nServing ${bot.guilds.size} guilds`)
});

loadCmd = () => {
    fs.readdir('./commands/', (err, files) => {
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split('.').pop() === 'js');
        if (jsfiles.length <= 0) {
            console.log('No commands to load!');
            return;
        }
        jsfiles.forEach(f => {
            delete require.cache[require.resolve(`./commands/${ f }`)];
            let props = require(`./commands/${ f }`);
            props.fileName = f;
            bot.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                bot.aliases.set(alias, props.help.name);
            });
        });
    });
}

loadCmd();

let prefix = config.bot_config.prefix;
let token = config.bot_config.token;

bot.on('message', message => {

    let msg = message.content.toLowerCase() || message.content.toUpperCase();
    if (!msg.startsWith(prefix)) return undefined;
    if (message.author.bot) return undefined;
    let args = message.content.slice(prefix.length).trim().split(' ');
    let command = args.shift();

    let cmd;
    if (bot.commands.has(command)) {
        cmd = bot.commands.get(command);
    } else if (bot.aliases.has(command)) {
        cmd = bot.commands.get(bot.aliases.get(command));
    }
    if (cmd) return cmd.run(bot, message, args);

    if (message.content === prefix + 'reload') {
        if (message.author.id === '198888158509662218' | '346713523319209994') {
            message.channel.send("All Commands Have Been Reloaded")
            loadCmd();
        } else {
            return message.channel.send("No Permission...")
        }
    }
})


bot.login(process.env.BOT_TOKEN)
