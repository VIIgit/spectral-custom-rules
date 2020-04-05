const {
    Spectral,
    isOpenApiv2,
    isOpenApiv3
} = require('@stoplight/spectral');
const spectral = new Spectral();
const { join } = require('path');

const fs = require('fs');
const yaml = require('js-yaml');

let apiSpec;

beforeAll(() => {
    spectral.registerFormat('oas2', isOpenApiv2);
    spectral.registerFormat('oas3', isOpenApiv3);
    
    let fileContents = fs.readFileSync('./test/pet.yaml', 'utf8');
    apiSpec = yaml.safeLoad(fileContents);

});

test('pet.yaml', () => {

    let expected = [ { code: 'my-deprecated-oas2',
        message: 'Migrate your Swagger 2.0 file to a newer OAS3 version',
        path: [ 'swagger' ],
        severity: 1,
        range:
        { start: { line: 1, character: 13 },
        end: { line: 1, character: 18 } } } 
    ];

    return spectral.loadRuleset(join(__dirname, '../.spectral.json'))
        .then(() => spectral.run(apiSpec))
        .then(results => {
            
            let exp = JSON.stringify(expected);
            let res = JSON.stringify(results);

            console.log("results >>>>>>>>>>>>>>>>>>>");
            console.log(results);
            console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<");
            expect( exp).toBe(res);
        });

});
