const asyncHandler = require('express-async-handler')
const  CartItem = require ('../models/cartModel')
const Product = require("../models/tshirtModel")
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

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      let cartItem = await CartItem.findOne({ product: product});
  
      if (cartItem) {
         cartItem.quantity++;
      } else {
        cartItem = new CartItem({
          product: product,
          // user: userId,
          // price: product.price
        });
      }
  
      await cartItem.save();
      let returnData={
        status:true,
        message:'Product added to your cart',
        data:cartItem
       }
      res.status(201).json(returnData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
)

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
module.exports={
  setCart,
  getCart,
  updateCart,
  deleteCart 
}