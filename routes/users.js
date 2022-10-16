//getting the endpoints from client request for showing the profile
//manualy registrate and saving the user
//log in and log out
const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

const User = require('../models/user');

router.get('/profile', async (req,res)=>{
    if(!req.user){
        req.flash('error', 'First you need to sign up!');
        res.redirect('/');
    }else{
        res.render('users/profile',{user: req.user});
    }    
})

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password, role } = req.body;
        const user = new User({ email, username, role });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome in eHealth app!');
            res.redirect(`/profile`);
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}));


router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect : '/profile',
        failureRedirect: '/login',
        failureFlash : true
    })(req,res,next) 
})

router.get('/logout', (req, res, next) => {
    req.logout(function(err){
        if(err){
            return next(err); 
        }
        req.flash('success', "Goodbye!");
        res.redirect('/');
    });
})

module.exports = router;