const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const beautify = require('json-beautify');

//#region Member Functions
//dynamically set field for each stringOption from the respective object 
function addOption(option, field) {
  let name = Object.keys(field)[0];
  let description = field[name];
  let required = field.required;

  return option.setName(name)
    .setDescription(description)
    .setRequired(required)
}

function buildCommand() {
  let inputFields = [
    { apiurl: 'API endpoint URL.', required: true },
    { keyone: 'Requires value one in addition to this key.', required: false },
    { valueone: 'Matches key one.', required: false },
    { keytwo: 'Requires value two in addition to this key.', required: false },
    { valuetwo: 'Matches key two.', required: false },
    { keythree: 'Requires value three in addition to this key.', required: false },
    { valuethree: 'Matches key three.', required: false }
  ]

  let command = new SlashCommandBuilder()
    .setName('apirequest')
    .setDescription('Creates an API access command.')
  for (let i = 0; i < inputFields.length; i++) {
    command.addStringOption(option => addOption(option, inputFields[i]))
  }
  return command;
}

//This creates the data request
function formatRequest(interaction) {
  let opt = interaction.options;
  let request = opt.getString('apiurl');
  const key1 = opt.getString('keyone');
  const val1 = opt.getString('valueone');
  const key2 = opt.getString('keytwo');
  const val2 = opt.getString('valuetwo');
  const key3 = opt.getString('keythree');
  const val3 = opt.getString('valuethree');

  if (key1) {
    request += `?${key1}=${val1}`;
  }

  if (key2) {
    request += `?${key2}=${val2}`;
  }

  if (key3) {
    request += `?${key3}=${val3}`;
  }

  return request;
}

async function executeInteraction(interaction) {
  try {
    let request = formatRequest(interaction);
    let results = await fetch(request)
      .then(response => response.json())
      .then(dataObject => {
        return beautify(dataObject, null, 2, 100);
      })

    //rendered data returned back to user
    return interaction.reply(`Here is what I found at ${request}:\n\`\`\`json\n${results}\n\`\`\``);
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
}
//#endregion

//Creates slash command for HTTP GET request to an API 
const dataExecute = {
  data: buildCommand(),
  execute: executeInteraction,
}
module.exports = dataExecute;


