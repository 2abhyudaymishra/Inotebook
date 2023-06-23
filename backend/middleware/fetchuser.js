const jwt = require('jsonwebtoken');
const JWT_SECRET = "abyudaymishra12345$7";

const fetchuser =(req,res,next )=>{
    const token = req.header('auth-token');
    if(!token ){
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try{
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        // this will run the next parameter where- ever this middleware is user eg. in /routes/auth.js 
        next();
    }catch(error){
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchuser;