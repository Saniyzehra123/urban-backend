const express = require('express')
const { getBottom, setBottom, updateBottom,deleteBottom} = require("../controller/Bottomcontroller")
const dotenv = require("dotenv").config()

const router=express.Router()

router.route("/").get(getBottom).post(setBottom)
router.route("/:id").delete(deleteBottom).put(updateBottom)

module.exports=router