var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
	index: {type: Number, unique: true},
    title: {type: String},
    genre: {type: String},
    genre2: {type: String},
    genre3: {type: String},
    author: {type: String},
    country: {type: String},
    adult: {type: Number},
    end: {type: Number},
    file: {type: String},
    score: {type: Number},
    people: {type: Number},
    avg: {type: Number},
    keyword1: {type: String},
    keyword2: {type: String}
});

var Books = mongoose.model("bookinfos", Schema);


module.exports = Books;