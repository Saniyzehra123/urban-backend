const asyncHandler = require('express-async-handler')
const Bottom =  require("../models/bottomModel")


//get
const getBottom =  asyncHandler (async (req,res) =>{
  
    const  bottom = await Bottom.find()
    res.status(200).json(bottom)
} )

//post
const setBottom = asyncHandler (
    async (req, res)=>{
        //    console.log(req.body)
           if(!req.body) {
            res.status(400) 
            throw new Error( "plz add text")
           }
            
           const  bottom  = await  Bottom.create(req.body)
            res.status(200).json({ status: 'ok', data: bottom})
        } 
) 

// put
const updateBottom  = asyncHandler( async (req, res)=>{
 
 const bottom  = await Bottom.findById(req.params.id)

 if(!bottom ){
    res.status(400)
    throw new Error("Bottom not found")
 }

 const updateBottom = await Bottom.findByIdAndUpdate(req.params.id,req.body ,{
    new:true,
 })
   
    res.status(200).json(updateBottom)
}) 

// GET a bottom by ID
const getBottomById = asyncHandler(async (req, res) => {

    const bottom = await Bottom.findById(req.params.id);
    
    if (!bottom) {
    res.status(404).json({ error: 'Bottom not found' });
    } else {
    res.status(200).json(bottom);
    }
});
 
//delete
const deleteBottom  = async (req, res)=>{
   
    const  bottom =await Bottom.findById(req.params.id)
    if(!bottom){
        res.status(400)
        throw new Error("Bottom not found")
     }

     await  bottom.remove()
    res.status(200).json({id: req.params.id})

}

module.exports ={
    getBottom,
    setBottom,
    updateBottom,
    getBottomById,
    deleteBottom
}