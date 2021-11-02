const { createHmac, } = require('crypto');

(async () => {
	// works like hash.
	const key = await 'my-secret';
	const message = await 'This is my cool message';
	const hmac = await createHmac('sha512', key).update(message).digest('base64');
	console.log('hmac: ', hmac);

	const key2 = await 'oh-no-my-panties';
	const hmac2 = await createHmac('sha512', key2).update(message).digest('base64');
	console.log('hmac2: ', hmac2);
})();