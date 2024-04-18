const multer = require('multer')

const path = require('path')

// if you want store it in the memory 

// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })


const PDFstorage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/pdfFiles'); // Uploads folder in the current directory
    },
    filename: function(req, file, cb) {
      // Generate a unique filename by appending the current timestamp
      const uniqueFilename = file.fieldname + '_' + Date.now() + path.extname(file.originalname);
      req.uploadedFilename = uniqueFilename; // Store the filename in the request object
      cb(null, uniqueFilename);
    }
  });


const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/ImagesStorage/'); // Specify the destination directory where images will be saved
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname); // Set the filename (e.g., timestamp + original filename)
    },
  });



  const PDFupload = multer({
    storage: PDFstorage,
    limits: { fileSize: 100 * 1024 * 1024 } // Limit file size to 100MB
  })

  const ImagesUpload = multer({
    storage: imageStorage,
    // limits: { fileSize: 100 * 1024 * 1024 } // Limit file size to 100MB
  })



module.exports = { PDFupload , ImagesUpload}