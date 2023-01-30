const mongoose =  require("mongoose")


const cartSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type:  Number, required: true },
    cate : {type: String, required : true},
    userId : {type: String, required : true}
}
,
  {
     versionKey: false,
    timestamps: true,
   },
 )

 module.exports = mongoose.model("Cart",cartSchema)