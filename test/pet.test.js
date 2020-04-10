const {
    Spectral,
    isOpenApiv2
} = require('@stoplight/spectral');
const spectral = new Spectral();

const {lintAndcompare, loadFile} = require('../src/testRuleSet');

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
});

test('pet.yaml', () => {
    return lintAndcompare(spectral, apiSpec, 'rule-deprecated-oas', 'pet.test');
});

test('rule-unused-reuseable-object', () => {
    return lintAndcompare(spectral, apiSpec, 'rule-unused-reuseable-object', 'pet.test');
});
