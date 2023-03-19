const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            // in reality we will fetch from db according to email
            const user = {
                email: 'shahar@johnbryce.co.il',
                password: '12345678',
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username/password.' });
            }

            // in reality we'll compare hashed+salted password to saved hashed+salted password
            if (user.password !== password) { 
                return done(null, false, { message: 'Incorrect username/password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
  