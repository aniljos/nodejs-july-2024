//const fs = require('fs');
const fs = require('node:fs');
const moment = require('moment');

function getFormattedDate(format){
    return moment().format(format);
}
function addDays(days, format){
    return  moment().add(days, 'days').format(format);
}


function readFromFile(filename){

    try {
        return fs.readFileSync(filename, 'utf8');
    } catch (error) {
        console.log("error reading file", error);
        return "";
    }
}
function writeToFile(filename, content){
    try {
        
        fs.writeFileSync(filename, content);
        console.log("File written successfully");

    } catch (error) {
        console.log("error writing file", error);
    }
}
module.exports = {
    readFromFile,
    writeToFile,
    getFormattedDate,
    addDays
}