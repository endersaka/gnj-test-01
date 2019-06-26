
class DataSource {
	constructor() {
		console.log('I am DataSource');
	}

	getBreeds(callback) {
		window.fetch('https://dog.ceo/api/breeds/list/all')
		.then(
			function(response) {
				if (response.ok) {
					return response.json();
				}

				throw new Error('Something went wrong with the response.');
			}
		)
		.then(
			function(json) {
				console.log(json.message);
				callback(json.message);
				return json.message;
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
