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
		.setDescription('This will return pong if bot works correctly')
		.addStringOption(option => option.setName('input').setDescription('enter string'))
		.addIntegerOption(option => option.setName('int').setDescription('Enter interger')),
	async fox(client, interaction) {
		const string = interaction.options.getString('input');
		const insteger = interaction.options.getInteger('int');
		if(string){
			console.log(string);
		}
		if(insteger){
			console.log(insteger);
		}
		
		interaction.reply('Pong! - this is just a normal command...');
	}
};