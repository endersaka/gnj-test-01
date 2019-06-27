
class DataSource {
	constructor(url = null) {
		this.response = null;
		this.url = url;
	}

	setDelegate(delegate) {
		// TODO: verify that delegate implements the required method.
		this.delegate = delegate;
	}

	setResponse(response) {
		this.response = response;
	}

	setURL(url) {
		this.url = url;
	}

	static count = 0;
	thenResponse(response) {
		if (response.ok) {
			this.setResponse(response);
			console.log('this.response:', this.response);

			if (typeof this.delegate === 'object') {
				// TODO: verify that delegate implements the required method.
				console.log('Call Delegate Callback...');
				this.delegate.dataSourceDelegateCallback();
			}

			return;
		}

		throw new Error('Something went wrong with the response.');
	}

	// getDataCallback(response) {
	// 	console.log(response);
	// }

	getData() {
		console.log('Executing %s.getData()...', this.constructor.name);

		// if (this.response != null) {
		// 	return this.response;
		// }

		// window.fetch('https://dog.ceo/api/breeds/list/all')
		// if (this.url == null) {
		// 	return null;
		// }

		fetch(this.url)
		.then(
			this.thenResponse.bind(this)
		)
		.catch(
			function(error) {
				console.log('window.fetch failed! "', error.message, '"');
			}
		);
	}
}

export default DataSource;
