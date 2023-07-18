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
    if (currentUser) {
        return done(null, currentUser);
    }
    currentUser = await user.create({
        githubId: profile.id
    })
    return done(null, currentUser);
}));

module.exports = passport;