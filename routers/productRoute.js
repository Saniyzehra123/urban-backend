const express = require("express")
const {getProduct,setProduct,updateProduct,deleteProduct} = require("../controller/Productcontroller")
const { getTshirt } = require("../controller/Tshirtcontroller")
const dotenv = require("dotenv").config()
const router=express.Router()
// const {getproduct,setproduct,updateproduct,deleteproduct} =require('../controller/Productcontroller')

router.route("/").get(getProduct).post(setProduct)
router.route("/:id").delete(deleteProduct).put(updateProduct)

router.route("/tshirt").get(getTshirt)

// router.get("/",getProduct) 

// router.post("/",setProduct) 

// router.put("/:id",updateProduct ) 

// router.delete("/:id",deleteProduct ) 

module.exports=router
