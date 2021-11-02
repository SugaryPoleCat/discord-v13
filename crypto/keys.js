const { generateKeyPairSync,
	publicEncrypt,
	privateDecrypt, } = require('crypto');

(async () => {
	// KEY PAIR ENCRYPTION
	// you use this method everytime you log into HTTPS sites.
	// you need private and public keys. you can share public keys, BUT NOT PRIVATE.
	// NEVER SHARE PRIVATE
	const { privateKey, publicKey } = await generateKeyPairSync('rsa', {
		modulusLength: 2048, //the length of key, not needed for ed25519
		publicKeyEncoding: {
			type: 'spki', // recommended by nodejs
			format: 'pem',
		},
		privateKeyEncoding: {
			type: 'pkcs8', // recommended by nodejs
			format: 'pem', // recommended
			// YOU CAN ADD THESE FOR ADDED SECURITY
			cipher: 'aes256',
			// could hash a passphrase ooo
			passphrase: 'super secret',
		},
	});

	console.log('private key: ', privateKey);
	console.log('Public key: ', publicKey);

	module.exports = {
		privateKey, publicKey
	}
})();