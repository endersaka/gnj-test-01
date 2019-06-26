import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import DataSource from './DataSource.js';

window.breeds = null;

function getBreedsCallback(breeds) {
	console.log(breeds);
	window.breeds = breeds;
}

class App extends Component {
	constructor(props) {
		super(props);

		let ds = new DataSource();
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
