const fs = require('fs');
const yaml = require('js-yaml');

function loadFile(file){
    let fileContents = fs.readFileSync(file, 'utf8');
    return  yaml.safeLoad(fileContents);
}

module.exports = loadFile;