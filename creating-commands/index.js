const buildAPICommand = require ('../command-handling/commands/buildAPIcommand.js');
const { Client, Intents, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'createcommand') {
				// const row = new MessageActionRow()
		// 	.addComponents(
		// 		new MessageSelectMenu()
		// 			.setCustomId('select')
		// 			.setPlaceholder('Nothing selected')
		// 			.addOptions([
		// 				{
		// 					label: 'GET',
		// 					description: 'Read information from API',
		// 					value: 'method_read',
		// 				},
		// 				{
		// 					label: 'PUT',
		// 					description: 'Update information to API',
		// 					value: 'method_update',
		// 				},
		// 				{
		// 					label: 'POST',
		// 					description: 'Create information to API',
		// 					value: 'method_create',
		// 				},
		// 				{
		// 					label: 'DELETE',
		// 					description: 'Delete information from API',
		// 					value: 'method_delete',
		// 				},
												
		// 			]),);
					await buildAPICommand.execute(interaction);

	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});

client.login(token);