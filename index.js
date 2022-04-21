require('dotenv').config();
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
//#region Build command pool
//filters through .js files within ./commands and selects invoked slash command.
client.commands = new Collection();
const commandFiles = fs.readdirSync('./command-functions/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./command-functions/commands/${file}`);
	client.commands.set(command.data.name, command);
}
//#endregion 

client.once('ready', () => {
	console.log('Ready!');
});
//#region interaction listener from ./commands files.
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		let errText = `${error}`;
		console.log('index error', error);
		await interaction.reply({ content: errText, ephemeral: true });
	}
});
//#endregion

let TOKEN = process.env.TOKEN
client.login(TOKEN);
