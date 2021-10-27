const path = require('path');
module.exports = {
	name: path.basename(__filename).split('.')[0],
	events: {
		ready: async (client, interaction) => {
			try {
				console.info('Ready at: ', client.readyAt);
				// Messages is empty, but at least the client is not 
			} catch (err) {
				await client.destroy();
				console.error('[', new Date().toUTCString(), ']\n Something went wrong \n', err);
				return process.exit(0);
			}
		}
	}
}