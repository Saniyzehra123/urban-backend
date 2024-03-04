const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require('./config/db')
const cors = require("cors");
const port = process.env.PORT || 8080
// const {router  } =require("./routers/productRoute")
connectDB()

const app = express()

// app.get("/api/bottom",(req,res)=>{
//     res.json({message:"get bottom"})
// })

app.use(express.json ())
app.use(cors());

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  

app.use(express.urlencoded({extended:false}))

app.use("/api/shirt",require("./routers/productRoute"))
app.use("/api/users",require("./routers/userRoute"))
app.use("/api/tshirt",require("./routers/tshirtRoute"))
app.use("/api/bottom",require("./routers/bottomRoute"))
app.use("/api/cart",require("./routers/cartRoute"))


 app.use(errorHandler)
 

app.listen(port,() => console.log(`server start ${port}`))
