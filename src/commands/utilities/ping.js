const path = require('path');
const config = require(path.join(__dirname, '../../../config/config.json'));
const { SlashCommandBuilder } = require('@discordjs/builders');
let cmdName = path.basename(__filename, '.js');
if (process.env.PREFIX) {
	console.log('prefix exists');
	cmdName = `${process.env.PREFIX}${path.basename(__filename, '.js')}`;
}
console.log(cmdName);
module.exports = {
	data: new SlashCommandBuilder()
		.setName(cmdName)
		.setDescription('This will return pong if bot works correctly'),
	async fox(client, interaction) {
		if (client.deb) {
			console.log('we are in fox');
		}
		interaction.reply('Pong!');
	}
};