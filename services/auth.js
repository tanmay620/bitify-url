//const sessionIDtoMapUser =new Map()
const jwt=require('jsonwebtoken')
require('dotenv').config()
function setUser(user){
    //sessionIDtoMapUser.set(id,user)
    const payload={
        _id:user._id,
        email:user.email,
        role:user.role,
    }
    return jwt.sign(payload,process.env.secret)
    // return jwt.sign(user,secret)
}

function getUser(token){
    //return sessionIDtoMapUser.get(id)
    try{return jwt.verify(token,process.env.secret)}
    catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
}

module.exports={getUser,setUser}