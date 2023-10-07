function generateRandomString(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}
	return result;
}

function generateRandomKeyAndIv() {
	const key = generateRandomString(32);
	const iv = generateRandomString(16);
	return [key, iv];
}

module.exports = {
	generateRandomKeyAndIv,
};
