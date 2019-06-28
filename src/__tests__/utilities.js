import { isString, isValidURL } from '../utilities';

// it('Test isString', () => {
// 	expect(isString(`this string`)).toBeTruthy();
// 	expect(isString(``)).toBeTruthy();
// 	expect(isString('this string')).toBeTruthy();
// 	expect(isString('')).toBeTruthy();
// 	expect(isString(new String('New String'))).toBeTruthy();
// 	expect(isString(new String(''))).toBeTruthy();
// 	expect(isString(null)).toBeFalsy();
// 	expect(isString(new Object())).toBeFalsy();
// 	expect(isString({})).toBeFalsy();
// 	expect(isString(new Array())).toBeFalsy();
// 	expect(isString([])).toBeFalsy();
// 	expect(isString(546)).toBeFalsy();
// 	expect(isString(546.675)).toBeFalsy();
// 	expect(isString(new Number(546))).toBeFalsy();
// 	let notDefined;
// 	expect(isString(notDefined)).toBeFalsy();
// });

describe("URL validation...", () => {
	it('Test isValidURL', () => {
		expect(isValidURL('http://ternjs.net/doc/manual.html#plugins')).not.toBeNull();
	});
});
