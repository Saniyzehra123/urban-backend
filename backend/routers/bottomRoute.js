const express = require('express')
const { getBottom, setBottom, updateBottom,deleteBottom, getBottomById} = require("../controller/Bottomcontroller")
const dotenv = require("dotenv").config()

const router=express.Router();

router.route("/").get(getBottom).post(setBottom);
router.route("/:id").delete(deleteBottom).put(updateBottom).get(getBottomById);

module.exports=router
