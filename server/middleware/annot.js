const { PythonShell } = require('python-shell');

const {func} = require("../controllers/upload")

// const python_path = './middleware/text_extractor.py'
const path = require ('path');
const { log } = require('console');

const text_extractor = path.resolve(__dirname ,'./text_extractor.py')
const Image_extractor = path.resolve(__dirname ,'./image_extract.py')


const python_TextHighlight_Middleware = (req, res, next) => {

  PythonShell.run(text_extractor, null).then((messages) => {
    
     const objectArray = messages.map(str => JSON.parse(str));
    //  console.log('Python script executed successfully:', objectArray);
  });



  next();
};

const objectfile = [];

const python_ImageHighlights_Middleware = (req, res, next) => {

  PythonShell.run(Image_extractor, null).then((messages) => {
    
     const objectArray = messages.map(str => JSON.parse(str));
    // //  console.log('Python script executed successfully:', objectArray);
    // objectArray.push(...messages.map(str => JSON.parse(str)));
    
   });
  
   
  

  next();
};





module.exports = {
  python_TextHighlight_Middleware,
  python_ImageHighlights_Middleware,
};