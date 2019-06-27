
class DataSource {
	constructor(url = null) {
		this.response = null;
		this.url = url;
	}

	setURL(url) {
		this.url = url;
	}

	getData(callback) {
		// if (this.response != null) {
		// 	return this.response;
		// }

		// window.fetch('https://dog.ceo/api/breeds/list/all')
		// if (this.url == null) {
		// 	return null;
		// }

		console.log('getData()');

		window.fetch(this.url)
		.then(
			function(response) {
				if (response.ok) {
					this.response = response;

					if (typeof callback === 'function') {
						console.log('Call Callback');
						callback(response);
					}

					return this.response;
				}

				throw new Error('Something went wrong with the response.');
			}
		)
		.catch(
			function(error) {
				console.log('window.fetch failed! "', error.message, '"');
			}
		);
	}
}

export default DataSource;
