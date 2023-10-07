const jwt = require('jsonwebtoken');

function createToken(data) {
	return jwt.sign(data, process.env.SECRET_KEY_JWT);
}

function decodedJwt(token) {
	return jwt.verify(token, process.env.SECRET_KEY_JWT);
}

module.exports = {
	createToken,
	decodedJwt,
};
