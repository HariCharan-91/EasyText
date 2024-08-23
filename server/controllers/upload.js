const path = require('path');

const text_extractor = path.resolve(__dirname, '../middleware/text_extractor.py')
const Image_extractor = path.resolve(__dirname, '../middleware/image_extract.py')


const Upload = require('../model/ServerSchema')
const { PythonShell } = require('python-shell');
const { json } = require('express');
const { log } = require('console');

// const {func} = require('../middleware/annot.js')

const uploadPDF = async (req, res) => {

    const highlightfile = await PythonShell.run(text_extractor, null).then((messages) => {
        const objectArray = messages.map(str => JSON.parse(str));
        return objectArray
    });
    
    

    const imageHighlight = await PythonShell.run(Image_extractor, null).then((messages) => {

        const objectArray = messages.map(str => JSON.parse(str));
        return objectArray[0]
    });



    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                err: "no pdf file is uploaded"
            })
        }
        
        pdf_url = `https://easytext.onrender.com/api/pdf/${req.uploadedFilename}`

        

        const newUpload = new Upload({
            filename: req.file.originalname,
            stored_filename : req.uploadedFilename,
            path: pdf_url,
            size: req.file.size,
            highlight: highlightfile,
            image:imageHighlight
        })

        await newUpload.save()
        res.status(201).json({
            success: true,
            message: "File is uploaded successfully"
            ,newUpload
        });
    }
    catch (err) {
        console.log('Error uploading file:');
        res.status(500).send('Server error');
    }

}

const getallpdf = async (req, res) => {

    try {
        const upload = await Upload.find({})
        res.status(200).json({ upload })
    }

    catch (err) {
        console.log("Error on getting the pdf files")
        res.status(400).json({
            success: false,
            message: "Error on getting the PDF files",
            error: err
        })
    }




}

const getpdf = async (req, res) => {


    try {
        const { stored_filename: name_ } = req.params

        const pdfFile = await Upload.findOne({ stored_filename : name_ })
        
        if (!pdfFile) {
            console.log("error occured in finding name")
        }
        else {
            res.status(200).json({ pdfFile, success: true })
        }

    }

    catch (err) {
        console.log("problem in server")
    }

}

module.exports = {
    uploadPDF,
    getpdf,
    getallpdf,
}



