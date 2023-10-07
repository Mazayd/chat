const crypto = require('crypto');

function decryptionData(data) {
	const keyBuffer = Buffer.from(process.env.SECRET_KEY_HASH);
	const ivBuffer = Buffer.from(process.env.SECRET_IV_HASH);
	const algorithm = process.env.ALGORITHM_HASH;
	const decipher = crypto.createDecipheriv(algorithm, keyBuffer, ivBuffer);
	const decryptionData = decipher.update(data, 'hex', 'utf-8') + decipher.final('utf-8');
	return decryptionData;
}

function decryptionRoomKeyAndIv(key, iv) {
	const decryptionKey = decryptionData(key);
	const decryptionIv = decryptionData(iv);
	return [decryptionKey, decryptionIv];
}

module.exports = {
	decryptionRoomKeyAndIv,
};
