const Discord = require('discord.js');
const { Intents } = require('discord.js');
const path = require('path');
let client;
require('dotenv').config();


// console.log('Discord: ', Discord);
(async () => {
	try {
		console.log('we are in  bot.js');
		client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS] });

		// console.log('path: ', __dirname);

		const app = require(path.join(__dirname, '/src/') + 'app.js');
		await app(client);

		

		client.login(process.env.DEV_TOKEN);
	} catch (err) {
		await client.destroy();
		console.error('[', new Date().toUTCString(), ']\n Something went wrong \n', err);
		return process.exit(0).then(console.log('exited'));
	}
})();

// Doesnt work ?
process.on('SIGTERM', () => {
	client.destroy();
	console.log('exiting');
	return process.exit(1).then(console.log)
});

// console.log('client: ', client);

// client.once('ready', (clientReady)=>{
// 	// clinetReady is just the client
// 	console.log('ready');
// })

// // it doesnt work at all. I dont know why.
// // we just have to do the slash commands i suppose now....
// client.on('messageCreate', (message)=>{
// 	console.log(message);
// })

// client.login(process.env.DEV_TOKEN);