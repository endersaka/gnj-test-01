import React, { Component } from 'react';

class ListItem extends Component {
	render() {
		return (
			<li className="dog-breeds-list-item">{this.props.label}</li>
		);
	}
}

export default ListItem;
