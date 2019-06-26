import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*----------------------------------------------------------------------------*/
/* TODO: this code will be probably moved to the component that will be
 * responsible to render the dog breeds list.
 */

import DataSource from './DataSource.js';

// Global variable where dog breeds are stored.
window.breeds = null;

// Call back used to consume dog breeds when they are loaded.
function getBreedsCallback(breeds) {
	console.log(breeds);
	window.breeds = breeds;
}
/*----------------------------------------------------------------------------*/

class App extends Component {
	constructor(props) {
		super(props);

		// Test the above code. Create a DataSource.
		let ds = new DataSource();

		// Get all the breeds asyncronously and store them into window.breeds
		// when done.
		ds.getBreeds(getBreedsCallback);
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
						Learn React
					</a>
				</header>
			</div>
		);
	}

}

export default App;
