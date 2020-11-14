/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 * 
 * Created Date: November 9th, 2020  
 * Author: Mai Toyoda
 * 
 */

const unzipper = require('unzipper'),
  fs = require("fs"),
  PNG = require('pngjs').PNG,
  path = require('path');


/**
 * Description: decompress file from given pathIn, write to given pathOut 
 *  
 * @param {string} pathIn 
 * @param {string} pathOut 
 * @return {promise}
 */
//const unzip = (pathIn, pathOut) => {
  // This will unzip file

  //fs.createReadStream(pathIn)
  //.pipe(unzipper.Extract({ path: pathOut }));
//};


//wrap unzip in a prmise 

const unzip = (pathIn, pathOut) => {
  return new Promise ((resolve, reject)=>{
    fs.createReadStream(pathIn)
    .pipe(unzipper.Extract({path:pathOut}))
    .on("finish",()=>("Extraction Complted"))
    resolve()
    .on("error")
    reject()
  })
}



/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path 
 * 
 * @param {string} path 
 * @return {promise}
 */
const readDir = dir => {
  
  let filePaths = [];
  fs.readdirSync(dir).forEach(file => {
  /* This will go through all files in directory
   which is passes as an argument and return an array having paths corresponding to each file in the directory
    which is passed in argument 
  */
 
  /*
   Now grayScale function is to be called alongside passing proper params
  */
  
  
  

  });
  return filePaths;
};

 

/**
 * Description: Read in png file by given pathIn, 
 * convert to grayscale and write to given pathOut
 * 
 * @param {string} filePath 
 * @param {string} pathProcessed 
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  fs.createReadStream(pathIn)
  .pipe(
    new PNG({
      filterType: 4, // RGB 
    })
  )
  .on("parsed", function () {

    // invert color

    for (var i=0; i<=this.data.length;i+=4){
      const avg=(this.data[i]+this.data[i+1]+this.data[i+2])/3
      this.data[i]=avg
      this.data[i+2]=avg
      this.data[i=2]=avg
 
        
        // and reduce opacity
        this.data[idx + 3] = this.data[idx + 3] >> 1;
      
    }
 
    this.pack().pipe(fs.createWriteStream(pathOut));
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale
};