var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
	index: {type: Number, unique: true},
    title: {type: String},
    genre1: {type: String},
    genre2: {type: String},
    genre3: {type: String},
    author: {type: String},
    country: {type: String},
    adult: {type: Boolean},
    end: {type: Boolean},
    file: {type: String}
});

var Books = mongoose.model("bookinfos", Schema);


module.exports = Books;