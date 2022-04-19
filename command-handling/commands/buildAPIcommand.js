const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createcommand')
    .setDescription('Creates an API access command.')
    .addStringOption(option =>
      option.setName('rest-method')
        .setDescription('The REST method to use for this API call.')
        .setRequired(true)
        .addChoices({ name: 'Read', value: 'method_read' }, { name: 'Update', value: 'method_update' }, { name: 'Delete', value: 'method_delete' }, { name: 'Create', value: 'method_create' })
    )
    .addStringOption(option =>
      option.setName('api-url')
        .setDescription('API endpoint URL.')
        .setRequired(true),
    ),
  async execute(interaction) {
    const value = interaction.options.getString('rest-method');
    return interaction.reply(`You have selected ${value}`)
  },
};
