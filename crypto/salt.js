const { scryptSync,
	timingSafeEqual,
	randomBytes, } = require('crypto');
(async () => {
	// SALT
	// sSync is more process intensive, but is more secure than normal hashing.
	const users = [];
	async function register(discordID, pass) {
		const salt = await randomBytes(16).toString('base64');
		const hashedPass = await scryptSync(pass, salt, 64).toString('base64');

		const user = await { discordID, pass: `${salt}:${hashedPass}` };

		await users.push(user);

		return user;
	}
	async function login(discordID, pass) {
		const user = await users.find(u => u.discordID === discordID);

		const [salt, key] = await user.pass.split(':');
		const hashedBuffer = await scryptSync(pass, salt, 64);
		// timing safe equal, prevents hackers from knowing the timing between sending output and such.

		const keyBuffer = await Buffer.from(key, 'base64');
		const match = await timingSafeEqual(hashedBuffer, keyBuffer);

		return match;
	}
	const DiscID = '23214332', DiscPass = 'yourMom';
	await register(DiscID, DiscPass);
	console.log('is this the right user: ', login(DiscID, DiscPass));
})();