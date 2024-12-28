const {nanoid}= require('nanoid')
const url= require('../modules/url.js')

async function generateShortUrl(req , res){
    const body = req.body
    if(!body.url) return res.status(400).json({error:'url is required'})
    const urlID= nanoid(8)
    //console.log("generate short url" + req.user._id)
    //const allURLs = await URL.find({createdBy: req.user?._id});
    const newUrl=await url.create({
        shortID:urlID,
        redirectUrl:body.url,
        visitHistory:[],
        createdBy:req.user._id,
    })
    console.log("Generated URL:", newUrl);
    return res.status(200).render('home',{id:urlID})
    //return res.status(200).json({id:urlID})
}

async function handlerGetAnalytics(req,res){
    const shortID=req.params.shortID
    const result= await url.findOne({shortID})
    return res.status(200).json({totalClick:result.visitHistory.length,analytics:result.visitHistory})
}

module.exports={
    generateShortUrl,
    handlerGetAnalytics,
}