const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const User = require('../models/mysql/user');
const config = require('config');
const githubConfig = config.get('github');

passport.use(new GithubStrategy({
    ...githubConfig,
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    const user = new User(req.pool);
    let currentUser = await user.getByGithubId(profile.id);    
    if (currentUser.length > 0) {
        return done(null, currentUser[0]);
    }
    await user.create({
        githubId: profile.id
    })
    currentUser = await user.getByGithubId(profile.id);
    return done(null, currentUser[0]);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;