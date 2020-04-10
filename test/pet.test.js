const {
    Spectral,
    isOpenApiv2,
    isOpenApiv3
} = require('@stoplight/spectral');
const spectral = new Spectral();
const { join } = require('path');

const loadFile = require('./test.utils');

const expected = [ { code: 'rule-deprecated-oas',
        message: 'Migrate your Swagger 2.0 file to a newer OAS3 version',
        path: [ 'swagger' ],
        severity: 1,
        range:
        { start: { line: 1, character: 13 },
        end: { line: 1, character: 18 } } } 
    ];

const apiSpec = loadFile('./test/pet.yaml');  

beforeAll(() => {
    spectral.registerFormat('oas2', isOpenApiv2);
    spectral.registerFormat('oas3', isOpenApiv3);
});

test('pet.yaml', () => {

    return spectral.loadRuleset(join(__dirname, '../ruleset/rule-deprecated-oas.yaml'))
            .then(() => spectral.run(apiSpec))
            .then(results => {
                console.log(JSON.stringify(results,null,2));
                expect(results).toEqual(expected);
            }
        );
});
