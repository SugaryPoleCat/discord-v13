const path = require('path');
const config = require(path.join(__dirname, '../../../config/config.json'));
const { SlashCommandBuilder } = require('@discordjs/builders');
let cmdName = path.basename(__filename, '.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName(cmdName)
		.setDescription('This will return pong if bot works correctly')
		// this returns true/false
		.addBooleanOption(option => option
			// this is displayed as option name
			// so make sure your option is right.
			.setName('gayman')
			.setDescription('Choose how gay you are')
			.setRequired(true)),
	async fox(client, interaction) {
		let choice = interaction.options._hoistedOptions;
		if (client.deb) {
			console.log('choices: ', choice);
		}
		let reply = 'you are geh';
		choice = choice[0];
		if (client.deb) {
			console.log(choice);
		}
		switch (choice.value) {
			case true:
				reply = 'You are geh.';
				break;
			case false:
				reply = 'You are not geh.';
				break;
			default:
				reply = 'It is unkown if you are geh or not.';
				break;
		}
		interaction.reply(reply + ' - this returns either true or false');
	}
};