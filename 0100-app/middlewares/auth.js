const passport = require('passport');
const config = require('config');
const GitHubStrategy = require('passport-github2').Strategy;
const mysql = require('mysql2');
const util = require('util');

const pool = mysql.createPool({
    host: config.get('mysql.host'),
    user: config.get('mysql.user'),
    password: config.get('mysql.password'),
    database: config.get('mysql.database'),
    connectionLimit: 10,
    waitForConnections: true,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
}) 

pool.query = util.promisify(pool.query);
pool.execute = util.promisify(pool.execute);

passport.use(new GitHubStrategy({
        clientID: config.get('github.client.id'),
        clientSecret: config.get('github.client.secret'),
        callbackURL: `http://${config.get('app.host')}:${config.get('app.port')}/auth/github/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // in reality we will fetch from db according to email
            let user = await pool.execute(`
                select * from users where id = ?
            `, [profile.id] )
            if (!user) {
                user = await pool.execute(`
                    insert into users(username) values(?)
                `, [profile.id] );
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
  