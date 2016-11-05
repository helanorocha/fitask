var passport = require('passport');

	module.exports = function(app) {

		app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

		app.get('/auth/google/callback',
			passport.authenticate('google', {
                    successRedirect : '/',
                    failureRedirect : '/failed'
            }));

		app.get('/logout', function(req, res){
			req.logout();
			res.redirect('/off');
		})
}
