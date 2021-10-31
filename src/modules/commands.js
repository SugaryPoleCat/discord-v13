const path = require('path');
const fs = require('fs');
module.exports = {
	name: path.basename(__filename, '.js'),
	load: async (client) => {
		try {
			// we load the commands folder
			const cmdDir = fs.readdirSync(path.join(__dirname, '../commands'));
			console.log('cmdDir: ', cmdDir);

			// Now we load each directory in the commands folder
			for (const dir of cmdDir) {
				const files = await fs.readdirSync(path.join(__dirname, '../commands/' + dir));
				console.log('files: ', files);
				for (const file of files) {
					const command = require(path.join(__dirname, '../commands/' + dir + '/' + file));
					if (client.deb) {
						console.log(command);
					}
					client.commands.set(command.data.name, command);
					console.log('Command loaded: ', command.data.name, ' at file: ', path.join(__dirname, '../commands/' + dir + '/' + file));
				}
			}
		} catch (err) {
			await client.destroy();
			console.error('[', new Date().toUTCString(), ']\n Something went wrong\nIN:', path.join(__dirname, __filename), '\n', err);
			return process.exit(0).then(console.log('exited'));
		}
	},
	events: {
		interactionCreate: async (client, interaction) => {
			// if (client.deb) {
			// 	console.log('interactionCreate');
			// 	console.log(interaction);
			// }
			// console.log('interaction: ', interaction);
			if (interaction.user.bot == true) {
				console.log('user is a bot');
				return;
			}
			if (!interaction.isCommand()) {
				console.log('it was not a command');
				return;
			}

			const command = client.commands.get(interaction.commandName);
			if (client.deb == true) {
				console.log('Command: ', command);
				console.log('interaction.commandName: ', interaction.commandName);
			}
			if (!command) {
				console.log('command doesnt exist');
				interaction.reply(command + ' command doesn\'t exist');
				return;
			}
			try {
				await command.fox(client, interaction);
			} catch (err) {
				console.error('[', new Date().toUTCString(), ']\n Something went wrong when processing a command \n', err);
				await interaction.reply({ content: 'There was an error', ephemeral: true });
			}
		},
	}
}