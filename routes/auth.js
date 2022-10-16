//getting the endpoints from client request from the button Sign up Google/Facebook/Github
const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/google', 
    passport.authenticate('google', { scope: ['profile','email'] })
)

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile')
  }
)

router.get('/facebook', 
    passport.authenticate('facebook', { scope: 'email'})
)

router.get('/facebook/callback',
  	passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile')
    }
)

router.get('/github', 
    passport.authenticate('github', { scope: [ 'user:email' ] })
)

router.get('/github/callback',
  	passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile')
    }
)

module.exports = router