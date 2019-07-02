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
import PictureContainer from './PictureContainer';

class App extends Component {
	constructor(props) {
		super(props);

		this.handleClicks = this.handleClicks.bind(this);

		this.pictureContainer = React.createRef();
	}

	handleClicks(e) {
		let target = e.target.closest('.dog-breeds-list-item');
		if (target !== null) {
			console.log('target:', target);

			let label = target.dataset['label'];
			console.log('target.dataset[\'label\']: "%s"', label);

			let labelParts = label.split(' ');
			if (labelParts.length === 1) {
				label = labelParts[0];
			} else {
				label = labelParts.reverse().join('/');
			}

			let url = `https:\/\/dog.ceo\/api\/breed\/${label}\/images\/random`;

			console.log(this.pictureContainer);
			this.pictureContainer.current.loadData(url);
		}
	}

	render() {
		return (
			<div className="App" onClick={this.handleClicks}>
				<main className="dog-breeds-main" role="main">
					<PictureContainer ref={this.pictureContainer} />
					<ListView />
				</main>
			</div>
		);
	}

}

export default App;
