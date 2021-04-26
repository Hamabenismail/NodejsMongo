const mongoose = require('mongoose');

const task = mongoose.Schema({
    title : {
        type : String,
        required : true
    } ,
    date : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('Task',task);