const {model, Schema} = require ('mongoose');

const cartSchema = new Schema({
    name: {type: String, required: true, unique: true},
    img: {type: String, required: true},
    amount: {type: Number, required: true},
    price: {type: Number, required: true}
});

module.exports = model('Cart', CartSchema);