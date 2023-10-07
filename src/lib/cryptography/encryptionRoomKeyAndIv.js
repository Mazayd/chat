const crypto = require('crypto');

function encryptionData(data) {
	const keyBuffer = Buffer.from(process.env.SECRET_KEY_HASH);
	const ivBuffer = Buffer.from(process.env.SECRET_IV_HASH);
	const algorithm = process.env.ALGORITHM_HASH;
	const cipher = crypto.createCipheriv(algorithm, keyBuffer, ivBuffer);
	const encryptedData = cipher.update(data, 'utf-8', 'hex') + cipher.final('hex');
	return encryptedData;
}

function encryptionRoomKeyAndIv(key, iv) {
	const encryptionKey = encryptionData(key);
	const encryptionIv = encryptionData(iv);
	return [encryptionKey, encryptionIv];
}

module.exports = {
	encryptionRoomKeyAndIv,
};
