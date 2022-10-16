//model for our database for the data of records from patients
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    date: Date,
    therapy: String,
    note: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = mongoose.model('Record', RecordSchema);