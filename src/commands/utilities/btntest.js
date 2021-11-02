const path = require('path');
const config = require(path.join(__dirname, '../../../config/config.json'));
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageComponentInteraction } = require('discord.js');
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
		try {
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('dickaren')
						.setLabel('Bjuton')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('nothehe')
						.setLabel('false')
						.setStyle('DANGER')
						.setEmoji('💖')
						.setDisabled(),
					new MessageButton()
						.setLabel('info')
						.setStyle('LINK')
						.setEmoji('ℹ️')
						.setURL('https://google.com/'),
				);

			const embed = new MessageEmbed()
				.setColor('#ffaacc')
				.setTitle('Test')
				.setDescription('This is abutton test.');

			console.log('BTNTEST: ', interaction);

			await interaction.reply({ content: 'This is default reply', components: [row], ephemeral: true, embeds: [embed] });
		}
		catch (err) {
			console.error(err);
			interaction.reply('check logs. shit went wrong');
		}
	},
	async bjut(client, interaction, msi){
		try{
			console.log('BJUT INTERACTION: ', interaction);
			console.log('MSI: ', msi);
			console.log('MSI: ', msi.name);
			console.log('MIS: ', MessageComponentInteraction.resolveType(msi));
		} catch(err){
			console.error(err);
			interaction.reply('shit went wrong');
		}
	}
};