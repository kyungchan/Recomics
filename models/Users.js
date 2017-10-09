var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: {type: String, required: [true, "유저명을 입력해주세요."], trim: true},
    id: {type: String, required: [true, "ID를 입력해주세요."], index: true, unique: true, trim: true},
    password: {type: String},
    ifRoot : {type:Boolean, default:false},
    createdAt: {type: Date, default: Date.now},
});

var Users = mongoose.model("users", Schema);

module.exports = Users;