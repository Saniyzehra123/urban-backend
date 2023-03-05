const asyncHandler = require('express-async-handler')
const Tshirt= require("../models/tshirtModel")

//get
const getTshirt =  asyncHandler (async (req,res) =>{
  
    const  tshirt = await Tshirt.find()
    res.status(200).json(tshirt)
} )

//post
const setTshirt = asyncHandler (
    async (req, res)=>{
        //    console.log(req.body)
           if(!req.body) {
            res.status(400) 
            throw new Error( "plz add text")
           }
            
           const  tshirt  = await  Tshirt.create(req.body)
            res.status(200).json({ status: 'ok', data: tshirt})
        } 
) 

// put
const updateTshirt = asyncHandler( async (req, res)=>{
 
 const  tshirt  = await  Tshirt.findById(req.params.id)

 if(!tshirt ){
    res.status(400)
    throw new Error("Tshirt  not found")
 }

 const updateTshirt = await  Tshirt.findByIdAndUpdate(req.params.id,req.body ,{
    new:true,
 })
   
    res.status(200).json(updateTshirt)
}) 
 
//delete
const deleteTshirt = async (req, res)=>{
   
    const  tshirt  =await Tshirt.findById(req.params.id)
    if(!tshirt ){
        res.status(400)
        throw new Error("Tshirt not found")
     }

     await  tshirt.remove()
    res.status(200).json({id: req.params.id})

}

module.exports={
    getTshirt,
    setTshirt,
    updateTshirt,
    deleteTshirt
}