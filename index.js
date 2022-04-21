require('dotenv').config();
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./command-handling/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./command-handling/commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

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
let TOKEN = process.env.TOKEN
client.login(TOKEN);
