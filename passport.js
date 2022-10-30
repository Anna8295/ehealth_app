//npm Passport is authentication middleware, which has a comprehensive set of strategies support authentication using a username and passport
//we are getting the users username, email from Google, Facebook and GitHub
//saving to the DB 
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GitHubStrategy = require('passport-github2').Strategy
const mongoose = require('mongoose')
const User = require('./models/user');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: '...',
        clientSecret: '....',
        callbackURL: 'http://localhost:3000/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        //get the user data from google 
        const newUser = {
            email: profile.emails[0].value,
            username: profile.displayName,
            role: 'patient'
        }
        console.log(newUser)
        try {
          //find the user in our database 
          let user = await User.findOne({ username: profile.displayName })
          if (user) {
            //If user present in our database.
            done(null, user)
          } else {
            // if user is not preset in our database save user data to database.
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.use(
    new FacebookStrategy(
        {
            clientID: '....',
            clientSecret: '....',
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            profileFields: ['email', 'name']
        }, async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                email: profile.emails[0].value,
                username: profile.name.givenName + ' ' + profile.name.familyName,
                role: 'physician'
            }
            console.log(newUser)
            try {
                let user = await User.findOne({ username: profile.name.givenName + ' ' + profile.name.familyName })
                if (user) {
                  done(null, user)
                } else {
                  user = await User.create(newUser)
                  done(null, user)
                }
              } catch (err) {
                console.error(err)
              }
        }
    )
  )

    passport.use(
        new GitHubStrategy(
            {
                clientID: '....',
                clientSecret: '....',
                callbackURL: 'http://localhost:3000/auth/github/callback',
                scope: ['user:email']
            }, 
            async (accessToken, refreshToken, profile, done) => {
              const newUser = {
                email: profile.emails[0].value,
                username: profile.displayName,
                role: 'researcher'
              }
              console.log(newUser)
              try {
                let user = await User.findOne({ username: profile.displayName })
                if (user) {
                  done(null, user)
                } else {
                  user = await User.create(newUser)
                  done(null, user)
                }
              } catch (err) {
                console.error(err)
              }
            }
          )
       )
    
  

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
