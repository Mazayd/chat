const crypto = require('crypto');

function encryptedDataByUserPubKey(data, pub_key) {
	const encryptedData = crypto.publicEncrypt(pub_key, Buffer.from(data));
	return encryptedData.toString('base64');
}

function encryptionRoomKeyAndIvByUserPubKey(key, iv) {
	const pub_key =
		'-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAxRCi3Yx/uN7Gg5J+YWpw\nAr3ghoiavQ7CZdGlH6VnWP/4Js4Y1Y4xyOFJhCIQH3TipIxu+PjUuVDs6WTghJlf\nMjMugpARUl8fN2XtDyFklQMmHiuzGtnF70cxcFb1qdFJXiQwv9DMk71UStnYykPV\nAEEk+mdxNggSZxOEuwvaV3YrsP+Hdf6XWluFOOwv7CAyZJasGMEV5en/Kkvlnt6W\n8LfIAm9tc1zRdypgwmRWmccf+N/y+lrXq0AZwrcZ7F/PUtIpDIXqlHLZneDLubhv\nuYqvcxN5Pjzbl2npSeJU4rQurvVlem8CDZzhrCgBf0ZAFIkrO8+t8i5fATmuljuU\nUYBeGuj1+QzV9sWb/AikS7+6XcFrVgmLPMGlJyiL8umUuS0ILgXmV9nWG3oQP3r2\nceLhlIqvj47qIFapmTCIIzYo63AX41KJz1ahGk1kllCJKz6ES1n7ahDqBodrpmKi\nqVuLiCJ4juAn/UC8TS+l8WeeGlImQJJGP0Z+fK/jS1nVByOxFMPTin3dUikw/+Eq\nNXxVP7aAEpmbzq4dtxabMaMDl3adXvdL00XVcBEG89VsBMNp715dBlo45FMptfDM\n06PkckFT674Ig9KZq1rO4ZFSh3dBxhLFjWNAZ5ovbaBLPOPaR3ZdI8VZWSZOEluT\no+1h086kuega6k56iuNETjMCAwEAAQ==\n-----END PUBLIC KEY-----';
	const encryptionKey = encryptedDataByUserPubKey(key, pub_key);
	const encryptionIv = encryptedDataByUserPubKey(iv, pub_key);
	return [encryptionKey, encryptionIv];
}

module.exports = {
	encryptionRoomKeyAndIvByUserPubKey,
};
