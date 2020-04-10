const {
  Spectral,
  isOpenApiv2,
  isOpenApiv3
} = require('@stoplight/spectral');
const spectral = new Spectral();
const { join } = require('path');

const loadFile = require('./test.utils');



const apiSpec = loadFile('./test/employees.yaml');  

beforeAll(() => {
  spectral.registerFormat('oas2', isOpenApiv2);
  spectral.registerFormat('oas3', isOpenApiv3);
});


describe('employees', () => {
  
  test(' rule-unsupported-oas', () => {
    const expected = loadFile('./test/employees.test.expected.json');  
    return spectral.loadRuleset(join(__dirname, '../ruleset/rule-unsupported-oas.yaml'))
            .then(() => spectral.run(apiSpec))
            .then(results => {
              console.log(JSON.stringify(results,null,2));
              expect(results).toEqual(expected);
            }
        );
  });

  test('rule-supported-type-string-formats', () => {

    const expected = loadFile('./test/employees.test.expected.2.json');
    return spectral.loadRuleset(join(__dirname, '../ruleset/rule-supported-type-string-formats.yaml'))
            .then(() => spectral.run(apiSpec))
            .then(results => {
              console.log(JSON.stringify(results,null,2));
              expect(results).toEqual(expected);
            }
        );
  });
});

