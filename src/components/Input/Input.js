import React, { Component, Fragment } from 'react';

export class Input extends Component {
	state = {value: 'Enter a bus number...'};

	render() {
		return (
			<Fragment>
				<label id="input">
					<input type="text" placeholder={this.state.value} onChange={this.props.onChange}/>
				</label>
			</Fragment>
		)
	}
	
}

export default Input;