const express = require("express")
const {getCart,setCart,updateCart,deleteCart} =require("../controller/Cartcontroller")

 
const dotenv = require("dotenv").config()
const router=express.Router()
  



// cartRouters
router.route("/" ).get(getCart).post(setCart)
router.route("/:id").patch(updateCart).delete(deleteCart)
module.exports=router

















// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const  Product = require("../models/productModel")

// const Cart = require("../models/cartModel");

// router.get('/add/:product',async function(req,res){

//     let slug = req.params.product;
//     await Product.findOne({slug:slug},function(err,p){
//         if(err){
//             console.log("error in / add/:product in "+err);
//         }

//         if(typeof req.session.cart == "undefine"){ 

//             req.session.cart=[];
//             req.session.cart.push({
//                 title:slug,
//                 qty:1,
//                 tt:p.tt,
//                 price:parseFloat(p.price).toFixed(2),
//                 image :"/product_image/"+p.id+"/"+p.image

//             });

//             const cart = new Cart ({
//                 title:slug,
//                 qt:1,
//                 price : parseFloat(p.price).toFixed(2),
//                 image:'/product_images/'+p._id+'/'+p.image,
//                 username:req.cookies.username 
//             });
//             cart.save(function(err){
//                 if(err){
//                     console.log(err);
//                 }else{
//                     console.log('added to cart mongodb 1st');
//                 }
//             });

//         }

//         else {
//             const cart = req.session.cart;
//             const newItem=true;
//             for(let i=0;i<cart.length;i++){
//                 if(cart[i].title==slug){
//                     cart[i].qty++;
//                     newItem= false;
//                     break;
//                 }
//             }

//          if(newItem){
//             cart.push({
//                 title:slug,
//                 qty:1,
//                 tt:p.tt,
//                 price :parseFloat(p.price).toFixed(2),
//                 image:'/product_images/'+p._id+'/'+p.image
//             });
              
//             var cart=new Cart({
//                 title:slug,
//                 qt:1,
//                 price :parseFloat(p.price).toFixed(2),
//                 image:'/product_images/'+p._id+'/'+p.image,
//                 username:req.cookies.username
//             })

//             cart.save(function(err){
//                 if(err){
//                     console.log(err);
//                 }else{
//                     console.log('added to cart mongodb');
//                 }
//             })

//          }
//         }
//         req.flash('success','Product added');
//         res.redirect('back'); 

//     })
// })