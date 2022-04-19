const { SlashCommandBuilder } = require('@discordjs/builders');

//creates object for our command and allows us to execute our command (interaction)
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
    )
    .addStringOption(option =>
      option.setName('key-one')
        .setDescription('Requires value in addition to this key.')
        .setRequired(false),
    )
    .addStringOption(option =>
      option.setName('value-one')
        .setDescription('Matches previously defined key.')
        .setRequired(false),
    ),
  async execute(interaction) {
    console.log('INTERACTION:', interaction.options._hoistedOptions);
    const value = interaction.options.getString('rest-method');

    //TO DO: return with new logistics for script
    return interaction.reply(`You have selected ${value}`)
  },
};
