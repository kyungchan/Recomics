var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    userId: {type: String, required: true, index: true},
    bookId: {type: Number, required: true},
    rate: {type: Number, required: true,},
    genre : {type:String},
});

var Rates = mongoose.model("rates", Schema);


module.exports = Rates;