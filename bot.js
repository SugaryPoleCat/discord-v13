// const Discord = require('discord.js');
// We cna either do that ^
const { Client, Collection, Intents } = require('discord.js');
// or get specific tings, FROM discord js ^
const path = require('path');
const config = require(path.join(__dirname, '/config/config.json'));
require('dotenv').config();

// if we were using the Discord const, we would have to get things using:
// Discord.thing
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
client.args = [];
client.deb = false;
client.prefix = 's.';
(async () => {
	try {
		console.log('we are in ', path.join(__dirname, __filename));

		// Get process arguments for the app
		let args = await process.argv;
		args = await args.splice(2, process.argv.length);
		if (args.length > 1) {
			for (const a in args) {
				client.args.push(args[a]);
			}
		} else {
			client.args.push(args);
		}

		// Do some checks.
		if (args.includes('-dev')) {
			client.prefix = await config.prefixes.dev;
			process.env.PREFX = await config.prefixes.dev;
			process.env.TOKEN = await process.env.DEV_TOKEN;
		} else {
			client.prefix = await config.prefixes.pub;
			process.env.PREFX = await config.prefixes.pub;
			process.env.TOKEN = await process.env.PUB_TOKEN;
		}
		if (args.includes('-deb')) {
			client.deb = true;
			client.on('debug', dev => {
				console.debug('[', new Date().toUTCString(), '] DEBUG MODE ON\n', dev, '\n');
			});
		}

		const app = require(path.join(__dirname, '/src/') + 'app.js');
		await app(client);

		client.login(process.env.TOKEN);
		// client.destroy();
	} catch (err) {
		await client.destroy();
		console.error('[', new Date().toUTCString(), ']\n Something went wrong\nIN:', path.join(__dirname, __filename), '\n', err);
		return process.exit(1).then(console.log('exited'));
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