const mongoose = require('mongoose')
const {Schema} = mongoose

const PromotionSchema = new Schema({
    id: { type: String, required:  true},
    brand: { type: String, required:  true},
    logo: { type: String, required:  true},
    title: { type: String, required:  true},
    description: { type: String, required:  true},
    discount: { type: String, required:  true},
    coupon: { type: String, required:  true},
})

module.exports = mongoose.model('promotions', PromotionSchema)
