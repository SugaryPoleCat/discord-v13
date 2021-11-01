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
		.setDescription('this is a subcommand test')
		.addSubcommand(sc => sc.setName('user')
			.setDescription('user thing')
			.addUserOption(o => o.setName('target').setDescription('the user')))
		.addSubcommand(sc=>sc.setDescription('role').setName('role')
			.addRoleOption(o=>o.setDescription('role thjing').setName('role_thing'))),
	async fox(client, interaction) {
		try {
			console.log('INTERACTION: ', interaction);

			console.log('OPTIONS: ', interaction.options);
			const stuff = interaction.options.getRole('role_thing');
			if(stuff){
				console.log('STUFF: ', stuff);
			}

			interaction.reply('this is the main command reply.');
		} catch (err) {
			console.error(err);
			interaction.reply('there was an error, check error');
		}
	}
};