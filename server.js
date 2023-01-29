const express = require("express")
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middleware/errorMiddleware")
const port = process.env.PORT || 8080
// const {router  } =require("./routers/productRoute")
const app = express()

app.use(express.json ())

app.use(express.urlencoded({extended:false}))

app.use("/api/v1",require("./routers/productRoute"))


 app.use(errorHandler)
 

app.listen(port,() => console.log(`server start ${port}`))
