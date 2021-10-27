const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// const { clientId, guildId, token } = require('./config.json');
const path = require('path');
const config = require(path.join(__dirname, '/config/config.json'));
require('dotenv').config();

let args = process.argv;
args = args.splice(2, process.argv.length);

// Do some checks.
process.env.DEB = false;
process.env.PREFIX = String(config.prefixes.pub);
if (args.includes('-dev')) {
	process.env.PREFIX = String(config.prefixes.dev);
}
if (args.includes('-deb')) {
	process.env.DEB = true;
}

try {
	(async () => {

		const commands = [];
		const cmdDir = fs.readdirSync(path.join(__dirname, 'src/commands'));
		console.log('cmdDir: ', cmdDir);

		// Now we load each directory in the commands folder
		for (const dir of cmdDir) {
			const files = await fs.readdirSync(path.join(__dirname, 'src/commands/' + dir));
			console.log('files: ', files);
			for (const file of files) {
				const command = require(path.join(__dirname, 'src/commands/' + dir + '/' + file));
				console.log('Registering command: ', command.data.name, ' from file: ', path.join(__dirname, 'src/commands/' + dir + '/' + file));
				commands.push(command.data.toJSON());
			}
		}

		const rest = new REST({ version: '9' }).setToken(process.env.DEV_TOKEN);

		// this is basically....
		// async function ppoop(){}; pooop(); 
		// Wihtout doing that. Much simpler.
		for (const guild of config.guilds) {
			console.log('guild: ', guild);
			await rest.put(Routes.applicationGuildCommands(config.clients.dev, guild), { body: commands })
				.then(() => console.log('Successfully registered application commands.'))
				.catch(console.error);
		}
	})();
} catch (err) {
	cconsole.error('[', new Date().toUTCString(), ']\n Something went wrong\nIN:', path.join(__dirname, __filename), '\n', err);
	return;
}