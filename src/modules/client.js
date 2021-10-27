const path = require('path');
module.exports = {
	name: path.basename(__filename).split('.')[0],
	events: {
		ready: async (client, [message]) => {
			try {
				console.info('Ready client: ', client);
				console.info('Message: ', message);
			} catch (err) {
				await client.destroy();
				console.error('[', new Date().toUTCString(), ']\n Something went wrong \n', err);
				return process.exit(0);
			}
		}
	}
}