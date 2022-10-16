//getting the endpoints from client request to show, create records, and also saving to the DB
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');

const Record = require('../models/record');

router.get('/index', isLoggedIn, catchAsync(async (req, res) => {
    const records = await Record.find({'author': req.user._id});
    res.render('records/index', { records })
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('records/new');
});

router.post('/', isLoggedIn, catchAsync(async (req, res, next) => {
    const record = new Record(req.body.record);
    record.author = req.user._id;
    await record.save();
    req.flash('success', 'Successfully create a record!');
    res.redirect(`/records/${record._id}`)
}))

router.get('/:id', catchAsync(async (req, res,) => {
    const record = await Record.findById(req.params.id).populate('author');
    console.log(record);
    if (!record) {
        req.flash('error', 'Cannot find that record!');
        return res.redirect('/profile');
    }
    res.render('records/show', { record });
}));

module.exports = router;