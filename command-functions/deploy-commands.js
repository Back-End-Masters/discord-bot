require('dotenv').config();
const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

let TOKEN = process.env.TOKEN;
let CLIENT_ID = process.env.CLIENT_ID;
//Only used for dev testing
//let GUILD_ID = process.env.GUILD_ID;

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(TOKEN);

rest.put(Routes.applicationCommands/*applicationGuildCommand*/(CLIENT_ID/*, GUILD_ID*/), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
