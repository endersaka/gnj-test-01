/**
 *
 * @file		src/ListItem.js
 * @copyright	Marco Frisan 2019
 * @author		Marco Frisan <ender.saka@gmail.com>
 */

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ListView from './ListView';

class App extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div className="App">
				{/* <header className="App-header">
				</header> */}
				<main className="dog-breeds-main" role="main">
					<ListView />
				</main>
			</div>
		);
	}

}

export default App;
