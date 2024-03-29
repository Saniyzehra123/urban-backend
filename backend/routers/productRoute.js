const express = require("express")
const {getProduct,setProduct,updateProduct,deleteProduct,getProductById} = require("../controller/Productcontroller")
 
const dotenv = require("dotenv").config()
const router=express.Router()
// const {getproduct,setproduct,updateproduct,deleteproduct} =require('../controller/Productcontroller')

router.route("/").get(getProduct).post(setProduct)
router.route("/:id").delete(deleteProduct).put(updateProduct).get(getProductById)
 

// router.get("/",getProduct) 

// router.post("/",setProduct) 

// router.put("/:id",updateProduct ) 

// router.delete("/:id",deleteProduct ) 

module.exports=router
