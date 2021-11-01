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
		.addIntegerOption(option => option.setName('int').setDescription('Enter interger'))
		.addBooleanOption(o => o.setName('bool').setDescription('this is abool'))
		.addChannelOption(o => o.setName('channel').setDescription('channel thing'))
		.addMentionableOption(o => o.setName('mention').setDescription('get a mnetion'))
		.addRoleOption(o => o.setName('role').setDescription('get role'))
		.addUserOption(o => o.setName('user').setDescription('get user'))
		.addNumberOption(o => o.setName('number').setDescription('get number')),
	async fox(client, interaction) {
		try {
			// this will get from STRING options
			const string = interaction.options.getString('input');
			if (string) {
				console.log('STRING: ', string);
			}
			// this is a WHOLE number, non decimals.
			const insteger = interaction.options.getInteger('int');
			if (insteger) {
				console.log('INTEGER: ', insteger);
			}
			// this gets the mentioned channel info.
			const channel = interaction.options.getChannel('channel');
			if (channel) {
				console.log('CHANNEL: ', channel);
			}

			// mentionable handles ROLES and USERS.
			const mention = interaction.options.getMentionable('mention');
			if (mention) {
				console.log('MENTIONABLE: ', mention);
			}

			const role = interaction.options.getRole('role');
			if (role) {
				console.log('ROLE: ', role);
			}
			const user = interaction.options.getUser('user');
			if (user) {
				console.log('USER: ', user);
			}

			// this is a DECIMAL number
			const number = interaction.options.getNumber('number');
			if (number) {
				console.log('NUMBER: ', number);
			}

			console.log('all options: ', interaction.options);
			// if (bool) {
			// 	console.log(bool);
			// }

			interaction.reply('this is a reply.');
		}
		catch (err) {
			console.error(err);
			interaction.reply('Something went wrong, check logs');
		}
	}
};