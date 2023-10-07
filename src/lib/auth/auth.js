const { UserModel } = require('../../models/user.model');
const { decodedJwt } = require('./jwt');

async function auth(token) {
	try {
		const userModel = new UserModel();
		const decode = decodedJwt(token);
		const user = await userModel.getUserById(decode.id);
		if (!user.length) {
			throw new Error('Invalid credetians');
		}
		return decode;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	auth,
};
