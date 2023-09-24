const express = require('express')
const { getTshirt, setTshirt, deleteTshirt, updateTshirt, getTshirtById } = require("../controller/Tshirtcontroller")
const dotenv = require("dotenv").config()

const router=express.Router()

router.route("/").get(getTshirt).post(setTshirt)
router.route("/:id").delete(deleteTshirt).put(updateTshirt).get(getTshirtById)
// router.route("/:id").get(getTshirtbyid)
module.exports=router