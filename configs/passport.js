const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('../controllers/users');

passport.use('local', new LocalStrategy({usernameField: 'email'}, function(email, password, done) {
        users.findOne({email: email}, function(err, user) {
            console.log(users);
            // if (err) {
            //     return done(err);
            // }

            // if (!user) {
            //     return done(null, false, {message: 'Incorrect username'});
            // }

            // if (!user.validPassword(password)) {
            //     return done(null, false, {message: 'Incorrect password'});
            // }

            // return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    users.findById(id, function (err, user) {
        done(err, user);
    });
});