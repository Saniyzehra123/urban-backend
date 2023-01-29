const express = require('express')
const router =  express.Router()
const {registerUser,loginUser,getmeUser} = require('../controller/Usercontroller')

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/me', getmeUser)

module.exports = router