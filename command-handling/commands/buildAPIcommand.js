const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createcommand')
		.setDescription('Creates an API access command.')
    .addStringOption(option =>
      {console.log(option)
      option.setName('rest-method')
        .setDescription('The REST method to use for this API call.')
        .setRequired(true)
        .addChoice('Read', 'method_read')
        .addChoice('Update', 'method_update')
        .addChoice('Delete', 'method_delete')
        .addChoice('Create', 'method_create')
      })
    .addStringOption(option =>
      option.setName('API-URL')
        .setDescription('API endpoint URL.')
        .setRequired(true),
    ),
	async execute(interaction) {

		return interaction.reply('Pong!');
	},
};