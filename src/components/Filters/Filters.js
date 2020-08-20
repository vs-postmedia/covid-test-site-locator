import React, { Component, Fragment } from 'react';
import Input from '../Input/Input';
import Autocomplete from '../Autocomplete/Autocomplete';
import './Filters.css';

const Filters = (props) => {
	console.log(props)

 	return (
 		<div className="filter-list">
 			<Autocomplete suggestions={props.cityList} onChange={props.onChange} />
 		</div>
 	)
	
}


export default Filters;

//<Input onChange={this.handleInputChange.bind(this)}></Input>