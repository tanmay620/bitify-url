const user=require('../modules/user')
//const {v4: uuidv4} = require('uuid')
const {getUser,setUser}=require('../services/auth')

async function handleUserSignUp(req,res){
    const { name, email, password } =req.body
    await user.create({
        name,email,password
    })
    return res.render('home')
}

async function handleUserLogin(req,res){
    const {email,password}=req.body
    const userID=await user.findOne({email,password})
    if(!userID){
        return res.status(200).render('login',{
            error:"invalid Username or password"
        })
    }
    //const sessionID=uuidv4()
    //setUser(sessionID,userID)
    const token=setUser(userID)
    // res.cookie('uid',sessionID)
    res.cookie('token',token)
    return res.status(200).redirect('/')
}

module.exports={
    handleUserSignUp,
    handleUserLogin,
}