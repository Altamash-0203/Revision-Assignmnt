const jwt=require("jsonwebtoken")

module.exports=(req,res,next) => {
    let token=req.headers.authorization?.split(" ")[1]
    
    if(!token) return res.json({erroe:"No token"})

        req.user=jwt.verify(token,process.env.JWT_SECRET)
        next()

}