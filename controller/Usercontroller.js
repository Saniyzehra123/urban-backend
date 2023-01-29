const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const registerUser = asyncHandler( async(req,res) =>{
  const {firstName,lastName,email,password} = req.body

  if(!firstName || !lastName || !email || !password) {
    res.status(400)
    throw new Error('plz add all fields')
  }
    
  const userExist = await User.findOne({email})
   
  if(userExist) {
    res.status(400)
    throw new Error("User already exist")
  }

  //Hash password

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password,salt)

  //create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password:hashedPassword

  })
  if(user){
    res.status(201).json({
      _id:user.id,
      firstName:user.firstName,
      lastName:user.lastName,
      email: user.email,
      token:generateToken(user._id)
    })
    
  }
  else {
    res.status(400)
    throw new Error('Invalid user data')
  }
  // res.json({message: 'Register User'}) 
})


const loginUser = asyncHandler(async(req,res) =>{

  const {email,password}= req.body

  const user= await User.findOne({email})

  if(user &&(await bcrypt.compare(password,user.password))){
    res.json({
      _id:user.id,
      firstName:user.firstName,
      lastName:user.lastName,
      email: user.email,
      token:generateToken(user._id)
    })
  }
  else{
    res.status(400)
    throw new Error('Invalid creadentials')
  }
    // res.json({message: 'Login User'})
}
)  

//Generate jwt token

const generateToken =(id)=>{
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn:"30d",
  })
}
// const getmeUser = async(req,res) =>{
//     res.json({message: ' User data display'})
// }
 
module.exports = {
    registerUser,
    loginUser,
 
}