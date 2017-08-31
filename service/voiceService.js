module.exports = {
	checkVoice: function (req, res, next) {
		if (typeof req.cookies.voice !== 'undefined') {
			if (req.cookies.voice) {
			  res.locals.voice = true;
			}
		}

		return next();
	}
}