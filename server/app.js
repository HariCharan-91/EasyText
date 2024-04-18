

const { PythonShell } = require('python-shell');

const path = require('path')

// const textpath = path.resolve(__dirname ,'scripts','text_extractor.py')



PythonShell.run('text_extractor.py', null).then(messages=>{
    console.log(messages);
  });