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
				// console.log(interaction.options[0]);
				// console.log(interaction.options.name);
				// console.log(interaction.options.value);
				console.log(interaction.options._hoistedOptions[0]);
				// it seems that the options are in hoistedOptions and that is an array.
				// so i think it is possible to have multiple options and we will have to---
				// SELECT right name, then check for righ value.


				// console.log(interaction.options._hoistedOptions.name);
				// console.log(interaction.options._hoistedOptions.value);
				console.log(interaction.options._hoistedOptions[0].name);
				console.log(interaction.options._hoistedOptions[0].value);
				if (interaction.options._hoistedOptions[0].name === 'category') {
					console.log('category is category');
					if (interaction.options._hoistedOptions[0].value === 'gif_funny') {
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