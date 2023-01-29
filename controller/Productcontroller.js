const asyncHandler = require("express")


const getProduct = asyncHandler( async (req,res) =>{
    res.status(200).json({message:"Get Product"})
})

const setProduct =asyncHandler( async (req, res)=>{
    //   console.log(req.body)
       if(!req.body.text) {
        res.status(400) 
        throw new Error( "plz add text")
       }
        
        res.status(200).json({message:"Set Product"})
    })  

const updateProduct = asyncHandler(async (req, res)=>{
    res.status(200).json({message:`Update  product ${req.params.id}`})
}
)  
const deleteProduct = asyncHandler(async (req, res)=>{
    res.status(200).json({message:`Deleted  product ${req.params.id}`})
})  

module.exports={
    getProduct,
    setProduct,
    updateProduct,
    deleteProduct
}