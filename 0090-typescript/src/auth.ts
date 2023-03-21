import passport, { DoneCallback } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email: string, password: string, done: DoneCallback) => {
        try {
            // in reality we will fetch from db according to email
            const user = {
                email: 'shahar@johnbryce.co.il',
                password: '12345678',
            }
            if (!user) {
                return done(null, false);
            }

            // in reality we'll compare hashed+salted password to saved hashed+salted password
            if (user.password !== password) { 
                return done(null, false);
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
  