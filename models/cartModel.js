const mongoose =  require("mongoose")
const Product =require("../models/productModel")
 

// const cartSchema = new mongoose.Schema({
//     id: { type: Number, required: true },
//     title: { type: String, required: true },
//     image: { type: String, required: true },
//     price: { type:  Number, required: true },
//     cate : {type: String, required : true},
//     userId : {type: String, required : true}
// }
// ,

//   {
//      versionKey: false,
//     timestamps: true,
//    },
//  )

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
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