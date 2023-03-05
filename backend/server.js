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

app.use(express.json ())
app.use(cors());

app.use(express.urlencoded({extended:false}))

app.use("/api/v1",require("./routers/productRoute"))
app.use("/api/users",require("./routers/userRoute"))
app.use("/api/cart",require("./routers/cartRoute"))


 app.use(errorHandler)
 

app.listen(port,() => console.log(`server start ${port}`))
