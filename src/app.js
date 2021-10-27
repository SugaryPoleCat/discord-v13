const fs = require('fs');
const path = require('path');
module.exports = async (client) => {
	try {
		console.log('we are in ', path.join(__dirname, __filename));

		const modules = {};
		// Load the directory
		const moduleFiles = await fs.readdirSync(path.join(__dirname, '/modules/')).filter(file => file.endsWith('.js'));
		if (client.deb == true) {
			console.log('Loaded directory: ', moduleFiles);
		}
		// loop through every module
		for (const file of moduleFiles) {
			if (client.deb == true) {
				console.log('file: ', file);
			}
			// ^ the file that has been FOUND, but now we have to load it.
			const moduleFile = await require(path.join(__dirname, '/modules/') + file);
			if (client.deb == true) {
				console.log('Module loaded: ', moduleFile.name);
			}

			// if there are any LOAD events to be done in the module, do so here.
			if (moduleFile.load) {
				await moduleFile.load(client);
				if (client.deb == true) {
					console.log('client.commands: ', client.commands);
				}
			}

			// now we have to go through the events in the moduleFIle.
			// Because we can NAME it as well as do different things with it
			// by adding to the file a property called events, we can tell teh app that ---
			// THings that happen ON events, this is what ewe do. 
			// So to find them we have to loop through them.
			for (const event in moduleFile.events) {
				// To teh modules = {} OBJECT, add arrray of events, FOR this moduyle.
				// This if checks if the array exists or not, if it doesnt, create a new array.
				if (!modules[event]) {
					modules[event] = await [];
				}
				// THEN we can try pushing things into it.
				await modules[event].push(moduleFile.events[event]);
			}
		}
		// this will print out: {
		// ready: [ events in ready ]
		// }
		if (client.deb == true) {
			console.log('modules: ', modules);
		}

		// NOW, because the bot works on client.on(EVENT, CALLBACK) logic
		// we need to make the events usable.
		// So--- we need to looop throuhg events IN the modules.
		for (const event in modules) {
			if (client.deb == true) {
				console.log('Event loaded: ', event);
			}
			if (event == 'ready') {
				await client.once(event, async (pooper) => {
					for (const m of modules[event]) {
						await m(client, pooper);
					}
				});
			} else {
				await client.on(event, async (pooper) => {
					// argsArray, will get an array from the ARGUMENTS, parsed into the event.
					// So for example, the message event gets triggered. 
					// we pass into the event, the INTERACTION callback, for example.

					// This might not even be useful....
					// const argsArray = await Array.from(arguments);
					// console.log('pooper: ', pooper);
					// console.log('argsArray: ', argsArray);
					for (const m of modules[event]) {
						// and now, we parse whatever we need into the event in the module, to make it work.
						await m(client, pooper);
					}
				});
			}
		}

		console.log(path.join(__dirname, __filename), ' LOADED');

		// TEMPORARY
		// await client.destroy();
		// process.exit(0);
	} catch (err) {
		await client.destroy();
		console.error('[', new Date().toUTCString(), ']\n Something went wrong\nIN:', path.join(__dirname, __filename), '\n', err);
		return process.exit(1).then(console.log('exited'));
	}
}