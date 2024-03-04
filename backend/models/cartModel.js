const mongoose =  require("mongoose")
const Product =require("./tshirtModel")

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tshirt',
    required: true
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  // quantity: {
  //   type: Number,
  //   default: 1
  // },
  // price: {
  //   type: Number,
  //   required: true
  // }
 
});
 
module.exports =  mongoose.model('CartItem', cartItemSchema);

// const cartSchema = new mongoose.Schema({
//   item: Object,
//   quantity: Number
// });

//  module.exports = mongoose.model("Cart",cartSchema)