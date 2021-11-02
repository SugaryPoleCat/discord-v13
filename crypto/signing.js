const { createSign,
	createVerify } = require('crypto');
const { privateKey, publicKey } = require('./keys');

(async () => {
	// SIGNING
	// siging puts a "stamp" on it, that during decryption, knows that it could be tampered with
	// and hacker or someone is unable to access data then.

	// RSA + SHA
	const signMsg = await 'This is top secret dude.';
	const signer = await createSign('rsa-sha256');
	await signer.update(signMsg);
	// sign the key.
	const signature = await signer.sign(privateKey, 'base64');
	console.log('signature: ', signature);

	// NOW TO VERIFY, WITHOUT DECRYPTING FIRST. you may choose to decrupt later.
	const verifier = await createVerify('rsa-sha256');
	await verifier.update(signMsg);
	const isVerified = await verifier.verify(publicKey, signature, 'base64');

	// if its verified, 
	// go to deciphering.
	// else cancel.
	// this is why signing is great.

	console.log('Is verified: ', isVerified);
})();