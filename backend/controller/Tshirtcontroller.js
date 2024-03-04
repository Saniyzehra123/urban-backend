const asyncHandler = require('express-async-handler')
const Tshirt= require("../models/tshirtModel")

//get
// const getTshirt =  asyncHandler (async (req,res) =>{
  
//     const  tshirt = await Tshirt.find()
//     res.status(200).json(tshirt)
// } )


const getTshirt = asyncHandler(async (req, res) => {
    try {
        const query = {};
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.total_record) || 15;

        if (req.query.color) {
            query.color = req.query.color;
        }
        if (req.query.price) {
            query.price = { $lte: req.query.price };
        }
        if (req.query.size) {
            query.size = { $lte: req.query.size };
        }
        if (req.query.search) {
            query.$or = [
                { color: { $regex: req.query.search, $options: 'i' } },
                // Assuming you want to search by color and title
                { title: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        const tshirt = await Tshirt.find(query)
            .skip((page - 1) * size)
            .limit(size)
            .lean()
            .exec();

        const totalPage = Math.ceil((await Tshirt.find(query).countDocuments()) / size);
        res.status(200).json({ tshirt, totalPage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


// const getTshirtbyid = async (req, res)=>{
   
//     const  tshirt  =await Tshirt.findById(req.params.id)
//     if(!tshirt ){
//         res.status(400)
//         throw new Error("Tshirt not found")
//      }

    
//     res.status(200).json(tshirt)

// }
 

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

// GET a tshirt by ID
const getTshirtById = asyncHandler(async (req, res) => {

    const tshirt = await Tshirt.findById(req.params.id);
    
    if (!tshirt) {
    res.status(404).json({ error: 'tshirt not found' });
    } else {
    res.status(200).json(tshirt);
    }
});
 
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
    getTshirtById,
    deleteTshirt
}