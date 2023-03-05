const errorHandler = (err,req,res,next) => {
const statusCode = res.statusCode ? res.statusCode : 500

res.status(statusCode)
 res.json ({
    ///just send the message of error
    message:err.message,
    ///send the errormessage in detail with stack
    stack: process.env.NODE_ENV === "production" ? null :err.stack
 })

}
module.exports= {
    errorHandler,
}