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
		.setDescription('This returns a user')
		.addUserOption(option => option
			.setName('name')
			.setDescription('type a name')),
	async fox(client, interaction) {
		if (client.deb) {
			try {
				console.log(interaction);
				// console.log(client);
			} catch (err) {
				console.error(err);
			}
		}
		const reply = interaction.options.getString('name');
		if (!interaction.options._hoistedOptions[0]) {
			reply = interaction.user.username;
		} else {
			reply = !interaction.options._hoistedOptions[0].user.username;
		}

		interaction.reply(reply + ' - this returns the user');
	}
};