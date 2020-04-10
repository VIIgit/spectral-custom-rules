
var fs = require('fs');
const yaml = require('js-yaml');
const { join } = require('path');

function loadFile(file){
    let fileContents = fs.readFileSync(file, 'utf8');
    return  yaml.safeLoad(fileContents);
}

function lintAndcompare(spectral, apiSpec, ruleFileName, usecaseName){

    let resultFolderName = './test/' + (usecaseName ? usecaseName : 'unknown_usecaseName');
    
    if (!fs.existsSync(resultFolderName)){
        console.log('Initialize ' + resultFolderName);
        fs.mkdirSync(resultFolderName);
    }
    
    let resultName = resultFolderName + '/' + ruleFileName ;
    return spectral.loadRuleset(join(__dirname, '../ruleset/', ruleFileName + '.yaml'))
        .then(() => spectral.run(apiSpec))
        .then(results => {

            let resultJson = JSON.stringify(results,null,2);

            fs.writeFile( resultName + '.result.json', resultJson, function (err) {
                if (err) throw err;
            });
            
            let expectedResultName = resultName + '.expected.json';

            fs.access(expectedResultName, fs.F_OK, (err) => {
                if (err) {
                    fs.writeFile( expectedResultName, resultJson, function (err) {
                        console.log(expectedResultName + ' initially created!');
                    });
                }
            })
            let expected = loadFile(expectedResultName);  
            results = JSON.parse(resultJson);
            return expect(results).toEqual(expected);
        });
}

module.exports = { lintAndcompare: lintAndcompare, loadFile: loadFile};



    