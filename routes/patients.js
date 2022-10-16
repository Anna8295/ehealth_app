//getting the endpoints from client request to get only the patient and their therapies
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');

require('../routes/records');

const User = require('../models/user');
const Record = require('../models/record');

router.get('/index', isLoggedIn, catchAsync(async (req, res) => {
    const patients = await User.find({'role': 'patient'});
    res.render('patients/index', { patients })
}));

router.get('/:id/records', (async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
    const records = await Record.find({'author': user}).populate('author');
    console.log(id)
    console.log(records);
    res.render('patients/records', { records })
}));



module.exports = router;