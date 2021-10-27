const path = require('path');
const config = require(path.join(__dirname, '../../../config/config.json'));
const { SlashCommandBuilder } = require('@discordjs/builders');
let cmdName = path.basename(__filename, '.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName(cmdName)
		.setDescription('This will return pong if bot works correctly')
		.addStringOption(option => option
			.setName('gayness')
			.setDescription('Choose how gay you are')
			.setRequired(true)
			.addChoice('Super gay', 'gay_super')
			.addChoice('MIni gay', 'gay_mini')
			.addChoice('No gay', 'gay_no')),
	async fox(client, interaction) {
		let choice = interaction.options._hoistedOptions;
		if (client.deb) {
			console.log('choices: ', choice);
		}
		let reply = '';
		choice = choice[0];
		if(client.deb){
			console.log(choice);
		}
		switch (choice.value) {
			case 'gay_super':
				reply = 'You are Super Super gay';
				break;
			case 'gay_mini':
				reply = 'You are just tiny bit gay, a mini gay.';
				break;
			case 'gay_no':
				reply = 'You are not gay at all. Shame.';
				break;
			default:
				reply = 'Where is the geh';
				break;
		}
		interaction.reply(reply);
	}
};