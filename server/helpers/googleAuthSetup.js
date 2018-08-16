//import { access } from 'fs';
const { release } = require('os');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const {google} = require('../../config.js');
const cookieSession = require('cookie-session');
const db = require('../../db/index.js').pool;


// initiate our application to google
passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/redirect',
      clientID: google.id,
      clientSecret: google.secret
    }
    , (accessToken, refreshToken, profile, done) => {
      //console.log('profile:', profile)
      db.connect((err, client) => {
        if (err) {
          console.error('db connection error', err);
          release();
        } else {
          // no empty emails
          if (profile.emails[0].value !== '') { 
            
            let text = 'SELECT * FROM users WHERE email = $1';
            let value = [profile.emails[0].value];
            
            client.query(text, value)
              .then(res => {
              
                if (res.rows[0] === undefined ) {
                  // the email and username is not taken, so enter the user into db
                  let text = 'INSERT INTO users(first_name, last_name, username, email, google_id, profile_image_url, token) VALUES($1, $2, $3, $4, $5, $6, $7)';
                  let value = 
                    [
                      profile.name.givenName,
                      profile.name.familyName,
                      profile.displayName,
                      profile.emails[0].value,
                      profile.id,
                      profile.photos[0].value,
                      accessToken
                    ];
        
                  client.query(text, value)
                    .then(res => {})
                    .catch(err => console.error(err));
          
                }
              })
              .catch(err => console.error(err));
          }
          release();
        }
      });
      return done(null, profile);
    }
  )
);


// the session is generated and placed here
passport.serializeUser( (user, done) => {
  console.log('first');
  done(null, user); 
});

passport.deserializeUser( (user, done) => {
  console.log('deserialize ID:', user.id);
  done(null, user.id);
});