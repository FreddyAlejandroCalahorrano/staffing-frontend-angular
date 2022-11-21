import {validateDate} from "./validate-date";

describe('validate-date', () => {
  it('is valid date', (done) => {

    expect(validateDate('02/29/2001', "string")).toBe('Invalid Date');

    expect(validateDate('02/2/9/2001', "string")).toBe('Invalid Format');
    expect(validateDate('02/29/2000', "string")).toBe('Valid Date');

    expect(validateDate('02/29/2000', "boolean")).toBeTruthy()
    expect(validateDate('02/29/2001', "boolean")).toBeFalsy();

    expect(validateDate('02/27/2001', "boolean", "mm/dd/yyyy")).toBeTruthy()
    expect(validateDate('27/02/2001', "boolean", "dd/mm/yyyy")).toBeTruthy()
    expect(validateDate('27/02/2001', "boolean", "mm/dd/yyyy")).toBeFalsy();
    expect(validateDate('27/2001/02', "boolean", "dd/yyyy/mm")).toBeTruthy()
    expect(validateDate('27/02/2001', "boolean", "mm/mm/yyyy")).toBeFalsy()
    done()
  });
})
