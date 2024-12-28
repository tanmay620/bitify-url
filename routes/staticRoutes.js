const express=require('express')
const url=require('../modules/url')
const {restrictTo}=require('../middleware/auth')
const router =express.Router()

router.get('/',restrictTo(['NORMAL','ADMIN']),async (req,res)=>{
    const allurl= await url.find({createdBy:req.user._id})
    return res.render('home',{
        urls:allurl,
    })
})

router.get('/admin/urls',restrictTo(['ADMIN']),async(req,res)=>{
    const urlres= await url.find({})
    return res.status(200).render('home',{urlres})
})

router.get('/signup',(req,res)=>{
    return res.status(200).render('signup')
})

router.get('/login',(req,res)=>{
    return res.status(200).render("login")
})

module.exports=router