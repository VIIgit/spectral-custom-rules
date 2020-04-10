const {
  Spectral,
  isOpenApiv2,
  isOpenApiv3
} = require('@stoplight/spectral');
const spectral = new Spectral();
const { join } = require('path');

const {lintAndcompare, loadFile} = require('../src/testRuleSet');

const apiSpec = loadFile('./test/employees.yaml');  

beforeAll(() => {
  spectral.registerFormat('oas3', isOpenApiv3);
});


describe('employees', () => {
  
  test(' rule-unsupported-oas', () => {
    return lintAndcompare(spectral, apiSpec, 'rule-unsupported-oas', 'employees');
  });

  test('rule-supported-type-string-formats', () => {
    return lintAndcompare(spectral, apiSpec, 'rule-supported-type-string-formats', 'employees');
  });

  test('rule-unused-reuseable-object', () => {
    return lintAndcompare(spectral, apiSpec, 'rule-unused-reuseable-object', 'employees');
  });

});

