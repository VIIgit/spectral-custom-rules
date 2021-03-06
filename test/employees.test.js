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
    return lintAndcompare(spectral, apiSpec, 'rule-unsupported-oas', 'employees.test');
  });

  test('rule-supported-type-string-formats', () => {
    return lintAndcompare(spectral, apiSpec, 'rule-supported-type-string-formats', 'employees.test');
  });

  test('rule-unused-reuseable-object', () => {
    return lintAndcompare(spectral, apiSpec, 'rule-unused-reuseable-object', 'employees.test');
  });

  test('rule-value-equal', () => {
    return lintAndcompare(spectral, apiSpec, 'rule-value-equal', 'employees.test');
  });
  
  test('rule-attribute-name', () => {
    return lintAndcompare(spectral, apiSpec, 'rule-attribute-name', 'employees.test');
  });
  
});

