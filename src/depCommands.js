const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// const { clientId, guildId, token } = require('./config.json');
const path = require('path');
const config = require(path.join(__dirname, '../config/') + 'config.json');
require('dotenv').config();

// this FILE will create new commands.
const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder()
		.setName('choicetest')
		.setDescription('This is a test for choices')
		.addStringOption(option => option.setName('category')
			.setDescription('The gif category')
			.setRequired(true)
			.addChoice('Funny', 'gif_funny')
			.addChoice('Meme', 'gif_meme')),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DEV_TOKEN);

for(const guild of config.guilds){
	console.log('guild: ', guild);
	rest.put(Routes.applicationGuildCommands(config.clients.dev, guild), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);
}