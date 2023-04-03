const passport = require('passport');
const config = require('config');
const GitHubStrategy = require('passport-github2').Strategy;
const mysql = require('mysql2');
const util = require('util');

const { db } = require('./db'); 
const User = require('../models/mysql/user');

passport.use(new GitHubStrategy({
        clientID: config.get('github.client.id'),
        clientSecret: config.get('github.client.secret'),
        callbackURL: `http://${config.get('app.host')}:${config.get('app.port')}/auth/github/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const user = new User(db);
            let authenticatedUser = await user.findByGithubId({
                githubId: profile.id.toString(),
            })
            
            if (authenticatedUser.length === 0) {
                const insert = await user.add({
                    githubId: profile.id.toString(),
                })

                authenticatedUser = await user.findByPk({
                    id: insert.insertId,
                })
            }

            return done(null, authenticatedUser[0]);
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
  