const express=require('express')
//const mongoose=require('mongoose')
const path=require('path')
const cookieparser=require('cookie-parser')
const urlRoute=require('./routes/url')
const staticRoutes=require('./routes/staticRoutes.js')
const userRoute=require('./routes/user.js')
const {connectToMongodb}= require('./connect.js')
const url = require('./modules/url.js')
const { restrictToLoginUserOnly,restrictTo } = require('./middleware/auth.js')

const app=express()
const Port = 8000

connectToMongodb().then(()=>console.log('connected to mongodb')).catch(()=>console.log('error in connecting to mongodb'))

app.set("view engine",'ejs')
app.set('views',path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieparser())
app.use(restrictToLoginUserOnly)


app.use('/url',restrictTo(["NORMAL",'ADMIN']),urlRoute)
app.use('/user',userRoute)
app.use('/',staticRoutes)




app.get('/api/test',async (req,res)=>{
    const allurl=await url.find({})
    res.render('home',{urls:allurl})
})
app.get('/:shortID',async (req,res)=>{
    const shortID=req.params.shortID
    const entry=await url.findOneAndUpdate({
        shortID
    },{$push:{visitHistory:{timestamp: Date.now()},},})
    res.redirect(entry.redirectUrl)

})

app.listen(Port,()=> console.log(`server running on ${Port}`))