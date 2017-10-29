var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    user_id: {type: Number, required: true, index: true},
    book_number: {type: Number, required: true},
    rate: {type: Number, required: true,},
    genre : {type:String},
});

var Users = mongoose.model("users", Schema);


module.exports = Users;