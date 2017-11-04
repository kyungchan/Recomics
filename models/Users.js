var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: {type: String, required: [true, "유저명을 입력해주세요."], trim: true},
    id: {type: String, required: [true, "ID를 입력해주세요."], index: true, unique: true, trim: true},
    password: {type: String},
    ifRoot : {type:Boolean, default:false},
    createdAt: {type: Date, default: Date.now},
    rateAction: {type: Number, default: 0},
    rateComic: {type: Number, default: 0},
    rateCooking: {type: Number, default: 0},
    rateDaylife: {type: Number, default: 0},
    rateDrama: {type: Number, default: 0},
    rateFantasy: {type: Number, default: 0},
    rateGamble: {type: Number, default: 0},
    rateHeroism: {type: Number, default: 0},
    ratePure: {type: Number, default: 0},
    rateSF: {type: Number, default: 0},
    rateSports: {type: Number, default: 0},
    rateThriller: {type: Number, default: 0},
});

var Users = mongoose.model("users", Schema);


module.exports = Users;