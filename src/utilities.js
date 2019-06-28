/**
 * Utilities - is a set of utilities that comes from Observed project.
 * Visit https://github.com/endersaka/simple_js_object_observer for more.
 *
 * With this version I took the opportunity to refactor some identifiers and
 * to make it more reliable, plus some enanchements.
 *
 * @author Marco Frisan, ender.saka@gmail.com
 * @copyright Marco Frisan 2017-2018
 */

const undefinedStr = 'undefined';
const typeUndef = undefinedStr;
const typeStr = 'string';
const typeObj = 'object';

/**
 * Test if a variable is of type 'string' or of type 'object' but instance of
 * String class.
 *
 * @param  {any}  v The variable to test.
 * @return {Boolean}   Return true, if the variable is a string, or false, if not.
 */
function isString(v) {
	return typeof v === typeStr || v instanceof String;
}

function isObject(v) {
	return typeof v === typeObj && v !== null;
}

function isObjectInstance(v) {
	return typeof v === typeObj && v !== null && v instanceof Object;
}

function isArray(v) {
	// typeof v === typeObj && v !== null && v instanceof Array;
	return;
}

function implementsFunctionWithName(obj, funcName) {
	return isObject(obj) && obj.hasOwnProperty(funcName);
	// if (isObject(obj)) {
	// 	for (var prop in obj) {
	// 		if (prop === funcName) {
	// 			return true;
	// 		}
	// 	}
	// }
	//
	// return false;
}

function isValidURL(url) {
	if (isString(url)) {
		
	}

	return false;
}

/**
 * Transform the first character of a lowercase string to uppercase.
 * This is inspired by
 * https://dzone.com/articles/how-to-capitalize-the-first-letter-of-a-string-in
 *
 * @param  {string} str The original string, must be a 'string' object and
 * 						lowercase if you want to appreciate any effect.
 * @return {string}     Returns a string with the first letter transformed to
 * 						uppercase.
 */
function capitalize(str) {
	if (!isString(str)) {
		// TODO: better error handling.
		console.error('The variable you passed to capitalize() is not a string.');
		return null;
	}
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function exists(obj) {
  return typeof obj !== typeUndef && obj !== null;
}

function objOwnsProp(obj, prop) {
  return obj.hasOwnProperty(prop) && exists(obj[prop]);
}
var objecOwnsPropertyWithName = objOwnsProp;

function errorInfo(e) {
  console.log('Error type: ', typeof e);
  console.log('message: ', e.message);
  console.log('name: ', e.name);
  console.log('filename: ', e.fileName);
  console.log('line number: ', e.lineNumber);
  console.log('column number: ', e.columnNumber);
  console.log('stack trace: {\n%o\n}', e.stack);
}

export { undefinedStr, typeUndef, typeStr, typeObj, capitalize, objOwnsProp, exists, errorInfo, isString, isObject, isObjectInstance, implementsFunctionWithName, isValidURL, isArray };
