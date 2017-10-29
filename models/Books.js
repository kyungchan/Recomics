var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
	index: {type: Number, unique: true},
    title: {type: String},
    genre: {type: String},
    genre2: {type: String},
    genre3: {type: String},
    author: {type: String},
    country: {type: String},
    adult: {type: String},
    end: {type: String},
    file: {type: String}
});

var Books = mongoose.model("bookinfos", Schema);


module.exports = Books;