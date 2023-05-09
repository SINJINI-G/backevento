const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET

const auth = async (req, res, next) => {
    const token = req.cookies.jwttoken
    if(!token){
        res.status(403).json({error: "you don't have permission"})
    }
    else{
        try{
            const data = jwt.verify(token, JWT_SECRET)
            req.token = token
            req.user = data.username
            next()
        }
        catch{
            res.status(403).json({error: "you don't have permission"})       
        }
    }
}

module.exports = auth;