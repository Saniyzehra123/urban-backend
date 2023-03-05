const asyncHandler = require('express-async-handler')
 const  CartItem = require ('../models/cartModel')
 const Product = require("../models/productModel")
const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();


 

// Define cart item schema and model
 

// Add item to cart


const setCart = asyncHandler(
  async (req,res)=>{
    try {
      const { product  } = req.body;
      const products = await Product.findById(product);
      console.log("req",req)
      console.log("pduct",products) 

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      let cartItem = await CartItem.findOne({ product: product});
  
      if (cartItem) {
        // cartItem.quantity++;
      } else {
        cartItem = new CartItem({
          product: product,
          // user: userId,
          // price: product.price
        });
      }
  
      await cartItem.save();
      res.status(201).json(cartItem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
)


// app.post('/cart', async (req, res) => {
//   try {
//     const { productId, userId } = req.body;
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     let cartItem = await CartItem.findOne({ product: productId, user: userId });

//     if (cartItem) {
//       cartItem.quantity++;
//     } else {
//       cartItem = new CartItem({
//         product: productId,
//         user: userId,
//         price: product.price
//       });
//     }

//     await cartItem.save();
//     res.status(201).json(cartItem);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });




// Get cart items for a user

const getCart = asyncHandler(
  async(req,res) =>{
    try {
      const userId = req.params.userId;
      const cartItems = await CartItem.find({ user: userId }).populate('product', '-description -createdAt -updatedAt');
      res.json(cartItems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
)

// app.get('/cart/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const cartItems = await CartItem.find({ user: userId }).populate('product', '-description -createdAt -updatedAt');
//     res.json(cartItems);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// Update quantity of a cart item

const updateCart  = asyncHandler(
  async(req,res) =>{
    try {
      const cartItemId = req.params.cartItemId;
      const { quantity } = req.body;
      const updatedCartItem = await CartItem.findByIdAndUpdate(cartItemId, { quantity }, { new: true });
      res.json(updatedCartItem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
)
// app.patch('/cart/:cartItemId', async (req, res) => {
//   try {
//     const cartItemId = req.params.cartItemId;
//     const { quantity } = req.body;
//     const updatedCartItem = await CartItem.findByIdAndUpdate(cartItemId, { quantity }, { new: true });
//     res.json(updatedCartItem);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// Remove a cart item

const deleteCart  = asyncHandler(
  async(req,res) =>{
    try {
      const cartItemId = req.params.cartItemId;
      await CartItem.findByIdAndDelete(cartItemId);
      res.json({ message: 'Cart item deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
)
// app.delete('/cart/:cartItemId', async (req, res) => {
//   try {
//     const cartItemId = req.params.cartItemId;
//     await CartItem.findByIdAndDelete(cartItemId);
//     res.json({ message: 'Cart item deleted' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

module.exports={
  setCart,
  getCart,
  updateCart,
  deleteCart 
}