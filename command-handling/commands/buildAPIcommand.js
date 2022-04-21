const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const beautify = require('json-beautify');
//creates object for our command and allows us to execute our command (interaction)
module.exports = {
  data: new SlashCommandBuilder()
    .setName('createcommand')
    .setDescription('Creates an API access command.')
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
    )
    .addStringOption(option =>
      option.setName('key-two')
        .setDescription('Requires value in addition to this key.')
        .setRequired(false),
    )
    .addStringOption(option =>
      option.setName('drill-down')
        .setDescription('Chain of properties to desired content')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('value-two')
        .setDescription('Matches previously defined key.')
        .setRequired(false),
    )
    .addStringOption(option =>
      option.setName('key-three')
        .setDescription('Requires value in addition to this key.')
        .setRequired(false),
    )
    .addStringOption(option =>
      option.setName('value-three')
        .setDescription('Matches previously defined key.')
        .setRequired(false),
    ),
  async execute(interaction) {
    console.log('INTERACTION:', interaction.options._hoistedOptions);
    const url = interaction.options.getString('api-url');
    const drillDown = interaction.options.getString('drill-down');
    const key1 = interaction.options.getString('key-one');
    const val1 = interaction.options.getString('value-one');
    const key2 = interaction.options.getString('key-two');
    const val2 = interaction.options.getString('value-two');
    const key3 = interaction.options.getString('key-three');
    const val4 = interaction.options.getString('value-three');
    let request = url;


    if (key1) {
      request += `?${key1}=${val1}`;
    }

    if (key2) {
      request += `?${key2}=${val2}`;
    }


    if (key3) {
      request += `?${key3}=${val3}`;
    }
    try {
      let results = await fetch(request)
        .then(response => response.json())
        .then(dataObject => {
          console.log(dataObject)
          if (drillDown) {
            let drillBits = drillDown.split('.')
            for (let bit of drillBits) {
              dataObject = dataObject[bit]
              console.log(bit, dataObject)
            }
            return dataObject;
          }

        })
      // let reply = ''
      // console.log(typeof results, 'house party')
      // if (typeof results === 'object') {
      //   reply = `Here is what I found at ${request}:\n\`\`\`json\n${results}\n\`\`\``;

      // }
      return interaction.reply(`Here is what I found at ${request}:\n\`\`\`json\n${results}\n\`\`\``);
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  },
};


