import React, { Component } from 'react';

import DataSource from './DataSource';

/**
 * A container used to display a picture after its resource is loaded.
 *
 * @todo PictureContainer has basically the same DataSource architecture of
 * 		 ListView. Basically everything that happens from the moment it initialize
 * 		 the DataSource and the completion of the resource loading process is
 * 		 the same. I think it would be better to generalize PictureContainer and
 * 		 ListView in a super Class. (Maybe I can call it DataSourceDelegate?)
 *
 * @extends Component
 */
class PictureContainer extends Component {
	constructor(props) {
		super(props);

		this.dataSourceDelegateCallback = this.dataSourceDelegateCallback.bind(this);
		this.responseJSONCallback = this.responseJSONCallback.bind(this);
		this.loadData = this.loadData.bind(this);

		this.state = {
			json: 'undefined'
		};

		this.ds = new DataSource('https://dog.ceo/api/breed/hound/images/random');
		this.ds.setDelegate(this);
		this.ds.getData();
	}

	responseJSONCallback(json) {
		json.message = json.message.replace(/\\\//g, "/");
		this.setState({json: json});
		console.log('picture info:', this.json);
	}

	dataSourceDelegateCallback(response) {
		// Response.json() returns a Promise, that's why we have to use
		// Promise.then().
		// Read https://developer.mozilla.org/en-US/docs/Web/API/Body/json and
		// https://developer.mozilla.org/en-US/docs/Web/API/Response#Methods
		response.json().then(this.responseJSONCallback);
	}

	loadData(url) {
		console.log(url);

		this.ds.setURL(url);
		this.ds.getData();
	}

	render() {
		return (
			<div className="dog-breeds-picture-container">
				<img src={this.state.json.message} alt="adjjeejrauhfh" />
			</div>
		);
	}
}

export default PictureContainer;
