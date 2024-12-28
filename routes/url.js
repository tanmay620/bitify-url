const express= require('express')
const {generateShortUrl,handlerGetAnalytics}=require('../controllers/url.js')

const router = express.Router()

router.post('/', generateShortUrl)

router.get('/analytics/:shortID',handlerGetAnalytics)

module.exports= router