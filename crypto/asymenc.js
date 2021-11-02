const { publicEncrypt,
	privateDecrypt, } = require('crypto');
const { privateKey, publicKey } = require('./keys');

(async () => {
	// asymmetric encuption works well with keys.
	const keyMessage = await 'this is the end of the world...';
	const encryptedData = await publicEncrypt(
		publicKey,
		Buffer.from(keyMessage),
	);

	await console.log('Encrypt data: ', encryptedData.toString('utf-8'));

	// !!!!!!
	// YOU DONT ALWAYS NEED TO DECRYPT THE DATA.
	// SOMETIMES YOU JUST NEED TO VERIFY THE KEYS ARE TRUSTFUl.
	// THATS WHERE SIGNING CMOES IN!!!!!!
	const decryptData = await privateDecrypt(
		privateKey,
		encryptedData
	);
	// reformat the data as readable.
	await console.log('decryptData: ', decryptData.toString('utf-8'));
})();