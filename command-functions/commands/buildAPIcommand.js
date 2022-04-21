const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const beautify = require('json-beautify');
// const buildAPIcommand = require('../../commands/buildAPIcommand');

// const dataExecute = {
//   data: buildCommand(),
//   execute: executeInteraction(), //function that calls other functions 
// }

function addOption(option, field) {
  //dynamically set field for each stringOption from the respective object 
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
for (let i = 0; i < inputFields.length; i++){
  command.addStringOption( option => addOption(option, inputFields[i]) )
  }
}


//Creates slash command for HTTP GET request to an API 
module.exports = {

  
  data: buildCommand(),

  //Executes the interaction through user input that fills in the respective input-field
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

    //This creates the data request
    if (key1) {
      request += `?${key1}=${val1}`;
    }

    if (key2) {
      request += `?${key2}=${val2}`;
    }


    if (key3) {
      request += `?${key3}=${val3}`;
    }
    //formats users API endpoint url and results
    try {
      let results = await fetch(request)
        //TO DO: convert .then to a readable function
        .then(response => response.json())
        .then(dataObject => {
          console.log(dataObject)
          // if (drillDown) {
          //   let drillBits = drillDown.split('.')
          //   for (let bit of drillBits) {
          //     dataObject = dataObject[bit]
          //     console.log(bit, dataObject)
          //   }
          return beautify(dataObject, null, 2, 100);
        })
      //rendered data returned back to user
      return interaction.reply(`Here is what I found at ${request}:\n\`\`\`json\n${results}\n\`\`\``);

      // let reply = ''
      // console.log(typeof results, 'house party')
      // if (typeof results === 'object') {
      //   reply = `Here is what I found at ${request}:\n\`\`\`json\n${results}\n\`\`\``;
      // }
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  },
};


