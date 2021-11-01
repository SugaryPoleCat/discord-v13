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
		.setDescription('THis is a button test'),

	async fox(client, interaction) {
try{
		interaction.reply('this is the defualt reply');
}
catch(err){
	console.error(err);
	interaction.reply('check logs. shit went wrong');
}
	}
};