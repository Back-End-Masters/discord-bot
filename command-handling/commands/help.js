const { SlashCommandBuilder } = require('@discordjs/builders');
const {Instructions, Example} = require('../../help.json')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies with instructions.'),
	async execute(interaction) {
    let reply = `${Instructions}\n${Example}` 
		return interaction.reply(reply);
	},
};