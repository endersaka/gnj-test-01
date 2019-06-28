/**
 *
 * @type {[type]}
 */

import { isString, isObject, isValidURL, implementsFunctionWithName } from './utilities';

/**
 * DataSource class is responsible to send HTTP/REST requests to a HTTP server
 * using Fetch API. It acts as a data interface for any React component or
 * vanilla JavaScript code that needs to access HTTP resources.
 */
class DataSource {
	constructor(url = null) {
		// Prebind methods that uses this. I just don't overuse it.
		this.responseHasBeenReceived = this.responseHasBeenReceived.bind(this);

		// Its a good practice to use setter to initialize a member property
		// since it also performs URL validation.
		this.setURL(url);

		this.response = null;
		this.delegate = null;
	}

	/**
	 * Sets the delegate object. Delegate should implement a function named
	 * dataSourceDelegateCallback() that takes one parameter: this parameter has
	 * to be an instance of Response class.
	 *
	 * @param {object} delegate The object that acts as delegate.
	 */
	setDelegate(delegate) {
		if (implementsFunctionWithName(delegate, 'dataSourceDelegateCallback')) {
			this.delegate = delegate;
		}
	}

	/**
	 * [setURL description]
	 *
	 * @param {[type]} url [description]
	 */
	setURL(url) {
		// TODO: implement validation.
		this.url = url;
	}

	responseHasBeenReceived(response) {
		console.log('Response has been received succefully. Procede...');

		if (response.ok) {
			console.log('Response appears to be ok. Procede...');

			// Store response as a member property of this object.
			if (this.response !== response) {
				this.response = response;
			}
			console.log('this.response:', this.response);


			if (implementsFunctionWithName(this.delegate, 'dataSourceDelegateCallback')) {
				console.log('Call delegate callback...');
				this.delegate.dataSourceDelegateCallback(this.response);
			}
		} else {
			throw new Error('Something went wrong with the response.');
		}
	}

	getData() {
		console.log('Executing %s.getData()...', this.constructor.name);

		// If response has been already received, go on...
		if (isObject(this.response) && this.response instanceof Response) {
			this.responseHasBeenReceived(this.response);
		}

		// We can procede only if a valid url is defined.
		// TODO: implement validation.
		if (isString(this.url) && this.url === '') {
			console.log('url is valid');
			fetch(this.url)
			.then(
				this.responseHasBeenReceived
			)
			.catch(
				function(error) {
					console.log('window.fetch failed! "', error.message, '"');
				}
			);
		}

	}
}

export default DataSource;
