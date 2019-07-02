/**
 *
 * @file		src/ListItem.js
 * @copyright	Marco Frisan 2019
 * @author		Marco Frisan <ender.saka@gmail.com>
 */

import React, { Component } from 'react';
import { isString } from './utilities';

/**
 * Component that draws the items of the list of breeds.
 *
 * @extends Component
 */
class ListItem extends Component {
	constructor(props) {
		super(props);

		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);

		this.breedItemRef = React.createRef();
		this.breedBodyRef = React.createRef();
		this.breedLabelRef = React.createRef();

		this.currentElement = null;
	}

	addClassName(element, newClass) {
		// Validate classToAdd.
		if (!isString(newClass)) {
			return;
		}
		let match = newClass.match(/[^\d][\w\d-_]*/g);
		console.log(match);

		let classes = element.className.split(' ');
		if (classes.includes(newClass)) {
			return;
		}

		classes[classes.length] = newClass;

		element.className = classes.join(' ');
	}

	removeClassName(element, classNameToRemove) {
		// Validate classToAdd.
		if (!isString(classNameToRemove)) {
			return;
		}
		let match = classNameToRemove.match(/[^\d][\w\d-_]*/g);
		console.log(match);

		let classes = element.className.split(' ');
		let index = classes.indexOf(classNameToRemove);
		console.log('index:', index);
		if (index === -1) {//!classes.includes(classNameToRemove)) {
			return;
		}
		console.log('classes:', classes);

		classes = classes.splice(index - 1, 1);
		console.log('classes.splice(index - 1, 1):', classes);

		let newClassName = classes.join(' ');
		console.log('classes.join(\' \'):', newClassName);

		element.className = classes.join(' ');
	}

	handleMouseOver(e) {
		e.stopPropagation();
		e.preventDefault();

		let storedTarget = e.target;

		if (this.currentElement !== null) {
			// Before entering another element, the mouse always leaves the
			// previous one: so, if we didn't leave the <li> yet, then we are
			// still inside it and we can ignore the event.
			return;
		}


		let target = storedTarget.closest('li');
		if (target === null || (!this.breedItemRef.current !== target && !this.breedItemRef.current.contains(target))) {
			return;
		}

		// In any other situtaion we can assume we are inside the <li>.
		this.currentElement = target;
		this.addClassName(target, 'dog-breeds-bigger');
	}

	handleMouseOut(e) {
		e.stopPropagation();
		e.preventDefault();

		let nativeEvent = e.nativeEvent;

		// If we are outside of any <li>, then we ingnore the event.
		if (this.currentElement === null) {
			return;
		}

		// We are leaving the element. Where are we going to? Maybe to a child
		// element? (event.relatedTarget of a 'mouseout' event is the element
		// where mouse moved to https://developer.mozilla.org/en-US/docs/Web/API/Event/Comparison_of_Event_Targets#Use_of_target_and_relatedTarget)
		let relatedTarget = nativeEvent.relatedTarget;

		// Since it is possible that related target is null, double check it.
		if (relatedTarget !== null) {
			while (relatedTarget !== null) {
				// Travel up the parent chain and test. If we're still inside
				// this.currentElement; then that is an internal transition and
				// we must ignore it.
				if (relatedTarget === this.currentElement) {
					return;
				}

				relatedTarget = relatedTarget.parentNode;
			}
 		}

		// If we arrive to this point, we have actually left the element.
 		this.removeClassName(this.currentElement, 'dog-breeds-bigger');
 		this.currentElement = null;
	}

	render() {
		return (
			<li className="dog-breeds-list-item" ref={this.breedItemRef} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
				<div className="dog-breeds-breed-body" ref={this.breedBodyRef}>
					<div className="dog-breeds-breed-label" ref={this.breedLabelRef}>
						{this.props.label}
					</div>
				</div>
			</li>
		);
	}
}

export default ListItem;
