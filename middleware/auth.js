const {getUser}=require('../services/auth')

async function restrictToLoginUserOnly(req,res,next){
    const userUid=req.cookies?.token
    //console.log("Token from cookies:", userUid);
    
    console.log(!userUid)
    if(!userUid){
        //return res.redirect('/login')
        return next()
    }
    const user=getUser(userUid)

    if(!user){
        return res.redirect('/login')
    }
    req.user=user
    return next()
}

function restrictTo(roles){
    return function(req,res,next){
        if(!req.user) return res.redirect('/login')

        if (!roles.includes(req.user.role)) return res.end('unauthorized')

        return next()
    }
    
}

module.exports={restrictToLoginUserOnly,
    restrictTo,
}