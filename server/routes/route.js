const express = require('express')
const route = express.Router()

// middlewares import
const {PDFupload}= require('../middleware/uploadpdf')

const uploadmiddleWare = PDFupload.single('pdf')

const {uploadPDF,getpdf,getallpdf} = require('../controllers/upload')

route.route('/upload').post(uploadmiddleWare,uploadPDF)

route.route('/getpdf').get(getallpdf)

route.route('/getpdf/:stored_filename').get(getpdf)



module.exports = route
