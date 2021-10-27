const path = require('path');
module.exports = {
	name: path.basename(__filename, '.js'),
	events: {
		interactionCreate: async (client, [messages]) => {
			console.log('interactionCreate');
			console.log('messages: ', messages);
		},
		messageCreate: async (clinet, [messages]) => {
			console.log('we are in messageCreate');
		},
		message: async (client, [messages]) => {
			try {
				console.log('we are in message');
				console.log('messages: ', messages);
			} catch (err) {
				await client.destroy();
				console.error('[', new Date().toUTCString(), ']\n Something went wrong \n', err);
				return process.exit(0);
			}
		}
	}
}