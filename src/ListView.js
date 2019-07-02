/**
 * Module containing the ListView Component.
 *
 *
 * @file		src/ListItem.js
 * @copyright	Marco Frisan 2019
 * @author		Marco Frisan <ender.saka@gmail.com>
 */

// Import required modules.
import React, { Component } from 'react';
import ListItem from './ListItem';
import DataSource from './DataSource';
import { undefinedStr, typeUndef, typeStr, typeObj, capitalize, objOwnsProp, exists, errorInfo, isString, isObject, isObjectInstance } from './utilities';

/**
 * This Component is responsible to present the list of breeds to the user.
 *
 * @todo PictureContainer has basically the same DataSource architecture of
 * 		 ListView. Basically everything that happens from the moment it initialize
 * 		 the DataSource and the completion of the resource loading process is
 * 		 the same. I think it would be better to generalize PictureContainer and
 * 		 ListView in a super Class. (Maybe I can call it DataSourceDelegate?)
 *
 * @extends Component
 */
class ListView extends Component {
	constructor(props) {
		super(props);

		// Prebind methods that uses this. I just don't overuse it.
		this.responseJSONCallback = this.responseJSONCallback.bind(this);
		this.dataSourceDelegateCallback = this.dataSourceDelegateCallback.bind(this);

		this.eventPosition = this.eventPosition.bind(this);
		this.mouseLeave = this.mouseLeave.bind(this);

		this.startScroll = this.startScroll.bind(this);
		this.stopScroll = this.stopScroll.bind(this);

		this.listContainer = React.createRef();

		this.isScrolling = false;
		this.intervalID = null;
		this.scrollingCounter = 0;

		this.state = {
			json: 'undefined'
		};

		// Create a DataSource.
		this.ds = new DataSource('https://dog.ceo/api/breeds/list/all');

		// Set this Component as its delegate.
		this.ds.setDelegate(this);

		// Log the DataSource.
		console.log('DataSource:', this.ds);

		// Get all the breeds asyncronously and store them into window.breeds
		// when done.
		this.ds.getData();
	}

	startScroll(element, stepLength) {
		if (this.isScrolling) {
			return;
		}

		this.isScrolling = true;

		this.intervalID = window.setInterval(() => {
			element.scrollTop = element.scrollTop + stepLength;

			this.scrollingCounter++;
			console.log('this.scrollingCounter:', this.scrollingCounter);
		}, 1000 / 60);
	}

	stopScroll() {
		if (!this.isScrolling) {
			return;
		}

		if (this.intervalID === null || typeof this.intervalID === typeUndef) {
			return;
		}

		window.clearInterval(this.intervalID);

		this.scrollingCounter = 0;
		this.isScrolling = false;
		this.intervalID = null;
	}

	mouseLeave() {
		this.stopScroll();
	}

	eventPosition(e) {
		let evt = e.nativeEvent;
		let target = evt.target;

		let container = target.closest('.dog-breeds-list-container');
		// console.log('container: ', container);
		if (container === null || container !== this.listContainer.current) {
			// console.log('return...');
			return;
		}

		let rect = container.getBoundingClientRect();

		let x = evt.clientX - rect.left; // x position within the element.
		let y = evt.clientY - rect.top;  // y position within the element.
		// console.log('x: %d; y: %d', x, y);

		let scrollStepLength = 5;
		let activationDistance = 40;
		let topActivationLimit = activationDistance;
		let bottomActivationLimit = Math.round(rect.height) - activationDistance;

		console.log('execution started');

		if (y <= topActivationLimit && container.scrollTop >= scrollStepLength) {
			console.log('start to scroll up');
			this.startScroll(container, scrollStepLength * -1);
		} else if (y > topActivationLimit && y < bottomActivationLimit) {
			this.stopScroll();
		} else if (y >= bottomActivationLimit) {
			console.log('start to scroll down');
			this.startScroll(container, scrollStepLength);
		}

		// TODO: this is not perfect. I think we should take in to consideration
		// also the cases when the <ul> is fully scrolled to the top or to the
		// bottom... Even if the browser handles it by itself... In fact the
		// animation loop does not stop.
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
					let id = 0;

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
										breeds = breeds.concat(json.message[key].map(
											(name, index) => {
												return { name: name + ' ' + key, uid: id + index };
											}, id
										));
										id = breeds[breeds.length - 1].uid + 1
									} else {
										console.warn('\'%s\' breed has no children! Using its base name, obtaiend by key.', capitalize(key));

										breeds[breeds.length] = { name: key, uid: id };
										id++;
									}
								} else {
									console.warn('The breed %s is not an Array but %s!', key, json.message[key].constructor.name);

									breeds[breeds.length] = { name: key, uid: id };
									id++;
								}
							} else {
								console.warn('The breed %s is not of type \'object\'!', key);

								breeds[breeds.length] = { name: key, uid: id };
								id++;
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

	dataSourceDelegateCallback(response) {
		// Response.json() returns a Promise, that's why we have to use
		// Promise.then().
		// Read https://developer.mozilla.org/en-US/docs/Web/API/Body/json and
		// https://developer.mozilla.org/en-US/docs/Web/API/Response#Methods
		response.json().then(this.responseJSONCallback);
	}

	render() {
		let breedItems;

		if (exists(this.state.breeds)) {
			breedItems = this.state.breeds.map(
				(breed, index) => { return (
					<ListItem label={breed.name} key={breed.uid} value={breed.uid} />
				); }, this
			);
		} else {
			console.warn('this.state.breeds');
		}

		return (
			<div className="dog-breeds-list-container" onMouseMove={this.eventPosition} onMouseLeave={this.mouseLeave} ref={this.listContainer}>
				<ul>
					{breedItems}
				</ul>
			</div>
		);
	}
}

export default ListView;
