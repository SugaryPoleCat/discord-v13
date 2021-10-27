const path = require('path');
module.exports = {
	name: path.basename(__filename, '.js'),
	events: {
		interactionCreate: async (client, interaction) => {
			console.log('interactionCreate');
			// console.log('interaction: ', interaction);
			if (interaction.user.bot == true) {
				console.log('user is a bot');
				return;
			}
			if (!interaction.isCommand()) {
				console.log('it was not a command');
				return;
			}

			// THHIS will grab the PROPERTY from INTERACTIOn object, called commandName.
			// If you console.log(interaction) you will see there is at the bottom,
			// a commandName property and comandId. We dont know the commandId.
			// So we must check by commandName;
			const { commandName } = interaction;

			if (commandName === 'choicetest') {
				// interaction.reply('This is a choice test');
				console.log(interaction.options);
				console.log(interaction.options[0]);
				if (interaction.options.name === 'category') {
					console.log('category is category');
					if (interaction.options.value === 'gif_funny') {
						interaction.reply('this is a funny gif, laugh.');
					}
				}
			} else if (commandName === 'ping') {
				console.log(interaction);
				interaction.reply('pong!');
			}
		},
	}
}