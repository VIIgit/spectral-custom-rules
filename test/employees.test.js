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
    
    let fileContents = fs.readFileSync('./test/employees.yaml', 'utf8');
    apiSpec = yaml.safeLoad(fileContents);

});

test('employees.yaml', () => {

    let expected = [ { code: 'my-deprecated-oas3',
    message:
     'Update your OAS3 file to a supported version like 3.0.0, 3.0.1, 3.0.2',
    path: [ 'openapi' ],
    severity: 2,
    range:
     { start: { line: 1, character: 13 },
       end: { line: 1, character: 20 } } },
  { code: 'info-contact',
    message: 'Info object should contain `contact` object.',
    path: [ 'info' ],
    severity: 1,
    range:
     { start: { line: 2, character: 9 },
       end: { line: 5, character: 124 } } },
  { code: 'my-rule-name',
    message: 'Tags must have a description.',
    path: [ 'tags', '0' ],
    severity: 3,
    range:
     { start: { line: 8, character: 4 },
       end: { line: 9, character: 36 } } },
  { code: 'my-type-string-format',
    message:
     "must match the pattern '^(date|email)$' - format must be one of enums \n #/components/schemas/Employees/allOf/0/properties/_embedded/properties/employees/items/allOf/1/properties/email/format - format - undefined",
    path:
     [ 'components',
       'schemas',
       'Employees',
       'allOf',
       '0',
       'properties',
       '_embedded',
       'properties',
       'employees',
       'items',
       'allOf',
       '1',
       'properties',
       'email',
       'format' ],
    severity: 0,
    source: undefined,
    range:
     { start: { line: 415, character: 28 },
       end: { line: 416, character: 69 } } },
  { code: 'my-type-string-format',
    message:
     "must match the pattern '^(date|email)$' - format must be one of enums \n #/components/schemas/Employee/properties/email/format - format - emails",
    path:
     [ 'components',
       'schemas',
       'Employee',
       'properties',
       'email',
       'format' ],
    severity: 0,
    range:
     { start: { line: 457, character: 22 },
       end: { line: 457, character: 30 } } },
  { code: 'my-type-string-format',
    message:
     "must match the pattern '^(date|email)$' - format must be one of enums \n #/components/schemas/ExistingEmployee/allOf/1/properties/email/format - format - undefined",
    path:
     [ 'components',
       'schemas',
       'ExistingEmployee',
       'allOf',
       '1',
       'properties',
       'email',
       'format' ],
    severity: 0,
    source: undefined,
    range:
     { start: { line: 481, character: 10 },
       end: { line: 482, character: 51 } } },
  { code: 'my-type-string-format',
    message:
     "must match the pattern '^(date|email)$' - format must be one of enums \n #/components/schemas/EmployeesTemplates/allOf/0/allOf/0/properties/_embedded/properties/employees/items/allOf/1/properties/email/format - format - undefined",
    path:
     [ 'components',
       'schemas',
       'EmployeesTemplates',
       'allOf',
       '0',
       'allOf',
       '0',
       'properties',
       '_embedded',
       'properties',
       'employees',
       'items',
       'allOf',
       '1',
       'properties',
       'email',
       'format' ],
    severity: 0,
    source: undefined,
    range:
     { start: { line: 574, character: 10 },
       end: { line: 575, character: 52 } } },
  { code: 'my-type-string-format',
    message:
     "must match the pattern '^(date|email)$' - format must be one of enums \n #/components/schemas/EmployeesSchema/allOf/1/properties/email/format - format - undefined",
    path:
     [ 'components',
       'schemas',
       'EmployeesSchema',
       'allOf',
       '1',
       'properties',
       'email',
       'format' ],
    severity: 0,
    source: undefined,
    range:
     { start: { line: 855, character: 10 },
       end: { line: 856, character: 51 } } } ];

    return spectral.loadRuleset(join(__dirname, '../.spectral.json'))
        .then(() => spectral.run(apiSpec))
        .then(results => {
            
            let exp = JSON.stringify(expected);
            let res = JSON.stringify(results);

            console.log("results:", results);
            expect( exp).toBe(res);
        });

});
