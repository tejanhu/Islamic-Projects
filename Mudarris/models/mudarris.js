const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const GENDERS = ["MALE", "FEMALE"];
const MudarrisSchema = new Schema({
    name: String,
    image: String,
    fee: Number,
    subject: [String],
    description: String,
    location: String
});

module.exports = mongoose.model('Mudarris', MudarrisSchema);
