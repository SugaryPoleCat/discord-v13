const { randomBytes,
	createCipheriv,
	createDecipheriv, } = require('crypto');

(async () => {
	// ENCRYPTION
	// symmetric encryption.

	// cipher
	const symMessage = await 'this is my message';
	// amount of random bytes.
	const symKey = await randomBytes(32);
	const iv = await randomBytes(16);

	const cipher = await createCipheriv('aes256', symKey, iv);

	//ENCYPRT
	const encryptedMessage = await cipher.update(symMessage, 'utf-8', 'base64')
		+ cipher.final('base64'); // finalize the cipher, making it unable to do more cryptoing.

	console.log('Encyrpted message: ', encryptedMessage);




	//DECIPHER
	const decipher = await createDecipheriv('aes256', symKey, iv);
	const decryptMessage = await decipher.update(encryptedMessage, 'base64', 'utf-8')
		+ decipher.final('utf8');

	console.log('Decrypted message: ', decryptMessage);

	/// LIMITATION:
	// sender and reciever need to share a password.
})();