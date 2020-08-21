import React, { Component } from 'react';
import Switch from 'react-switch';
import './ToggleSwitch.css';

class ToggleSwitch extends Component {
	constructor() {
		super();
		this.state = { checked: false };
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(checked) {
		this.setState({ checked });
	}

	render() {
		return (
			<label>
				<span>{this.props.label}</span>
				<Switch onChange={this.handleChange} checked={this.state.checked} />
			</label>
		);
	}
}

export default ToggleSwitch;