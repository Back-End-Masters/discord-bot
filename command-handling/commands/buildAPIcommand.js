const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

//creates object for our command and allows us to execute our command (interaction)
module.exports = {
  data: new SlashCommandBuilder()
    .setName('createcommand')
    .setDescription('Creates an API access command.')
    .addStringOption(option =>
      option.setName('rest-method')
        .setDescription('The REST method to use for this API call.')
        .setRequired(true)
        .addChoices({ name: 'Read', value: 'get' }, { name: 'Update', value: 'put' }, { name: 'Delete', value: 'delete' }, { name: 'Create', value: 'post' })
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
    const method = interaction.options.getString('rest-method').toUpperCase();
    const url = interaction.options.getString('api-url');
    const key1 = interaction.options.getString('key-one');
    const val1 = interaction.options.getString('value-one');
    let request = url;
    // concatenates the params to the user input api endpoint 
    if (key1) {
      request += `?${key1}=${val1}`;
    }
    // await interaction.deferReply();
    let results;
    await fetch(request)
    .then(response => response.json())
    .then(data => {
      results = data;

    })
    console.log(results);
    //TO DO: return code block to user from api endpoint based on their params
    return interaction.reply(`\`\`\`${results}\`\`\``);
  },
};


