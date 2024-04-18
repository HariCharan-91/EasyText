// Define the schema for the PDF Document collection
const mongoose = require('mongoose');


// This modle is for the pdf data upload

// const pdfDocumentSchema = new mongoose.Schema({
    
//     filename: { 
//         type: String, 
//         required: true 
//     },
//     upload_date: { 
//         type: Date, 
//         default: Date.now 
//     },
//     pdf_data: { 
//         type: Buffer, 
//         required: true 
//     },

// });

// module.exports = mongoose.model('PDFDocumentSchema', pdfDocumentSchema)


const ImageSchema = new mongoose.Schema({
  image_url: {
    type: String,
    required: true,
  },
  annotation_type: {
    type: Number,
    required: true
  },
  page_number: {
    type: Number,
    required: true
  }
});

const HighlightSchema = new mongoose.Schema({
  Red: [String],
  Green: [String],
  Blue: [String],
  Pink: [String],
  Yellow: [String]
});


const PDFFiles = new mongoose.Schema({
    filename: {
      type: String,
      required: true,
    },
    stored_filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
      unique : true
    },
    size: {
      type: Number,
      required: true,
      min: 0 // Ensure size is non-negative
    },
    image : [ImageSchema],
    highlight: [HighlightSchema]
    // Add any additional metadata fields as needed
  });

module.exports = mongoose.model("PDFFiles" , PDFFiles)