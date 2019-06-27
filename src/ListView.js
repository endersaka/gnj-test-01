/**
 * Module containing the ListView Component.
 *
 * @type {Object}
 */

// Import required modules.
import React, { Component } from 'react';
import ListItem from './ListItem';
import DataSource from './DataSource';
import {undefinedStr, capitalize, objOwnsProp, exists, errorInfo} from './utilities';

/**
 * This Component is responsible to present the list of breeds to the user.
 *
 * @extends Component
 */
class ListView extends Component {
	constructor(props) {
		super(props);

		console.log(undefinedStr);

		this.state = {
			json: 'undefined',
			items: []
		};

		// Test the above code. Create a DataSource.
		this.ds = new DataSource('https://dog.ceo/api/breeds/list/all');
		this.ds.setDelegate(this);
		console.log('DataSource:', this.ds);

		// Get all the breeds asyncronously and store them into window.breeds
		// when done.
		this.ds.getData();
	}

	responseJSONCallback(json) {
		// Update the state of this component adding the loaded JSON as its own
		// property.
		this.setState({json: json});
		console.log('this.state:', this.state);

		if (json.status === 'success')
		{
			if (typeof json.message === 'object')
			{
				// Prepare an Array to store the name of each breed.
				if (json.message !== null)
				{
					// We will collect all the breeds in this array.
					let breeds = [];

					// Cycle throwgh the keys of the json.message object.
					for (var key in json.message)
					{
						// Consider the keys only if they are object own
						// properties and are not hinerited from the prototype
						// chain.
						if (json.message.hasOwnProperty(key))
						{
							// We should check if each value associated to a key
							// respond to certain requisites.
							// First of all we should check if the type of the
							// variable is 'object'.
							if (typeof json.message[key] === 'object')
							{
								// Second, we check if it is an Array.
								if (json.message[key].constructor === Array)
								{
									// And finally we check if its lenght is
									// greater then 0.
									if (json.message[key].length > 0)
									{
										let baseBreedName = key;
										let breedNames = json.message[key].map((subBreedName, index) => subBreedName + ' ' + baseBreedName);

										breeds = breeds.concat(breedNames);
									} else {
										console.warn('\'%s\' breed has no children! Using its base name, obtaiend by key.', capitalize(key));

										breeds[breeds.length] = key;
									}
								} else {
									console.warn('The breed %s is not an Array but %s!', key, json.message[key].constructor.name);

									breeds[breeds.length] = key;
								}
							} else {
								console.warn('The breed %s is not of type \'object\'!', key);

								breeds[breeds.length] = key;
							}
						}
					}

					// console.log('breeds:', breeds);
					// console.log('this.state:', this.state);

					this.setState({ breeds: breeds });
					console.log('this.state after breeds update:', this.state);
				} else {
					console.error('json.message is an object of type \'object\' but his value is NULL!');
				}
			} else {
				console.error('json.message is not an object of type \'object\'');
			}
		} else {
			console.error('json.status value is not equal to \'success\'! It\'s value is', json.status);
		}

	}

	dataSourceDelegateCallback() {
		// Response.json() returns a Promise, that's why we have to use
		// Promise.then().
		// Read https://developer.mozilla.org/en-US/docs/Web/API/Body/json and
		// https://developer.mozilla.org/en-US/docs/Web/API/Response#Methods
		this.ds.response.json().then(
			this.responseJSONCallback.bind(this)
		);
	}

	render() {
		let breedItems;

		if (exists(this.state.breeds)) {
			breedItems = this.state.breeds.map(
				(breed, index) => { return (
					<ListItem label={breed} />
				); }, this
			);
		} else {
			console.warn('this.state.breeds');
		}

		return (
			<ul>
				{breedItems}
			</ul>
		);
	}
}

export default ListView;
